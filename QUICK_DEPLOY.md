# 🚀 Déploiement Rapide - 5 Minutes

Guide ultra-rapide pour mettre votre site en ligne.

## Étape 1 : Préparer Git (2 min)

```bash
# Si pas encore fait
git init
git add .
git commit -m "Initial commit"
```

## Étape 2 : Pousser sur GitHub (1 min)

1. Créez un repo sur https://github.com/new
2. Nommez-le `mamanature-heritage`
3. Exécutez :

```bash
git remote add origin https://github.com/VOTRE-USERNAME/mamanature-heritage.git
git branch -M main
git push -u origin main
```

## Étape 3 : Déployer sur Amplify (2 min)

1. Allez sur https://console.aws.amazon.com/amplify/
2. Cliquez "New app" → "Host web app"
3. Sélectionnez GitHub → Autorisez
4. Choisissez votre repo `mamanature-heritage`
5. Branche : `main`
6. Cliquez "Next" → "Save and deploy"

**C'est tout ! ✅**

Votre site sera en ligne dans 3-5 minutes à une URL comme :
```
https://main.d1234abcd5678.amplifyapp.com
```

## Variables d'environnement (Important !)

Avant de tester les commandes, ajoutez dans Amplify Console :

1. App settings → Environment variables
2. Ajoutez : `VITE_API_ENDPOINT` = `votre-url-api`
3. Redéployez

## Domaine personnalisé (Optionnel)

1. Dans Amplify : Domain management → Add domain
2. Entrez votre domaine
3. Suivez les instructions DNS

---

**Besoin d'aide ?** Consultez `DEPLOYMENT_GUIDE.md` pour le guide complet.
