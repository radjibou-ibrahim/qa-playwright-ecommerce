const { test, expect } = require("@playwright/test");
const PageConnexion = require("../pages/PageConnexion");
const PageProduits = require("../pages/PageProduits");
const PagePanier = require("../pages/PagePanier");
const PageCheckout = require("../pages/PageCheckout");

test.describe("Page produits", () => {
  test.setTimeout(60000);
  let pageProduits;
  let pagePanier;
  let pageCheckout;

  test.beforeEach(async ({ page }) => {
    const pageConnexion = new PageConnexion(page);

    pageProduits = new PageProduits(page);
    pagePanier = new PagePanier(page);
    pageCheckout = new PageCheckout(page);

    // Accès au site
    await page.goto("https://www.saucedemo.com/", {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    // Vérification que la page de connexion est disponible
    await expect(pageConnexion.champNomUtilisateur).toBeVisible({
      timeout: 10000,
    });

    // Connexion
    await pageConnexion.seConnecter("standard_user", "secret_sauce");

    // Vérification de la connexion
    await expect(page).toHaveURL(/.*inventory.*/, { timeout: 10000 });
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

    await pageProduits.boutonPanier.click();

    await pagePanier.boutonSupprimerBackpack.click();

    await expect(pagePanier.nomProduitBackpack).not.toBeVisible();
  });

  test("Accès au panier après ajout du produit Sauce Labs Backpack", async ({
    page,
  }) => {
    await pageProduits.boutonAjouterBackpack.click();

    await pageProduits.boutonPanier.click();

    await expect(page).toHaveURL(/.*cart.*/);
  });

  test("Vérification du produit Backpack dans le panier", async () => {
    await pageProduits.boutonAjouterBackpack.click();

    await pageProduits.boutonPanier.click();

    await expect(pagePanier.nomProduitBackpack).toBeVisible();

    await expect(pagePanier.prixProduitBackpack).toBeVisible();
  });

  test("Remplissage des informations client au checkout", async () => {
    await pageProduits.boutonAjouterBackpack.click();

    await pageProduits.boutonPanier.click();

    await pagePanier.boutonCheckout.click();

    await pageCheckout.champPrenom.fill("Guegui");
    await pageCheckout.champNom.fill("Rajab");
    await pageCheckout.champCodePostal.fill("12345");

    await pageCheckout.boutonContinuer.click();
  });

  test("Accès au récapitulatif de commande", async ({ page }) => {
    await pageProduits.boutonAjouterBackpack.click();

    await pageProduits.boutonPanier.click();

    await pagePanier.boutonCheckout.click();

    await pageCheckout.champPrenom.fill("Guegui");
    await pageCheckout.champNom.fill("Rajab");
    await pageCheckout.champCodePostal.fill("12345");

    await pageCheckout.boutonContinuer.click();

    await expect(page).toHaveURL(/.*checkout-step-two.*/);
  });

  test("Finalisation de la commande", async ({ page }) => {
    await pageProduits.boutonAjouterBackpack.click();

    await pageProduits.boutonPanier.click();

    await pagePanier.boutonCheckout.click();

    await pageCheckout.champPrenom.fill("Guegui");
    await pageCheckout.champNom.fill("Rajab");
    await pageCheckout.champCodePostal.fill("12345");

    await pageCheckout.boutonContinuer.click();

    await page.locator('[data-test="finish"]').click();

    await expect(page).toHaveURL(/.*checkout-complete.*/);
  });

  test("Refus du checkout avec un prénom vide", async () => {
    await pageProduits.boutonAjouterBackpack.click();

    await pageProduits.boutonPanier.click();

    await pagePanier.boutonCheckout.click();

    // Prénom volontairement laissé vide
    await pageCheckout.champNom.fill("Rajab");
    await pageCheckout.champCodePostal.fill("12345");

    await pageCheckout.boutonContinuer.click();

    await expect(pageCheckout.messageErreur).toBeVisible();

    await expect(pageCheckout.messageErreur).toHaveText(
      "Error: First Name is required",
    );
  });
  test("Refus du checkout avec un nom vide", async () => {
    await pageProduits.boutonAjouterBackpack.click();

    await pageProduits.boutonPanier.click();

    await pagePanier.boutonCheckout.click();

    await pageCheckout.champPrenom.fill("Guegui");
    // Nom volontairement laissé vide
    await pageCheckout.champCodePostal.fill("12345");

    await pageCheckout.boutonContinuer.click();

    await expect(pageCheckout.messageErreur).toBeVisible();

    await expect(pageCheckout.messageErreur).toHaveText(
      "Error: Last Name is required",
    );
  });

  test("Refus du checkout avec un code postal vide", async () => {
    await pageProduits.boutonAjouterBackpack.click();

    await pageProduits.boutonPanier.click();

    await pagePanier.boutonCheckout.click();

    await pageCheckout.champPrenom.fill("Guegui");
    await pageCheckout.champNom.fill("Rajab");
    // Code postal volontairement laissé vide

    await pageCheckout.boutonContinuer.click();

    await expect(pageCheckout.messageErreur).toBeVisible();

    await expect(pageCheckout.messageErreur).toHaveText(
      "Error: Postal Code is required",
    );
  });

  test("Validation du formulaire Checkout avec des informations valides", async () => {
    await pageProduits.boutonAjouterBackpack.click();

    await pageProduits.boutonPanier.click();

    await pagePanier.boutonCheckout.click();

    await pageCheckout.champPrenom.fill("Guegui");
    await pageCheckout.champNom.fill("Rajab");
    await pageCheckout.champCodePostal.fill("12345");

    await pageCheckout.boutonContinuer.click();

    await expect(pageCheckout.pageRecapitulatif).toBeVisible();

    await expect(pageCheckout.titreRecapitulatif).toBeVisible();

    await expect(pageCheckout.nomProduitBackpack).toBeVisible();

    await expect(pageCheckout.prixProduitBackpack).toBeVisible();
  });
});
