import { test, expect } from "./globalCommands";
import { UserPage } from "./pages/user/UserPage";
import { fakerPT_BR as faker } from "@faker-js/faker";
import messagesUser from "./pages/user/messagesUser.json";

test.describe("New User Success", () => {
    test.beforeEach(async ({ page }) => {
        const userPage = new UserPage(page);
        await userPage.goto();
    });
    test("create new user successfully", async ({ page }) => {
        const userPage = new UserPage(page);
        await userPage.fillName(faker.person.fullName());
        await userPage.fillEmail(faker.internet.email());
        await userPage.fillPassword(faker.internet.password());
        await userPage.submit();
        await userPage.validateSuccessMessage(messagesUser.messages.userCreatedSuccess);
    });
});

test.describe("New User Error", () => {
    test.beforeEach(async ({ page }) => {
        const userPage = new UserPage(page);
        await userPage.goto();
    });
    test("try to create new user without filling name", async ({ page }) => {
        const userPage = new UserPage(page);
        await userPage.fillEmail(faker.internet.email());
        await userPage.fillPassword(faker.internet.password());
        await userPage.submit();
        await userPage.validateErrorMessage(messagesUser.messages.nameRequired);
    });
    test("try to create new user without filling email", async ({ page }) => {
        const userPage = new UserPage(page);
        await userPage.fillName(faker.person.fullName());
        await userPage.fillPassword(faker.internet.password());
        await userPage.submit();
        await userPage.validateErrorMessage(messagesUser.messages.emailRequired);
    });
    test("try to create new user without filling password", async ({ page }) => {
        const userPage = new UserPage(page);
        await userPage.fillName(faker.person.fullName());
        await userPage.fillEmail(faker.internet.email());
        await userPage.submit();
        await userPage.validateErrorMessage(messagesUser.messages.passwordRequired);
    });
    test("try to create new user without filling name and email", async ({ page }) => {
        const userPage = new UserPage(page);
        await userPage.fillPassword(faker.internet.password());
        await userPage.submit();
        await userPage.validateErrorMessage(messagesUser.messages.nameRequired);
        await userPage.validateErrorMessage(messagesUser.messages.emailRequired);
    });
    test("try to create new user without filling name and password", async ({ page }) => {
        const userPage = new UserPage(page);
        await userPage.fillEmail(faker.internet.email());
        await userPage.submit();
        await userPage.validateErrorMessage(messagesUser.messages.nameRequired);
        await userPage.validateErrorMessage(messagesUser.messages.passwordRequired);
    });
    test("try to create new user without filling email and password", async ({ page }) => {
        const userPage = new UserPage(page);
        await userPage.fillName(faker.person.fullName());
        await userPage.submit();
        await userPage.validateErrorMessage(messagesUser.messages.emailRequired);
        await userPage.validateErrorMessage(messagesUser.messages.passwordRequired);
    });
    test("try to create new user without filling name, email and password", async ({ page }) => {
        const userPage = new UserPage(page);
        await userPage.submit();
        
        await userPage.validateErrorMessage(messagesUser.messages.nameRequired);
        await userPage.validateErrorMessage(messagesUser.messages.emailRequired);
        await userPage.validateErrorMessage(messagesUser.messages.passwordRequired);
    });
});