# Rapport de tests automatisés

## 1. Informations générales

**Projet :** QA Playwright E-commerce  
**Application testée :** SauceDemo  
**Outil :** Playwright Test  
**Navigateur :** Chromium  
**Type de tests :** Tests fonctionnels automatisés  
**Exécution :** 1 worker  

---

## 2. Périmètre des tests

La suite automatisée couvre principalement les fonctionnalités suivantes :

- Authentification
- Affichage des produits
- Informations produit
- Ajout d'un produit au panier
- Suppression d'un produit du panier
- Accès au panier
- Vérification du contenu du panier
- Accès au checkout
- Saisie des informations client
- Validation du formulaire checkout
- Gestion des champs obligatoires
- Récapitulatif de commande
- Finalisation de la commande

---

## 3. Résultats

La suite complète contient actuellement :

**20 tests automatisés**

Dernière exécution locale validée :

```text
Running 20 tests using 1 worker
20 passed
```

### Résultat

| Statut | Nombre |
|---|---:|
| Passed | 20 |
| Failed | 0 |
| Total | 20 |

**Taux de réussite : 100 %**

---

## 4. Architecture des tests

Le projet utilise le pattern **Page Object Model (POM)**.

Les principales pages sont séparées dans des classes dédiées :

- `PageConnexion`
- `PageProduits`
- `PagePanier`
- `PageCheckout`

Les fichiers de tests utilisent ces Page Objects afin de séparer :

- la logique métier des tests ;
- les sélecteurs ;
- les actions effectuées sur l'application.

---

## 5. Gestion de l'authentification

L'authentification est réalisée à travers un setup Playwright dédié.

Le projet utilise :

```text
playwright/.auth/user.json
```

Le fichier contient l'état de session nécessaire aux tests authentifiés.

Le fichier d'authentification est exclu du repository grâce au `.gitignore`.

L'authentification est exécutée comme projet `setup` avant les tests Chromium.

---

## 6. Exécution parallèle

Les tests ont été testés avec plusieurs workers.

Une exécution avec 4 workers a montré des échecs intermittents lors du chargement de SauceDemo.

Les tests restent stables avec :

```bash
npx playwright test --project=chromium --workers=1
```

La configuration actuelle privilégie donc la stabilité et la reproductibilité des tests plutôt que l'exécution parallèle.

---

## 7. CI/CD

Le projet utilise **GitHub Actions** pour automatiser l'exécution des tests.

Le workflow est situé dans :

```text
.github/workflows/playwright.yml
```

Le pipeline réalise notamment les opérations suivantes :

1. récupération du repository ;
2. installation de Node.js ;
3. installation des dépendances ;
4. installation de Chromium ;
5. exécution des tests Playwright ;
6. publication du rapport Playwright.

---

## 8. Rapports et artefacts

Playwright est configuré pour générer un rapport HTML.

En cas d'échec, le projet peut également conserver :

- screenshots ;
- vidéos ;
- traces Playwright selon la configuration.

Ces éléments permettent d'analyser plus facilement les échecs.

---

## 9. Limites connues

### Exécution parallèle

L'exécution avec plusieurs workers peut provoquer des échecs intermittents liés au chargement de l'application SauceDemo.

Pour cette raison, l'exécution de référence actuelle utilise :

```text
1 worker
```

### Navigateurs

La suite principale est actuellement validée sur :

```text
Chromium
```

Firefox et WebKit sont présents dans la configuration Playwright, mais ne constituent pas actuellement la cible principale de validation.

---

## 10. Commandes principales

### Installer les dépendances

```bash
npm install
```

### Lancer tous les tests Chromium

```bash
npx playwright test --project=chromium --workers=1
```

### Lister les tests

```bash
npx playwright test --project=chromium --list
```

### Ouvrir le rapport HTML

```bash
npx playwright show-report
```

---

## 11. Conclusion

Le projet dispose actuellement d'une suite de tests fonctionnels automatisés couvrant les principales fonctionnalités du parcours e-commerce SauceDemo.

La suite comprend :

- Page Object Model ;
- authentification réutilisable ;
- tests fonctionnels ;
- assertions Playwright ;
- gestion des erreurs ;
- rapports de test ;
- pipeline CI/CD GitHub Actions.

La priorité actuelle est de conserver une suite de tests **fiable, lisible et reproductible**.
