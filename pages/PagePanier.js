class PagePanier {
  constructor(page) {
    this.page = page;

    // Produit Backpack dans le panier
    this.nomProduitBackpack = page.getByText("Sauce Labs Backpack", {
      exact: true,
    });

    this.prixProduitBackpack = page.getByText("$29.99", {
      exact: true,
    });

    // Bouton de suppression du Backpack
    this.boutonSupprimerBackpack = page.locator(
      '[data-test="remove-sauce-labs-backpack"]',
    );

    // Bouton Checkout
    this.boutonCheckout = page.locator('[data-test="checkout"]');
  }
}

module.exports = PagePanier;
