import { test, expect } from "@playwright/test";
import { LoginPage } from "../tests/pages/login/LoginPage";

test.describe("Successful login", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
    });
    test("successful login: administrador", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.fillEmail(process.env.MAIN_EMAIL);
        await loginPage.fillPassword(process.env.MAIN_PASSWORD);
        await loginPage.submit();
    });
});
