class PageRecapitulatif {
  constructor(page) {
    this.page = page;

    // Produit
    this.nomProduitBackpack = page.getByText("Sauce Labs Backpack");

    this.prixProduitBackpack = page.getByText("$29.99");

    // Bouton de finalisation
    this.boutonTerminer = page.locator('[data-test="finish"]');

    // Confirmation de commande
    this.titreConfirmation = page.getByText("Thank you for your order!");

    this.messageConfirmation = page.getByText(
      "Your order has been dispatched, and will arrive just as fast as the pony can get there!",
    );
  }
}

module.exports = PageRecapitulatif;
