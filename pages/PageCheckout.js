class PageCheckout {
  constructor(page) {
    this.page = page;

    // Informations client
    this.champPrenom = page.locator('[data-test="firstName"]');
    this.champNom = page.locator('[data-test="lastName"]');
    this.champCodePostal = page.locator('[data-test="postalCode"]');

    // Boutons
    this.boutonContinuer = page.locator('[data-test="continue"]');
    this.boutonAnnuler = page.locator('[data-test="cancel"]');

    // Messages d'erreur
    this.messageErreur = page.locator('[data-test="error"]');
  }
}

module.exports = PageCheckout;
