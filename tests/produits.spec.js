const { test, expect } = require("@playwright/test");
const PageConnexion = require("../pages/PageConnexion");
const PageProduits = require("../pages/PageProduits");

test.describe("Page produits", () => {
  let pageProduits;

  test.beforeEach(async ({ page }) => {
    const pageConnexion = new PageConnexion(page);
    pageProduits = new PageProduits(page);

    // Accès au site
    await page.goto("https://www.saucedemo.com/");

    // Connexion utilisateur valide
    await pageConnexion.seConnecter("standard_user", "secret_sauce");

    // Vérification que la connexion est réussie
    await expect(page).toHaveURL(/.*inventory.*/);
  });

  test("Affichage de la page produits après connexion", async () => {
    await expect(pageProduits.titreProduits).toBeVisible();
  });

  test("Affichage du produit Sauce Labs Backpack", async () => {
    await expect(pageProduits.produitBackpack).toBeVisible();
  });

  test("Vérification des informations du produit Sauce Labs Backpack", async () => {
    await expect(pageProduits.produitBackpack).toBeVisible();

    await expect(pageProduits.prixBackpack).toBeVisible();

    await expect(pageProduits.descriptionBackpack).toBeVisible();
  });

  test("Ajout du produit Sauce Labs Backpack au panier", async () => {
    await pageProduits.boutonAjouterBackpack.click();

    await expect(pageProduits.compteurPanier).toHaveText("1");
  });

  test("Suppression du produit Sauce Labs Backpack du panier", async () => {
    await pageProduits.boutonAjouterBackpack.click();

    await expect(pageProduits.compteurPanier).toHaveText("1");

    await pageProduits.boutonSupprimerBackpack.click();

    await expect(pageProduits.compteurPanier).toHaveCount(0);
  });

  test("Accès au panier après ajout du produit Sauce Labs Backpack", async ({
    page,
  }) => {
    await pageProduits.boutonAjouterBackpack.click();

    await expect(pageProduits.compteurPanier).toHaveText("1");

    await pageProduits.boutonPanier.click();

    await expect(page).toHaveURL(/cart/);
  });
});
