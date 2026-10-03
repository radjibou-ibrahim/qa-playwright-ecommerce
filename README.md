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
