const { test, expect } = require('@playwright/test');
const PageConnexion = require('../pages/PageConnexion');

test('Connexion réussie avec un utilisateur valide', async ({ page }) => {

    const pageConnexion = new PageConnexion(page);

    await page.goto('https://www.saucedemo.com/');

    await pageConnexion.seConnecter(
        'standard_user',
        'secret_sauce'
    );

    await expect(page).toHaveURL(/inventory/);

});

test('Connexion refusée avec un mot de passe incorrect', async ({ page }) => {

    const pageConnexion = new PageConnexion(page);

    await page.goto('https://www.saucedemo.com/');

    await pageConnexion.seConnecter(
        'standard_user',
        'wrong_password'
    );

    await expect(pageConnexion.errorMessage).toBeVisible();
    await expect(pageConnexion.errorMessage).toHaveText(
    'Epic sadface: Username and password do not match any user in this service'
);
});

test('Connexion refusée avec un username vide', async ({ page }) => {

    const pageConnexion = new PageConnexion(page);

    await page.goto('https://www.saucedemo.com/');

    await pageConnexion.seConnecter(
        '',
        'secret_sauce'
    );

    await expect(pageConnexion.errorMessage).toBeVisible();

    await expect(pageConnexion.errorMessage).toHaveText(
        'Epic sadface: Username is required'
    );
});
test('Connexion refusée avec un mot de passe vide', async ({ page }) => {

    const pageConnexion = new PageConnexion(page);

    await page.goto('https://www.saucedemo.com/');

    await pageConnexion.seConnecter(
        'standard_user',
        ''
    );

    await expect(pageConnexion.errorMessage).toBeVisible();

    await expect(pageConnexion.errorMessage).toHaveText(
        'Epic sadface: Password is required'
    );
});