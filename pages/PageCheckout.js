class PageCheckout {
  constructor(page) {
    this.page = page;

    // =========================
    // Formulaire Checkout
    // =========================

    this.champPrenom = page.locator("#first-name");
    this.champNom = page.locator("#last-name");
    this.champCodePostal = page.locator("#postal-code");

    // Bouton Continuer
    this.boutonContinuer = page.locator("#continue");

    // Message d'erreur
    this.messageErreur = page.locator('[data-test="error"]');

    // =========================
    // Récapitulatif de commande
    // =========================

    // Conteneur de la page récapitulative
    this.pageRecapitulatif = page.locator(
      '[data-test="checkout-summary-container"]',
    );

    // Titre "Checkout: Overview"
    this.titreRecapitulatif = page.getByText("Checkout: Overview", {
      exact: true,
    });

    // Produit Backpack
    this.nomProduitBackpack = page.getByText("Sauce Labs Backpack", {
      exact: true,
    });

    // Prix du Backpack
    this.prixProduitBackpack = page.getByText("$29.99", {
      exact: true,
    });

    // =========================
    // Finalisation de la commande
    // =========================

    // Bouton Finish
    this.boutonFinaliser = page.locator("#finish");

    // Message de confirmation
    this.messageConfirmation = page.locator('[data-test="complete-header"]');
  }
}

module.exports = PageCheckout;
