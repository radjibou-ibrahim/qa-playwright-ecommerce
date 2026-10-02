class PageProduits {
  constructor(page) {
    this.page = page;

    // Page produits
    this.titreProduits = page.getByText("Products");

    // Sauce Labs Backpack
    this.produitBackpack = page.getByText("Sauce Labs Backpack");

    this.prixBackpack = page.getByText("$29.99");

    this.descriptionBackpack = page.getByText(
      "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.",
    );

    // Ajouter le Backpack au panier
    this.boutonAjouterBackpack = page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]',
    );

    // Supprimer le Backpack du panier
    this.boutonSupprimerBackpack = page.locator(
      '[data-test="remove-sauce-labs-backpack"]',
    );

    // Panier
    this.compteurPanier = page.locator(".shopping_cart_badge");

    this.boutonPanier = page.locator(".shopping_cart_link");
  }
}

module.exports = PageProduits;
