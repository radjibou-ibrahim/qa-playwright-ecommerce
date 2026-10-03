# QA Playwright E-commerce

Projet d'automatisation des tests fonctionnels d'une application e-commerce avec Playwright.

L'objectif de ce projet est de mettre en pratique les compétences d'un QA Automaticien :
- automatisation des tests fonctionnels ;
- Page Object Model (POM) ;
- fixtures Playwright ;
- authentification réutilisable ;
- gestion de l'état de session avec `storageState` ;
- assertions Playwright ;
- exécution parallèle des tests ;
- rapports de tests ;
- intégration continue avec GitHub Actions.

---

## 🎯 Objectifs du projet

Ce projet automatise les principaux parcours fonctionnels d'une application e-commerce de démonstration.

Les tests couvrent notamment :

- la connexion utilisateur ;
- l'affichage de la page produits ;
- la vérification des informations produit ;
- l'ajout d'un produit au panier ;
- la suppression d'un produit du panier ;
- l'accès au panier ;
- le checkout ;
- la validation des informations client ;
- la gestion des erreurs du formulaire Checkout ;
- le récapitulatif de commande ;
- la finalisation de la commande.

---

## 🛠️ Technologies utilisées

| Technologie | Utilisation |
|---|---|
| JavaScript | Langage utilisé pour les tests |
| Playwright | Framework d'automatisation |
| Node.js | Environnement d'exécution |
| Git | Gestion de versions |
| GitHub | Hébergement du repository |
| GitHub Actions | Intégration continue (CI) |
| Chromium | Navigateur utilisé dans la CI |

---

## 🏗️ Architecture du projet

```text
qa-playwright-ecommerce/
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── fixtures/
│   └── test.js
│
├── pages/
│   ├── PageConnexion.js
│   ├── PageProduits.js
│   ├── PagePanier.js
│   └── PageCheckout.js
│
├── playwright/
│   └── .auth/
│       └── user.json
│
├── tests/
│   ├── auth.setup.spec.js
│   ├── connexion.spec.js
│   └── produits.spec.js
│
├── .gitignore
├── package.json
├── playwright.config.js
└── README.md
```

---

## 🧪 Architecture d'automatisation

### Page Object Model

Le projet utilise le modèle **Page Object Model (POM)**.

Chaque page de l'application possède sa propre classe :

```text
PageConnexion
PageProduits
PagePanier
PageCheckout
```

Les locators et les interactions avec chaque page sont ainsi centralisés.

Cette organisation permet notamment de :

- réutiliser les locators ;
- éviter la duplication de code ;
- faciliter la maintenance ;
- séparer la logique métier des tests.

---

## 🔐 Authentification réutilisable

L'authentification est préparée automatiquement dans :

```text
tests/auth.setup.spec.js
```

Après une connexion réussie, Playwright sauvegarde l'état de session dans :

```text
playwright/.auth/user.json
```

Le projet utilise ensuite :

```javascript
storageState: "playwright/.auth/user.json"
```

Les tests peuvent ainsi commencer directement avec une session authentifiée au lieu de refaire la connexion avant chaque test.

---

## 🧩 Fixtures

Le projet utilise une fixture Playwright personnalisée située dans :

```text
fixtures/test.js
```

Elle permet de fournir aux tests un contexte commun et de réutiliser la configuration d'authentification.

L'objectif est de réduire la duplication et de rendre les tests plus faciles à maintenir.

---

## 📋 Tests automatisés

Le projet contient actuellement **20 tests automatisés**.

### Connexion

Les tests couvrent notamment :

- connexion avec un utilisateur valide ;
- connexion avec un mot de passe incorrect ;
- connexion avec un username vide ;
- connexion avec un mot de passe vide.

### Produits et panier

Les tests couvrent notamment :

- affichage de la page produits ;
- affichage du produit Sauce Labs Backpack ;
- vérification du prix et de la description ;
- ajout du produit au panier ;
- suppression du produit ;
- accès au panier ;
- vérification du produit dans le panier.

### Checkout

Les tests couvrent notamment :

- accès au Checkout ;
- remplissage des informations client ;
- validation du formulaire ;
- gestion d'un prénom vide ;
- gestion d'un nom vide ;
- gestion d'un code postal vide ;
- accès au récapitulatif ;
- vérification des informations de commande ;
- finalisation de la commande.

---

## ▶️ Installation

Cloner le repository :

```bash
git clone https://github.com/radjibou-ibrahim/qa-playwright-ecommerce.git
```

Accéder au projet :

```bash
cd qa-playwright-ecommerce
```

Installer les dépendances :

```bash
npm install
```

Installer Chromium :

```bash
npx playwright install chromium
```

---

## ▶️ Exécution des tests

### Exécuter tous les tests Chromium

```bash
npx playwright test --project=chromium
```

### Exécuter les tests de connexion

```bash
npx playwright test tests/connexion.spec.js --project=chromium
```

### Exécuter les tests produits

```bash
npx playwright test tests/produits.spec.js --project=chromium
```

### Exécuter avec un seul worker

```bash
npx playwright test --project=chromium --workers=1
```

---

## 📊 Rapport Playwright

Après l'exécution des tests, Playwright génère un rapport HTML.

Pour ouvrir le dernier rapport :

```bash
npx playwright show-report
```

Les screenshots, vidéos et traces peuvent également être collectés selon la configuration Playwright en cas d'échec.

---

## 🔄 Intégration continue — GitHub Actions

Le projet utilise **GitHub Actions** pour exécuter automatiquement les tests Playwright.

Le workflow se trouve dans :

```text
.github/workflows/playwright.yml
```

Le pipeline est déclenché lors :

- d'un `push` sur `main` ;
- d'une Pull Request vers `main`.

### Pipeline CI

```text
Git Push / Pull Request
        ↓
GitHub Actions
        ↓
Checkout du repository
        ↓
Installation de Node.js
        ↓
npm ci
        ↓
Installation de Chromium
        ↓
Exécution des tests Playwright
        ↓
Génération du rapport
        ↓
Publication du rapport comme artifact
```

La CI utilise actuellement Chromium.

---

## ✅ Résultat actuel

Dernière validation locale :

```text
Running 20 tests using 4 workers
20 passed
```

La pipeline GitHub Actions a également été exécutée avec succès.

---

## 📁 Gestion des fichiers sensibles

L'état d'authentification Playwright n'est pas versionné dans Git.

Le dossier :

```text
playwright/.auth/
```

est exclu du repository via `.gitignore`.

Les résultats temporaires Playwright sont également exclus :

```text
/test-results/
/playwright-report/
/blob-report/
/playwright/.cache/
```

---

## 🎓 Compétences démontrées

Ce projet permet de démontrer les compétences suivantes :

- QA fonctionnelle ;
- conception de tests automatisés ;
- Playwright ;
- JavaScript ;
- Page Object Model ;
- locators Playwright ;
- assertions ;
- fixtures ;
- authentification automatisée ;
- `storageState` ;
- exécution parallèle ;
- gestion des rapports ;
- Git ;
- GitHub ;
- GitHub Actions ;
- CI.

---

## 🚀 Évolutions prévues

Les prochaines améliorations pourront inclure :

- amélioration du reporting ;
- ajout de tests supplémentaires ;
- amélioration de la couverture fonctionnelle ;
- tests sur plusieurs navigateurs lorsque l'environnement le permettra ;
- amélioration de la CI ;
- documentation QA plus détaillée ;
- maintenance et refactorisation des tests.
