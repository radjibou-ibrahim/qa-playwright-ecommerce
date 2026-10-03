
const { test: base, expect } = require("@playwright/test");
const PageConnexion = require("../pages/PageConnexion");

const test = base.extend({
  pageConnectee: async ({ page }, use) => {
    const pageConnexion = new PageConnexion(page);

    await page.goto("https://www.saucedemo.com/", {
      waitUntil: "domcontentloaded",
    });

    await pageConnexion.seConnecter("standard_user", "secret_sauce");

    await expect(page).toHaveURL(/.*inventory.*/);

    await use(page);
  },
});

module.exports = {
  test,
  expect,
};
