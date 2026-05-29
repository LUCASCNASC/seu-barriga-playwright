import { test, expect } from "@playwright/test";
import { LoginPage } from "../tests/pages/login/LoginPage";
import messagesLogin from "../tests/pages/login/messagesLogin.json";

test.describe("Successful login", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
    });
    test("successful login", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.fillEmail(process.env.MAIN_EMAIL);
        await loginPage.fillPassword(process.env.MAIN_PASSWORD);
        await loginPage.submit();
        await loginPage.validateSuccessMessage(messagesLogin.messages.welcome);
    });
});

test.describe("login: credentials invalid", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
    });
    test("email invalid", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.fillEmail(process.env.WRONG_EMAIL as string);
        await loginPage.fillPassword(process.env.MAIN_PASSWORD as string);
    });
    test("password invalid", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.fillEmail(process.env.MAIN_EMAIL as string);
        await loginPage.fillPassword(process.env.WRONG_PASSWORD as string);
    });
    test("email and password invalid", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.fillEmail(process.env.WRONG_EMAIL as string);
        await loginPage.fillPassword(process.env.WRONG_PASSWORD as string);
    });
    test.afterEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.submit();
        await loginPage.validateErrorMessage(messagesLogin.messages.invalidLogin);
    });
});

test.describe("login: fields empty", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
    });
    test("email empty", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.fillPassword(process.env.MAIN_PASSWORD as string);
        await loginPage.submit();
        await loginPage.validateErrorMessage(messagesLogin.messages.emailRequired);
    });
    test("password empty", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.fillEmail(process.env.MAIN_EMAIL as string);
        await loginPage.submit();
        await loginPage.validateErrorMessage(messagesLogin.messages.passwordRequired);
    });
    // test("email and password empty", async ({ page }) => {
    //     const loginPage = new LoginPage(page);
    //     await loginPage.submit();
    //     await loginPage.validateErrorMessage(messagesLogin.messages.emailRequired);
    //     await loginPage.validateErrorMessage(messagesLogin.messages.passwordRequired);
    // });
});
