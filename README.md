# Mamanature Heritage

Site e-commerce de compléments alimentaires naturels, construit avec React et prêt pour le déploiement sur AWS Amplify.

## 🌿 À Propos

Mamanature Heritage incarne la rencontre entre la sagesse ancestrale des plantes et l'innovation scientifique moderne. Née au cœur des Alpes françaises en 2023, notre mission est de démocratiser l'accès à des solutions naturelles de haute qualité.

### Nos Gammes

- **Ligne Vitalité** : Boosters d'énergie naturels
- **Ligne Sérénité** : Solutions anti-stress
- **Ligne Immunité** : Renfort des défenses naturelles
- **Ligne Enfants** : Compléments adaptés aux plus jeunes

### Notre Engagement

- 🌱 Certification Bio Européenne
- ♻️ Emballages 100% recyclables
- 🌍 1% du CA reversé à la biodiversité
- 🏛️ Label "Entreprise à Mission"

## 🚀 Démarrage Rapide

### Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Ouvrir http://localhost:3000
```

### Build de production

```bash
npm run build
```

## 📦 Déploiement

### Déploiement rapide (5 minutes)

Consultez **[QUICK_DEPLOY.md](./QUICK_DEPLOY.md)** pour mettre votre site en ligne rapidement.

### Guide complet

Consultez **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** pour :
- Configuration AWS Amplify
- Nom de domaine personnalisé
- CI/CD automatique
- Optimisations et sécurité

### Configuration Amazon SES

Pour l'envoi d'emails de confirmation, consultez **[SETUP_SES.md](./SETUP_SES.md)**.

## 🛠️ Technologies

- **Frontend** : React 18 + Vite
- **Routing** : React Router v6
- **Styling** : CSS personnalisé avec variables
- **Backend** : AWS Lambda + API Gateway
- **Email** : Amazon SES
- **Hosting** : AWS Amplify
- **Fonts** : Google Fonts (Playfair Display + Inter)

## 📁 Structure du projet

```
mamanature-heritage/
├── amplify/                  # Configuration AWS Amplify
│   └── backend/
│       ├── function/         # Fonctions Lambda
│       └── api/              # API Gateway
├── public/                   # Fichiers statiques
│   └── _redirects           # Configuration routing
├── src/
│   ├── components/          # Composants réutilisables
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── CheckoutForm.jsx
│   ├── pages/               # Pages de l'application
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Cart.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   ├── services/            # Services API
│   │   └── orderService.js
│   ├── App.jsx              # Composant principal
│   ├── main.jsx             # Point d'entrée
│   └── index.css            # Styles globaux
├── amplify.yml              # Configuration build Amplify
├── package.json
└── vite.config.js
```

## 🎨 Fonctionnalités

- ✅ Catalogue de produits avec 4 gammes principales
- ✅ Pages détaillées pour chaque produit
- ✅ Panier d'achat avec gestion des quantités
- ✅ Formulaire de commande avec validation
- ✅ Envoi d'emails de confirmation via Amazon SES
- ✅ Design responsive (mobile, tablette, desktop)
- ✅ Interface moderne avec animations fluides
- ✅ Optimisé pour les performances (Vite)
- ✅ SEO-friendly

## 🔐 Variables d'environnement

Créez un fichier `.env` à la racine :

```env
VITE_API_ENDPOINT=https://votre-api-id.execute-api.eu-west-1.amazonaws.com/dev
```

## 📊 Scripts disponibles

```bash
npm run dev      # Serveur de développement
npm run build    # Build de production
npm run preview  # Prévisualiser le build
```

## 🌐 URLs importantes

- **Site de production** : À configurer après déploiement
- **Console AWS Amplify** : https://console.aws.amazon.com/amplify/
- **Console AWS SES** : https://console.aws.amazon.com/ses/

## 📝 Prochaines étapes

Pour ajouter des fonctionnalités e-commerce complètes :
- [ ] Intégrer un système de paiement (Stripe, PayPal)
- [ ] Ajouter une base de données (DynamoDB)
- [ ] Implémenter l'authentification utilisateur (Cognito)
- [ ] Créer un tableau de bord admin
- [ ] Ajouter un système de gestion des stocks
- [ ] Intégrer Google Analytics
- [ ] Optimiser le SEO avec sitemap.xml

## 🐛 Dépannage

### Le site ne démarre pas

```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Erreur de build

```bash
npm run build
# Vérifiez les erreurs dans la console
```

### Problème avec les emails

Consultez `SETUP_SES.md` et vérifiez :
- Email vérifié dans SES
- Variables d'environnement configurées
- Permissions IAM correctes

## 📚 Documentation

- [AWS Amplify](https://docs.amplify.aws/react/)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Amazon SES](https://docs.aws.amazon.com/ses/)

## 📄 Licence

© 2023-2026 Mamanature Heritage. Tous droits réservés.

---

**Besoin d'aide ?** Consultez les guides de déploiement ou ouvrez une issue sur GitHub.

### Nos Gammes

- **Ligne Vitalité** : Boosters d'énergie naturels
- **Ligne Sérénité** : Solutions anti-stress
- **Ligne Immunité** : Renfort des défenses naturelles
- **Ligne Enfants** : Compléments adaptés aux plus jeunes

### Notre Engagement

- 🌱 Certification Bio Européenne
- ♻️ Emballages 100% recyclables
- 🌍 1% du CA reversé à la biodiversité
- 🏛️ Label "Entreprise à Mission"

## Démarrage

1. Installer les dépendances :
```bash
npm install
```

2. Lancer le serveur de développement :
```bash
npm run dev
```

3. Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Déploiement sur AWS Amplify

### Option 1 : Déploiement via Git (Recommandé)

1. Pousser ce code vers un dépôt Git (GitHub, GitLab, ou Bitbucket)
2. Aller sur [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
3. Cliquer sur "New app" → "Host web app"
4. Connecter votre dépôt Git
5. Amplify détectera automatiquement les paramètres de build
6. Cliquer sur "Save and deploy"

### Option 2 : Déploiement Manuel

1. Builder l'application :
```bash
npm run build
```

2. Déployer le dossier `dist` via Amplify CLI ou Console

## Fonctionnalités

- 🛍️ Catalogue de produits avec 4 gammes principales
- 📱 Design entièrement responsive
- 🎨 Interface moderne avec palette de couleurs naturelles (vert sauge, brun terre, blanc naturel)
- 🛒 Panier d'achat (prêt pour intégration backend)
- 📧 Formulaire de contact
- ⚡ Performance optimale avec Vite

## Prochaines Étapes

Pour ajouter des fonctionnalités e-commerce complètes :
- Intégrer AWS Amplify backend pour l'authentification
- Ajouter AWS AppSync ou API Gateway pour la gestion des produits
- Connecter une passerelle de paiement (Stripe, PayPal)
- Ajouter une base de données pour l'inventaire
- Implémenter un système de gestion des commandes

## En Savoir Plus

- [Documentation AWS Amplify](https://docs.amplify.aws/react/)
- [Documentation React](https://react.dev/)
- [Documentation Vite](https://vitejs.dev/)
