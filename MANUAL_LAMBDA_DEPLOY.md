# Déploiement Manuel de la Fonction Lambda pour les Emails

Ce guide explique comment déployer manuellement la fonction Lambda d'envoi d'emails sans utiliser Amplify CLI.

## Étape 1 : Préparer le Code

1. Ouvre un terminal dans le dossier du projet
2. Crée un fichier ZIP avec le code Lambda :

```bash
cd amplify/backend/function/sendOrderEmail/src
zip -r lambda-function.zip index.js package.json
```

Le fichier `lambda-function.zip` sera créé dans ce dossier.

## Étape 2 : Créer le Rôle IAM

1. Va dans la console AWS IAM : https://console.aws.amazon.com/iam/
2. Clique sur "Roles" dans le menu de gauche
3. Clique sur "Create role"
4. Sélectionne "AWS service" puis "Lambda"
5. Clique sur "Next"
6. Attache ces policies :
   - `AWSLambdaBasicExecutionRole` (pour les logs CloudWatch)
7. Clique sur "Next"
8. Nomme le rôle : `MamanatureEmailLambdaRole`
9. Clique sur "Create role"

## Étape 3 : Ajouter les Permissions SES au Rôle

1. Trouve le rôle que tu viens de créer (`MamanatureEmailLambdaRole`)
2. Clique dessus
3. Dans l'onglet "Permissions", clique sur "Add permissions" > "Create inline policy"
4. Clique sur l'onglet "JSON"
5. Colle ce code :

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ses:SendEmail",
        "ses:SendRawEmail"
      ],
      "Resource": "*"
    }
  ]
}
```

6. Clique sur "Review policy"
7. Nomme la policy : `SESEmailSendPolicy`
8. Clique sur "Create policy"

## Étape 4 : Créer la Fonction Lambda

1. Va dans la console AWS Lambda : https://console.aws.amazon.com/lambda/
2. Clique sur "Create function"
3. Sélectionne "Author from scratch"
4. Configure :
   - **Function name** : `sendOrderEmail`
   - **Runtime** : Node.js 18.x
   - **Architecture** : x86_64
   - **Permissions** : "Use an existing role"
   - **Existing role** : Sélectionne `MamanatureEmailLambdaRole`
5. Clique sur "Create function"

## Étape 5 : Uploader le Code

1. Dans la page de ta fonction Lambda
2. Scroll vers le bas jusqu'à "Code source"
3. Clique sur "Upload from" > ".zip file"
4. Sélectionne le fichier `lambda-function.zip` que tu as créé
5. Clique sur "Save"

## Étape 6 : Configurer les Variables d'Environnement

1. Dans la page de ta fonction Lambda
2. Va dans l'onglet "Configuration"
3. Clique sur "Environment variables" dans le menu de gauche
4. Clique sur "Edit"
5. Ajoute ces variables :
   - **Key** : `SENDER_EMAIL`, **Value** : `contact@mamanature-heritage.fr`
   - **Key** : `REGION`, **Value** : `eu-west-1` (ou ta région AWS)
6. Clique sur "Save"

## Étape 7 : Créer l'API Gateway

1. Va dans la console API Gateway : https://console.aws.amazon.com/apigateway/
2. Clique sur "Create API"
3. Choisis "REST API" (pas Private)
4. Clique sur "Build"
5. Configure :
   - **API name** : `OrderAPI`
   - **Endpoint Type** : Regional
6. Clique sur "Create API"

### Créer la Ressource

1. Clique sur "Actions" > "Create Resource"
2. Configure :
   - **Resource Name** : `orders`
   - Coche "Enable API Gateway CORS"
3. Clique sur "Create Resource"

### Créer la Méthode POST

1. Sélectionne la ressource `/orders`
2. Clique sur "Actions" > "Create Method"
3. Sélectionne "POST" dans le dropdown
4. Configure :
   - **Integration type** : Lambda Function
   - **Use Lambda Proxy integration** : Coché
   - **Lambda Function** : `sendOrderEmail`
5. Clique sur "Save"
6. Confirme en cliquant sur "OK"

### Activer CORS

1. Sélectionne la ressource `/orders`
2. Clique sur "Actions" > "Enable CORS"
3. Laisse les valeurs par défaut
4. Clique sur "Enable CORS and replace existing CORS headers"
5. Confirme

### Déployer l'API

1. Clique sur "Actions" > "Deploy API"
2. Configure :
   - **Deployment stage** : [New Stage]
   - **Stage name** : `prod`
3. Clique sur "Deploy"
4. **IMPORTANT** : Note l'URL "Invoke URL" qui s'affiche (ex: `https://abc123.execute-api.eu-west-1.amazonaws.com/prod`)

## Étape 8 : Mettre à Jour le Code Frontend

1. Ouvre le fichier `src/services/orderService.js`
2. Remplace l'URL de l'API par celle que tu as notée :

```javascript
const API_URL = 'https://TON-API-ID.execute-api.REGION.amazonaws.com/prod/orders';
```

3. Sauvegarde le fichier
4. Commit et push vers GitHub pour redéployer sur Amplify

## Étape 9 : Vérifier l'Email dans SES

1. Va dans la console AWS SES : https://console.aws.amazon.com/ses/
2. Clique sur "Verified identities"
3. Clique sur "Create identity"
4. Sélectionne "Email address"
5. Entre : `contact@mamanature-heritage.fr`
6. Clique sur "Create identity"
7. Vérifie ton email et clique sur le lien de vérification

## Étape 10 : Tester

1. Va sur ton site web déployé
2. Ajoute des produits au panier
3. Remplis le formulaire de commande
4. Vérifie que tu reçois l'email de confirmation

## Dépannage

### L'email n'arrive pas

- Vérifie que l'email est vérifié dans SES
- Vérifie les logs CloudWatch de la fonction Lambda
- Vérifie que le rôle IAM a bien les permissions SES

### Erreur CORS

- Assure-toi d'avoir activé CORS sur l'API Gateway
- Redéploie l'API après avoir activé CORS

### Erreur 500

- Vérifie les logs CloudWatch de la fonction Lambda
- Vérifie que les variables d'environnement sont correctement configurées

## Mode Production (Optionnel)

Pour envoyer des emails à n'importe quelle adresse (pas seulement les emails vérifiés) :

1. Dans SES, va dans "Account dashboard"
2. Clique sur "Request production access"
3. Remplis le formulaire avec :
   - **Use case** : Transactional emails
   - **Website URL** : URL de ton site Amplify
   - **Description** : "Order confirmation emails for e-commerce website"
4. Soumets la demande (généralement approuvé en 24h)
