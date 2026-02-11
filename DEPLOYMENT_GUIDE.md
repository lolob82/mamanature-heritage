# Guide de Déploiement - Mamanature Heritage

Ce guide vous explique comment publier votre site web sur AWS Amplify en quelques étapes simples.

## 🎯 Méthode Recommandée : AWS Amplify Hosting

AWS Amplify est la solution idéale car elle :
- ✅ S'intègre parfaitement avec votre backend (Lambda + SES)
- ✅ Déploie automatiquement à chaque commit Git
- ✅ Fournit un certificat SSL gratuit (HTTPS)
- ✅ Offre un CDN global pour des performances optimales
- ✅ Coûte très peu (souvent gratuit avec le tier gratuit)

---

## 📋 Prérequis

1. Un compte AWS (créez-en un sur https://aws.amazon.com)
2. Un compte GitHub, GitLab ou Bitbucket
3. Git installé sur votre machine
4. AWS CLI et Amplify CLI installés

---

## 🚀 Étape 1 : Préparer votre code

### 1.1 Créer un dépôt Git

Si ce n'est pas déjà fait :

```bash
# Initialiser Git
git init

# Ajouter tous les fichiers
git add .

# Créer le premier commit
git commit -m "Initial commit - Mamanature Heritage"
```

### 1.2 Créer un dépôt sur GitHub

1. Allez sur https://github.com
2. Cliquez sur "New repository"
3. Nommez-le `mamanature-heritage`
4. Ne cochez PAS "Initialize with README" (vous avez déjà du code)
5. Cliquez sur "Create repository"

### 1.3 Pousser votre code sur GitHub

```bash
# Ajouter le remote GitHub (remplacez USERNAME par votre nom d'utilisateur)
git remote add origin https://github.com/USERNAME/mamanature-heritage.git

# Pousser le code
git branch -M main
git push -u origin main
```

---

## 🌐 Étape 2 : Déployer sur AWS Amplify

### Option A : Via la Console AWS (Recommandé pour débuter)

#### 2.1 Accéder à Amplify Console

1. Connectez-vous à https://console.aws.amazon.com/amplify/
2. Cliquez sur "Get Started" sous "Amplify Hosting"

#### 2.2 Connecter votre dépôt Git

1. Sélectionnez **GitHub** (ou votre plateforme)
2. Cliquez sur "Continue"
3. Autorisez AWS Amplify à accéder à votre compte GitHub
4. Sélectionnez le dépôt `mamanature-heritage`
5. Sélectionnez la branche `main`
6. Cliquez sur "Next"

#### 2.3 Configurer les paramètres de build

Amplify détecte automatiquement Vite. Vérifiez que la configuration ressemble à :

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

**Important** : Ajoutez vos variables d'environnement :
- Cliquez sur "Advanced settings"
- Ajoutez : `VITE_API_ENDPOINT` = `https://VOTRE-API-ID.execute-api.eu-west-1.amazonaws.com/dev`

Cliquez sur "Next"

#### 2.4 Réviser et déployer

1. Vérifiez tous les paramètres
2. Cliquez sur "Save and deploy"
3. ☕ Attendez 3-5 minutes pendant le déploiement

#### 2.5 Votre site est en ligne ! 🎉

Amplify vous fournira une URL comme :
```
https://main.d1234abcd5678.amplifyapp.com
```

---

### Option B : Via Amplify CLI (Pour les développeurs)

```bash
# 1. Initialiser Amplify (si pas déjà fait)
amplify init

# 2. Ajouter le hosting
amplify add hosting

# Répondre aux questions :
# ? Select the plugin module to execute: Hosting with Amplify Console
# ? Choose a type: Manual deployment

# 3. Publier
amplify publish

# Votre site sera déployé et l'URL affichée
```

---

## 🔧 Étape 3 : Configurer un nom de domaine personnalisé

### 3.1 Acheter un domaine (si vous n'en avez pas)

Options recommandées :
- **Route 53** (AWS) : https://console.aws.amazon.com/route53/
- **OVH** : https://www.ovh.com
- **Gandi** : https://www.gandi.net

### 3.2 Configurer le domaine dans Amplify

1. Dans Amplify Console, allez dans votre app
2. Cliquez sur "Domain management" dans le menu
3. Cliquez sur "Add domain"
4. Entrez votre domaine : `mamanature-heritage.fr`
5. Amplify génère automatiquement un certificat SSL
6. Suivez les instructions pour configurer les DNS

#### Si votre domaine est sur Route 53 :
- Amplify configure automatiquement les DNS ✅

#### Si votre domaine est ailleurs (OVH, Gandi, etc.) :
Ajoutez ces enregistrements DNS :

```
Type: CNAME
Nom: www
Valeur: main.d1234abcd5678.amplifyapp.com

Type: ANAME ou ALIAS (ou A si pas disponible)
Nom: @
Valeur: [fourni par Amplify]
```

### 3.3 Attendre la propagation DNS

- Cela prend généralement 15 minutes à 48 heures
- Vérifiez sur https://dnschecker.org

---

## 🔄 Étape 4 : Déploiement automatique

### Configuration du CI/CD

Amplify déploie automatiquement à chaque push sur `main` :

```bash
# Faire des modifications
git add .
git commit -m "Mise à jour du site"
git push

# Amplify détecte le push et redéploie automatiquement ! 🚀
```

### Créer des environnements de staging

```bash
# Créer une branche de développement
git checkout -b develop
git push -u origin develop

# Dans Amplify Console :
# 1. Allez dans "App settings" > "Branches"
# 2. Cliquez sur "Connect branch"
# 3. Sélectionnez "develop"
# 4. Vous aurez maintenant deux URLs :
#    - Production : https://main.d1234.amplifyapp.com
#    - Staging : https://develop.d1234.amplifyapp.com
```

---

## 📊 Étape 5 : Surveiller votre site

### Métriques Amplify

Dans la console Amplify :
- **Builds** : Historique des déploiements
- **Monitoring** : Trafic, erreurs, performances
- **Logs** : Logs de build et d'exécution

### Configurer les alertes

1. Allez dans CloudWatch
2. Créez des alarmes pour :
   - Erreurs 4xx/5xx
   - Temps de réponse
   - Trafic inhabituel

---

## 💰 Coûts estimés

### Tier gratuit AWS (12 premiers mois)
- ✅ 1000 minutes de build/mois
- ✅ 15 GB de stockage
- ✅ 15 GB de bande passante

### Après le tier gratuit
- **Build** : 0,01$ par minute
- **Hosting** : 0,15$ par GB stocké/mois
- **Bande passante** : 0,15$ par GB servi

**Estimation pour un petit site** : 5-15€/mois

---

## 🔒 Étape 6 : Sécurité et optimisations

### 6.1 Activer HTTPS uniquement

Dans Amplify Console :
1. App settings > General
2. Activez "Redirect HTTP to HTTPS"

### 6.2 Configurer les headers de sécurité

Créez `public/_headers` :

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
```

### 6.3 Optimiser les performances

Créez `public/_redirects` pour le routing React :

```
/*    /index.html   200
```

### 6.4 Configurer le cache

Dans `amplify.yml`, ajoutez :

```yaml
customHeaders:
  - pattern: '**/*.js'
    headers:
      - key: 'Cache-Control'
        value: 'public, max-age=31536000, immutable'
  - pattern: '**/*.css'
    headers:
      - key: 'Cache-Control'
        value: 'public, max-age=31536000, immutable'
```

---

## 🐛 Dépannage

### Erreur : "Build failed"

```bash
# Vérifier les logs dans Amplify Console
# Souvent causé par :
# 1. Dépendances manquantes
# 2. Variables d'environnement non définies
# 3. Erreurs de build local

# Tester localement :
npm run build
```

### Erreur : "Module not found"

```bash
# Vérifier que toutes les dépendances sont dans package.json
npm install
git add package.json package-lock.json
git commit -m "Fix dependencies"
git push
```

### Le site ne se met pas à jour

```bash
# Forcer un nouveau build dans Amplify Console
# Ou faire un commit vide :
git commit --allow-empty -m "Trigger rebuild"
git push
```

### Problème de routing (404 sur refresh)

Vérifiez que vous avez créé `public/_redirects` :
```
/*    /index.html   200
```

---

## 📱 Étape 7 : Tester votre site

### Checklist de tests

- [ ] Page d'accueil charge correctement
- [ ] Navigation entre les pages fonctionne
- [ ] Formulaire de contact fonctionne
- [ ] Panier et checkout fonctionnent
- [ ] Email de confirmation est reçu
- [ ] Site responsive sur mobile
- [ ] HTTPS activé (cadenas vert)
- [ ] Temps de chargement < 3 secondes

### Outils de test

- **PageSpeed Insights** : https://pagespeed.web.dev
- **GTmetrix** : https://gtmetrix.com
- **SSL Test** : https://www.ssllabs.com/ssltest/

---

## 🎓 Ressources supplémentaires

- **Documentation Amplify** : https://docs.amplify.aws/
- **Tutoriels vidéo** : https://www.youtube.com/c/AWSAmplify
- **Forum communautaire** : https://github.com/aws-amplify/amplify-js/discussions
- **Support AWS** : https://console.aws.amazon.com/support/

---

## 🚀 Prochaines étapes

Une fois votre site en ligne :

1. **Analytics** : Ajoutez Google Analytics ou AWS Pinpoint
2. **SEO** : Optimisez les meta tags et créez un sitemap
3. **Performance** : Activez la compression et le lazy loading
4. **Monitoring** : Configurez des alertes CloudWatch
5. **Backup** : Configurez des sauvegardes automatiques

---

## 📞 Besoin d'aide ?

Si vous rencontrez des problèmes :

1. Consultez les logs dans Amplify Console
2. Vérifiez la documentation AWS
3. Posez des questions sur le forum Amplify
4. Contactez le support AWS (si vous avez un plan support)

---

**Félicitations ! Votre site Mamanature Heritage est maintenant en ligne ! 🎉**
