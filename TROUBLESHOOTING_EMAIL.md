# Dépannage : Erreur "Failed to fetch"

## Causes possibles et solutions

### 1. Problème CORS dans API Gateway

**Symptôme** : Erreur "Failed to fetch" dans la console du navigateur

**Solution** :

1. Va dans API Gateway console : https://console.aws.amazon.com/apigateway/
2. Sélectionne ton API `OrderAPI`
3. Clique sur la ressource `/orders`
4. Vérifie qu'il y a une méthode `OPTIONS` (pour CORS)
5. Si elle n'existe pas ou si tu as des erreurs :

   **Étape A : Supprimer l'ancienne config CORS (si elle existe)**
   - Sélectionne la méthode OPTIONS
   - Clique sur "Actions" > "Delete Method"

   **Étape B : Réactiver CORS correctement**
   - Sélectionne la ressource `/orders`
   - Clique sur "Actions" > "Enable CORS"
   - Configure :
     ```
     Access-Control-Allow-Origin: *
     Access-Control-Allow-Headers: Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,Accept
     Access-Control-Allow-Methods: POST,OPTIONS
     ```
   - Coche "Replace existing CORS headers"
   - Clique sur "Enable CORS and replace existing CORS headers"
   - Confirme en cliquant "Yes, replace existing values"

6. **CRUCIAL** : Redéploie l'API
   - Clique sur "Actions" > "Deploy API"
   - Sélectionne le stage `prod`
   - Clique sur "Deploy"

### 2. URL de l'API incorrecte

**Vérifier l'URL dans le code** :

1. Ouvre `src/services/orderService.js`
2. Vérifie que l'URL correspond à ton API Gateway
3. L'URL doit se terminer par `/orders` (avec un 's')

**Format correct** :
```javascript
const API_ENDPOINT = 'https://TON-API-ID.execute-api.REGION.amazonaws.com/prod';
// Puis dans la fonction : `${API_ENDPOINT}/orders`
```

**Trouver ton URL API Gateway** :
1. Va dans API Gateway console
2. Sélectionne ton API
3. Clique sur "Stages" > "prod"
4. L'URL "Invoke URL" est affichée en haut

### 3. Lambda pas déployée ou erreur

**Vérifier que la Lambda fonctionne** :

1. Va dans Lambda console : https://console.aws.amazon.com/lambda/
2. Sélectionne `sendOrderEmail`
3. Clique sur l'onglet "Test"
4. Crée un nouvel événement de test :
   ```json
   {
     "body": "{\"customerEmail\":\"test@example.com\",\"customerName\":\"Test User\",\"orderItems\":[{\"name\":\"Produit Test\",\"price\":25,\"quantity\":1}],\"totalAmount\":25,\"orderNumber\":\"TEST-123\"}"
   }
   ```
5. Clique sur "Test"
6. Vérifie que le résultat est un succès (statusCode: 200)

**Si la Lambda échoue** :
- Vérifie les logs CloudWatch
- Vérifie que le rôle IAM a les permissions SES
- Vérifie que l'email expéditeur est vérifié dans SES

### 4. Email expéditeur non vérifié dans SES

**Vérifier et configurer SES** :

1. Va dans SES console : https://console.aws.amazon.com/ses/
2. Clique sur "Verified identities"
3. Vérifie que `lbusecke@amazon.fr` est dans la liste et vérifié (statut "Verified")
4. Si non vérifié :
   - Clique sur l'email
   - Clique sur "Resend verification email"
   - Vérifie ton email et clique sur le lien

**Important** : L'email dans le code Lambda (`lbusecke@amazon.fr`) doit correspondre à un email vérifié dans SES.

### 5. Tester avec curl

Pour isoler le problème, teste l'API directement avec curl :

```bash
curl -X POST https://TON-API-ID.execute-api.REGION.amazonaws.com/prod/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerEmail": "test@example.com",
    "customerName": "Test User",
    "orderItems": [
      {
        "name": "Produit Test",
        "price": 25,
        "quantity": 1
      }
    ],
    "totalAmount": 25,
    "orderNumber": "TEST-123"
  }'
```

**Résultats possibles** :

- **200 OK** : L'API fonctionne, le problème vient du frontend (CORS)
- **403 Forbidden** : Problème de permissions ou CORS
- **500 Internal Server Error** : Problème dans la Lambda
- **Connection refused** : URL incorrecte

### 6. Vérifier les logs CloudWatch

1. Va dans CloudWatch console : https://console.aws.amazon.com/cloudwatch/
2. Clique sur "Log groups"
3. Cherche `/aws/lambda/sendOrderEmail`
4. Clique dessus et regarde les derniers logs
5. Cherche les erreurs

### 7. Vérifier la console du navigateur

1. Ouvre ton site web
2. Ouvre les DevTools (F12)
3. Va dans l'onglet "Console"
4. Essaie d'envoyer une commande
5. Regarde les erreurs :
   - **CORS error** : Problème CORS dans API Gateway
   - **404 Not Found** : URL incorrecte
   - **Failed to fetch** : Problème réseau ou CORS

### 8. Configuration réseau (si hébergé sur Amplify)

Si ton site est sur Amplify, assure-toi que :

1. L'URL de l'API est en HTTPS (pas HTTP)
2. L'API Gateway est dans la même région AWS (ou configure CORS pour accepter les requêtes cross-region)

## Checklist de vérification

- [ ] Email vérifié dans SES (`lbusecke@amazon.fr`)
- [ ] Rôle IAM Lambda a les permissions SES
- [ ] CORS activé sur API Gateway (méthode OPTIONS existe)
- [ ] API Gateway redéployée après activation CORS
- [ ] URL de l'API correcte dans `orderService.js`
- [ ] URL se termine par `/orders` (avec 's')
- [ ] Lambda fonctionne (test dans la console)
- [ ] Logs CloudWatch ne montrent pas d'erreurs

## Solution rapide

Si rien ne fonctionne, voici la solution la plus simple :

1. **Supprime et recrée l'API Gateway** :
   - Supprime l'API actuelle
   - Recrée-la en suivant le guide `MANUAL_LAMBDA_DEPLOY.md`
   - N'oublie pas d'activer CORS AVANT de déployer

2. **Mets à jour l'URL dans le code** :
   - Copie la nouvelle URL "Invoke URL"
   - Mets-la dans `src/services/orderService.js`
   - Commit et push vers GitHub

3. **Teste avec curl** avant de tester depuis le site web

## Besoin d'aide ?

Si le problème persiste :
1. Vérifie les logs CloudWatch de la Lambda
2. Teste l'API avec curl
3. Vérifie la console du navigateur pour les erreurs CORS
4. Assure-toi que l'email est vérifié dans SES
