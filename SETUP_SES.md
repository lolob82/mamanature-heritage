# Configuration Amazon SES pour l'envoi d'emails

Ce guide vous explique comment configurer Amazon SES pour envoyer des emails de confirmation de commande.

## Prérequis

- Un compte AWS
- AWS CLI installé et configuré
- Amplify CLI installé (`npm install -g @aws-amplify/cli`)

## Étapes de configuration

### 1. Vérifier votre adresse email dans Amazon SES

**Important**: En mode sandbox SES, vous devez vérifier les adresses email d'envoi ET de réception.

```bash
# Vérifier l'email d'envoi (contact@mamanature-heritage.fr)
aws ses verify-email-identity --email-address contact@mamanature-heritage.fr --region eu-west-1

# Vous recevrez un email de vérification. Cliquez sur le lien pour confirmer.
```

Pour vérifier le statut:
```bash
aws ses get-identity-verification-attributes \
  --identities contact@mamanature-heritage.fr \
  --region eu-west-1
```

### 2. Sortir du mode Sandbox (Production)

En mode sandbox, vous ne pouvez envoyer qu'à des emails vérifiés. Pour la production:

1. Allez sur la console AWS SES: https://console.aws.amazon.com/ses/
2. Sélectionnez votre région (eu-west-1 recommandé pour l'Europe)
3. Cliquez sur "Account Dashboard"
4. Cliquez sur "Request production access"
5. Remplissez le formulaire:
   - **Use case**: Transactional emails
   - **Website URL**: Votre site web
   - **Description**: "Envoi d'emails de confirmation de commande pour notre boutique e-commerce de compléments alimentaires naturels"
   - **Process for handling bounces**: "Nous surveillons les bounces via SES et supprimons les emails invalides"

L'approbation prend généralement 24-48h.

### 3. Initialiser Amplify dans votre projet

```bash
# Initialiser Amplify
amplify init

# Répondre aux questions:
# - Enter a name for the project: mamanatureheritage
# - Enter a name for the environment: dev
# - Choose your default editor: Visual Studio Code (ou votre éditeur)
# - Choose the type of app: javascript
# - What javascript framework: react
# - Source Directory Path: src
# - Distribution Directory Path: dist
# - Build Command: npm run build
# - Start Command: npm run dev
```

### 4. Ajouter la fonction Lambda

```bash
# Ajouter la fonction Lambda
amplify add function

# Répondre aux questions:
# - Select which capability: Lambda function
# - Provide a friendly name: sendOrderEmail
# - Provide the Lambda function name: sendOrderEmail
# - Choose the runtime: NodeJS
# - Choose the function template: Hello World
# - Do you want to configure advanced settings: No
# - Do you want to edit the local lambda function now: No
```

### 5. Ajouter l'API REST

```bash
# Ajouter l'API Gateway
amplify add api

# Répondre aux questions:
# - Select from one of the below mentioned services: REST
# - Provide a friendly name: orderApi
# - Provide a path: /order
# - Choose a Lambda source: Use a Lambda function already added
# - Choose the Lambda function: sendOrderEmail
# - Restrict API access: No
# - Do you want to add another path: No
```

### 6. Déployer sur AWS

```bash
# Déployer l'infrastructure
amplify push

# Cela va créer:
# - La fonction Lambda avec les permissions SES
# - L'API Gateway
# - Les rôles IAM nécessaires
```

### 7. Récupérer l'URL de l'API

Après le déploiement, Amplify affichera l'URL de votre API. Notez-la.

```bash
# Ou récupérez-la avec:
amplify status
```

### 8. Configurer les variables d'environnement

Créez un fichier `.env` à la racine du projet:

```env
VITE_API_ENDPOINT=https://VOTRE-API-ID.execute-api.eu-west-1.amazonaws.com/dev
```

### 9. Mettre à jour l'email d'envoi

Dans `amplify/backend/function/sendOrderEmail/src/index.js`, ligne 6:

```javascript
const SENDER_EMAIL = 'contact@mamanature-heritage.fr'; // Votre email vérifié
```

### 10. Tester l'envoi d'email

En mode sandbox, testez avec un email vérifié:

```bash
# Vérifier un email de test
aws ses verify-email-identity --email-address votre-email-test@example.com --region eu-west-1
```

Puis testez la commande sur votre site.

## Configuration avancée

### Augmenter les limites d'envoi

Par défaut en production:
- 200 emails par jour
- 1 email par seconde

Pour augmenter:
1. Console SES > Account Dashboard
2. "Request a sending limit increase"

### Configurer un domaine personnalisé

Pour améliorer la délivrabilité:

```bash
# Vérifier votre domaine
aws ses verify-domain-identity --domain mamanature-heritage.fr --region eu-west-1

# Configurer DKIM
aws ses set-identity-dkim-enabled --identity mamanature-heritage.fr --dkim-enabled --region eu-west-1
```

Ajoutez les enregistrements DNS fournis par AWS.

### Surveiller les bounces et plaintes

Configurez SNS pour recevoir les notifications:

```bash
aws ses set-identity-notification-topic \
  --identity contact@mamanature-heritage.fr \
  --notification-type Bounce \
  --sns-topic arn:aws:sns:eu-west-1:ACCOUNT-ID:ses-bounces \
  --region eu-west-1
```

## Dépannage

### Erreur "Email address is not verified"

Vérifiez que l'email est bien vérifié:
```bash
aws ses list-verified-email-addresses --region eu-west-1
```

### Erreur "Daily sending quota exceeded"

Vous avez atteint la limite quotidienne. Attendez 24h ou demandez une augmentation.

### Emails en spam

1. Configurez SPF, DKIM et DMARC
2. Utilisez un domaine vérifié
3. Évitez les mots spam dans le sujet
4. Incluez un lien de désinscription

## Coûts

Amazon SES est très économique:
- 0,10$ pour 1000 emails envoyés
- 0,12$ par Go de pièces jointes
- Gratuit: 62 000 emails/mois si envoyé depuis EC2

## Support

- Documentation AWS SES: https://docs.aws.amazon.com/ses/
- Forum Amplify: https://github.com/aws-amplify/amplify-js/discussions
- Support AWS: https://console.aws.amazon.com/support/

## Sécurité

- Ne commitez JAMAIS vos credentials AWS
- Utilisez IAM roles avec permissions minimales
- Activez CloudTrail pour l'audit
- Surveillez les métriques CloudWatch
