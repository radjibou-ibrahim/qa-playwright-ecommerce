class PageProduits {
  constructor(page) {
    this.page = page;

    this.titreProduits = page.getByText("Products");

    this.produitBackpack = page.getByText("Sauce Labs Backpack");

    this.prixBackpack = page.getByText("$29.99");

    this.descriptionBackpack = page.getByText(
      "carry.allTheThings() with the sleek, streamlined Sly Pack",
    );

    this.boutonAjouterBackpack = page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]',
    );

    this.compteurPanier = page.locator(".shopping_cart_badge");

    this.boutonSupprimerBackpack = page.locator(
      '[data-test="remove-sauce-labs-backpack"]',
    );

    this.boutonPanier = page.locator('[data-test="shopping-cart-link"]');
  }
}

module.exports = PageProduits;
