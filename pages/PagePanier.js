class PagePanier {
  constructor(page) {
    this.page = page;

    this.nomProduitBackpack = page
      .locator('[data-test="inventory-item-name"]')
      .filter({
        hasText: "Sauce Labs Backpack",
      });

    this.prixProduitBackpack = page
      .locator('[data-test="inventory-item-price"]')
      .filter({
        hasText: "$29.99",
      });
  }
}

module.exports = PagePanier;
