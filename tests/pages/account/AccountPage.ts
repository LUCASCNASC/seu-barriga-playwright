import { Page } from "@playwright/test";
import { loginSelectors } from "../login/LoginSelectors";

export class AccountPage {
	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	async clickAccountsDropdown() {
		await this.page.click(loginSelectors.accountsDropdown);
	}

	async clickAddAccount() {
		await this.page.click(loginSelectors.addAccountLink);
	}

	async fillAccountName(name: string) {
		await this.page.fill(loginSelectors.accountNameInput, name);
	}
}