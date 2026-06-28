import { Page, expect } from "@playwright/test";
import { accountSelectors } from "./AccountSelectors";

export class AccountPage {
	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	//This method assumes that the user is already logged in and on the account management page
	async clickAccountsDropdown() {
		await this.page.click(accountSelectors.accountsDropdown);
	}

	//This method assumes that the accounts dropdown is already open
	async clickAddAccount() {
		await this.page.click(accountSelectors.addAccountLink);
	}

	//This method assumes that the add account form is already open
	async fillAccountName(name: string) {
		await this.page.fill(accountSelectors.accountNameInput, name);
	}

	//This method assumes that the add account form is already open and the account name is filled in
	async clickSave() {
		await this.page.click(accountSelectors.saveButton);
	}

	//This method assumes that the user is already logged in and on the account management page
	async clickListAccounts() {
		await this.page.click(accountSelectors.listAccountsLink);
	}

	//This method assumes that the user is already logged in, on the account management page, and the accounts list is visible
	async validateAccountVisible(accountName: string) {
		await expect(this.page.locator(accountSelectors.accountsTable).getByRole('cell', { name: accountName })).toBeVisible();
	}

	//This method assumes that the user is already logged in, on the account management page, and the accounts list is visible
	async deleteAccount(accountName: string) {
		const row = this.page.locator(accountSelectors.accountsTable).getByRole('row', { name: accountName });
		await row.locator(accountSelectors.deleteAccountButton).click();
	}

	//This method assumes that the user is already logged in, on the account management page, and the accounts list is visible
	async validateAccountNotVisible(accountName: string) {
		await expect(this.page.locator(accountSelectors.accountsTable).getByRole('cell', { name: accountName })).toBeHidden();
	}

	//This method assumes that the user is already logged in, on the account management page, and a success message is expected to be visible
	async validateSuccessMessage(expectedText: string) {
		await expect(this.page.locator(accountSelectors.successAlert)).toContainText(expectedText);
	}

	//This method assumes that the user is already logged in, on the account management page, and an error message is expected to be visible
	async validateErrorMessage(expectedText: string) {
		await expect(this.page.locator(accountSelectors.errorAlert)).toContainText(expectedText);
	}

	//This method assumes that the user is already logged in, on the account management page, and the accounts list is visible
	async clickEditAccount(accountName: string) {
		const row = this.page.locator(accountSelectors.accountsTable).getByRole('row', { name: accountName });
		await row.locator(accountSelectors.editAccountButton).click();
	}

	//This method assumes that the user is already logged in, on the account management page, and the edit account form is open
	async validateAccountNameInput(expectedName: string) {
		await expect(this.page.locator(accountSelectors.accountNameInput)).toHaveValue(expectedName);
	}
}
