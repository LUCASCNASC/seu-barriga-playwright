import { Page, expect } from "@playwright/test";
import { loginSelectors } from "./LoginSelectors";

export class LoginPage {
	readonly page: Page;
	readonly url: string;

	constructor(page: Page) {
		this.page = page;
		// Usar path relativo para respeitar `baseURL` definido no Playwright config
		this.url = "/login";
	}

	// Método para clicar fora dos campos de email e senha, útil para testar validação de campos
	async clickBody() {
		await this.page.click("body");
	}

	// Método para navegar até a página de login
	async goto() {
		await this.page.goto(this.url);
	}

	// Métodos para preencher os campos de email e senha
	async fillEmail(email: string) {
		await this.page.fill(loginSelectors.emailInput, email);
	}

	// Método para limpar o campo de senha
	async fillPassword(password: string) {
		await this.page.fill(loginSelectors.passwordInput, password);
	}

	// Método para clicar no botão de login
	async submit() {
		await this.page.click(loginSelectors.submitButton);
	}

	// Método para validar a mensagem de sucesso no login
	async validateSuccessMessage(expectedText: string) {
		await expect(this.page.locator(loginSelectors.successAlert)).toContainText(expectedText);
	}

	// Método para validar a mensagem de erro no login
	async validateErrorMessage(expectedText: string) {
		await expect(this.page.locator(loginSelectors.errorAlert)).toContainText(expectedText);
	}
}
