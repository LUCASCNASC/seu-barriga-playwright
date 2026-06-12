import { test, expect } from "./globalCommands";
import { AccountPage } from "./pages/account/AccountPage";
import { fakerPT_BR as faker } from "@faker-js/faker";
import messagesAccount from "./pages/account/messagesAccount.json";

test.describe("New Account", () => {
    
    test.beforeEach(async ({ page, loginMainUser }) => {
        await loginMainUser();
        const accountPage = new AccountPage(page);
        await accountPage.clickAccountsDropdown();
        await accountPage.clickAddAccount();
    });
    test("create new account and delete it", async ({ page }) => {
        const accountPage = new AccountPage(page);
        const randomName = faker.person.fullName();
        await accountPage.fillAccountName(randomName);
        await accountPage.clickSave();
        await accountPage.validateSuccessMessage(messagesAccount.messages.accountAddedSuccess);
        await accountPage.clickAccountsDropdown();
        await accountPage.clickListAccounts();
        await accountPage.validateAccountVisible(randomName);
        await accountPage.deleteAccount(randomName);
        await accountPage.validateSuccessMessage(messagesAccount.messages.accountDeletedSuccess);
        await accountPage.validateAccountNotVisible(randomName);
    });
    test("create new account, change name and delete it", async ({ page }) => {
        const accountPage = new AccountPage(page);

        const randomName = faker.person.fullName();
        await accountPage.fillAccountName(randomName);
        await accountPage.clickSave();
        await accountPage.validateSuccessMessage(messagesAccount.messages.accountAddedSuccess);
        await accountPage.clickAccountsDropdown();
        await accountPage.clickListAccounts();
        await accountPage.validateAccountVisible(randomName);
        
        await accountPage.clickEditAccount(randomName);
        await accountPage.validateAccountNameInput(randomName);

        const newRandomName = faker.person.fullName();
        await accountPage.fillAccountName(newRandomName);
        await accountPage.clickSave();
        await accountPage.validateSuccessMessage(messagesAccount.messages.accountUpdatedSuccess);
        await accountPage.validateAccountVisible(newRandomName);

        await accountPage.deleteAccount(newRandomName);
        await accountPage.validateSuccessMessage(messagesAccount.messages.accountDeletedSuccess);
        await accountPage.validateAccountNotVisible(newRandomName);
    });
    test("try to create new account with name empty", async ({ page }) => {
        const accountPage = new AccountPage(page);
        await accountPage.clickSave();
        await accountPage.validateErrorMessage(messagesAccount.messages.accountNameEmptyError);
    });
});