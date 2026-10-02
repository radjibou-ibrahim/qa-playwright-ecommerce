class PageConnexion {
  constructor(page) {
    this.page = page;

    this.champNomUtilisateur = page.getByPlaceholder("Username");
    this.champMotDePasse = page.getByPlaceholder("Password");
    this.boutonConnexion = page.getByRole("button", { name: "Login" });
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async seConnecter(nomUtilisateur, motDePasse) {
    await this.champNomUtilisateur.fill(nomUtilisateur);
    await this.champMotDePasse.fill(motDePasse);
    await this.boutonConnexion.click();
  }
}

module.exports = PageConnexion;
