const { test, expect } = require("@playwright/test");
const PageConnexion = require("../pages/PageConnexion");
const PageProduits = require("../pages/PageProduits");
const PagePanier = require("../pages/PagePanier");
const PageCheckout = require("../pages/PageCheckout");
const PageRecapitulatif = require("../pages/PageRecapitulatif");

test.describe("Page produits", () => {
  let pageProduits;
  let pagePanier;
  let pageCheckout;
  let pageRecapitulatif;

  test.beforeEach(async ({ page }) => {
    const pageConnexion = new PageConnexion(page);

    pageProduits = new PageProduits(page);
    pagePanier = new PagePanier(page);
    pageCheckout = new PageCheckout(page);
    pageRecapitulatif = new PageRecapitulatif(page);

    // Accès au site
    await page.goto("https://www.saucedemo.com/");

    // Connexion
    await pageConnexion.seConnecter("standard_user", "secret_sauce");

    // Vérification de la connexion
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

    await expect(pageProduits.compteurPanier).not.toBeVisible();
  });

  test("Accès au panier après ajout du produit Sauce Labs Backpack", async ({
    page,
  }) => {
    await pageProduits.boutonAjouterBackpack.click();

    await expect(pageProduits.compteurPanier).toHaveText("1");

    await pageProduits.boutonPanier.click();

    await expect(page).toHaveURL(/cart/);
  });

  test("Vérification du produit Backpack dans le panier", async () => {
    await pageProduits.boutonAjouterBackpack.click();

    await pageProduits.boutonPanier.click();

    await expect(pagePanier.nomProduitBackpack).toBeVisible();

    await expect(pagePanier.prixProduitBackpack).toBeVisible();
  });

  test("Accès au checkout après ajout du Backpack", async ({ page }) => {
    await pageProduits.boutonAjouterBackpack.click();

    await pageProduits.boutonPanier.click();

    await expect(page).toHaveURL(/cart/);

    await page.locator('[data-test="checkout"]').click();

    await expect(page).toHaveURL(/checkout-step-one/);
  });

  test("Remplissage des informations client au checkout", async ({ page }) => {
    await pageProduits.boutonAjouterBackpack.click();

    await pageProduits.boutonPanier.click();

    await page.locator('[data-test="checkout"]').click();

    await pageCheckout.champPrenom.fill("Guegui");
    await pageCheckout.champNom.fill("Rajab");
    await pageCheckout.champCodePostal.fill("12345");

    await expect(pageCheckout.champPrenom).toHaveValue("Guegui");

    await expect(pageCheckout.champNom).toHaveValue("Rajab");

    await expect(pageCheckout.champCodePostal).toHaveValue("12345");
  });

  test("Finalisation de la commande", async ({ page }) => {
    await pageProduits.boutonAjouterBackpack.click();

    await pageProduits.boutonPanier.click();

    await page.locator('[data-test="checkout"]').click();

    await pageCheckout.champPrenom.fill("Guegui");
    await pageCheckout.champNom.fill("Rajab");
    await pageCheckout.champCodePostal.fill("12345");

    await pageCheckout.boutonContinuer.click();

    await pageRecapitulatif.boutonTerminer.click();

    await expect(pageRecapitulatif.titreConfirmation).toBeVisible();
  });
});
