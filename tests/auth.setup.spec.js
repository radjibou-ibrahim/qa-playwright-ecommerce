const { test: setup, expect } = require("@playwright/test");
const PageConnexion = require("../pages/PageConnexion");

const authFile = "playwright/.auth/user.json";

setup("authentification", async ({ page }) => {
  const pageConnexion = new PageConnexion(page);

  await page.goto("https://www.saucedemo.com/", {
    waitUntil: "domcontentloaded",
  });

  await pageConnexion.seConnecter("standard_user", "secret_sauce");

  await expect(page).toHaveURL(/.*inventory.*/);

  await page.context().storageState({
    path: authFile,
  });
});
