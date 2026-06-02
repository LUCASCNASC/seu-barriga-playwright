import { test, expect } from "./globalCommands";
import { AccountPage } from "./pages/account/AccountPage";
import { fakerPT_BR as faker } from "@faker-js/faker";

test.describe("New Account", () => {

    test("frontend validations", async ({ page, loginMainUser }) => {
        await loginMainUser();
        const accountPage = new AccountPage(page);
        await accountPage.clickAccountsDropdown();
        await accountPage.clickAddAccount();

        const randomName = faker.person.fullName();
        await accountPage.fillAccountName(randomName);
    });
});