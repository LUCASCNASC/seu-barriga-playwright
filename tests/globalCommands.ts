import { test as base, expect } from "@playwright/test";
import { LoginPage } from "./pages/login/LoginPage";
import { AccountPage } from "./pages/account/AccountPage";

// Tipagem das nossas fixtures personalizadas
type MyFixtures = {
    loginMainUser: () => Promise<void>;
    createAccount: (accountName: string) => Promise<void>;
};

// Estendendo o 'test' base do Playwright com o nosso novo comando global
export const test = base.extend<MyFixtures>({
    loginMainUser: async ({ page }, use) => {
        await use(async () => {
            const loginPage = new LoginPage(page);
            await loginPage.goto();
            await loginPage.fillEmail(process.env.MAIN_EMAIL as string);
            await loginPage.fillPassword(process.env.MAIN_PASSWORD as string);
            await loginPage.submit();
        });
    },
    createAccount: async ({ page }, use) => {
        await use(async (accountName: string) => {
            const accountPage = new AccountPage(page);
            await accountPage.clickAccountsDropdown();
            await accountPage.clickAddAccount();
            await accountPage.fillAccountName(accountName);
            await accountPage.clickSave();
        });
    },
});

export { expect };