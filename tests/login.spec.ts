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
    test("successful logout", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.fillEmail(process.env.MAIN_EMAIL);
        await loginPage.fillPassword(process.env.MAIN_PASSWORD);
        await loginPage.submit();
        await loginPage.validateSuccessMessage(messagesLogin.messages.welcome);
        await loginPage.logout();
        await loginPage.validateNavbarBrand(messagesLogin.frontendValidations.titlePage);
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
});

test.describe("frontend validations", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
    });
    test("frontend validations", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.validateNavbarBrand(messagesLogin.frontendValidations.titlePage);
        await loginPage.validateNavbarLoginLink(messagesLogin.frontendValidations.loginLink);
        await loginPage.validateNavbarRegisterLink(messagesLogin.frontendValidations.registerLink);
        await loginPage.validateEmailLabel(messagesLogin.frontendValidations.emailLabel);
        await loginPage.validatePasswordLabel(messagesLogin.frontendValidations.passwordLabel);

        // Validações do Input de Email
        await loginPage.validateEmailPlaceholder(messagesLogin.frontendValidations.emailPlaceholder);
        await loginPage.validateEmailIsEmpty();
        await loginPage.fillEmail(process.env.MAIN_EMAIL as string);
        await loginPage.validateEmailValue(process.env.MAIN_EMAIL as string);
        await loginPage.clearEmail();
        await loginPage.validateEmailIsEmpty();

        // Validações do Input de Senha
        await loginPage.validatePasswordPlaceholder(messagesLogin.frontendValidations.passwordPlaceholder);
        await loginPage.validatePasswordIsEmpty();
        await loginPage.fillPassword(process.env.MAIN_PASSWORD as string);
        await loginPage.validatePasswordValue(process.env.MAIN_PASSWORD as string);
        await loginPage.clearPassword();
        await loginPage.validatePasswordIsEmpty();

        // Validação do botão de Entrar
        await loginPage.validateSubmitButton(messagesLogin.frontendValidations.submitButton);
    });
});