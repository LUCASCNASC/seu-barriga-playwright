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

	// Método para clicar no botão de sair (logout)
	async logout() {
		await this.page.click(loginSelectors.navbarLogoutLink);
	}

	// Método para validar a mensagem de sucesso no login
	async validateSuccessMessage(expectedText: string) {
		await expect(this.page.locator(loginSelectors.successAlert)).toContainText(expectedText);
	}

	// Método para validar a mensagem de erro no login
	async validateErrorMessage(expectedText: string) {
		await expect(this.page.locator(loginSelectors.errorAlert)).toContainText(expectedText);
	}

	// Método para validar a visibilidade e o texto da marca na navbar
	async validateNavbarBrand(expectedText: string) {
		await expect(this.page.locator(loginSelectors.navbarBrand)).toHaveText(expectedText);
	}

	// Método para validar o texto e garantir que o link de login na navbar está habilitado para clique
	async validateNavbarLoginLink(expectedText: string) {
		const loginLink = this.page.locator(loginSelectors.navbarLoginLink);
		await expect(loginLink).toHaveText(expectedText);
		await expect(loginLink).toBeEnabled();
	}

	// Método para validar o texto e garantir que o link de novo usuário na navbar está habilitado para clique
	async validateNavbarRegisterLink(expectedText: string) {
		const registerLink = this.page.locator(loginSelectors.navbarRegisterLink);
		await expect(registerLink).toHaveText(expectedText);
		await expect(registerLink).toBeEnabled();
	}

	// Método para validar o texto do label de email
	async validateEmailLabel(expectedText: string) {
		await expect(this.page.locator(loginSelectors.emailLabel)).toHaveText(expectedText);
	}

	// Método para validar o texto do label de senha
	async validatePasswordLabel(expectedText: string) {
		await expect(this.page.locator(loginSelectors.passwordLabel)).toHaveText(expectedText);
	}

	// Método para validar o placeholder do email
	async validateEmailPlaceholder(expectedText: string) {
		await expect(this.page.locator(loginSelectors.emailInput)).toHaveAttribute("placeholder", expectedText);
	}

	// Método para validar o placeholder da senha
	async validatePasswordPlaceholder(expectedText: string) {
		await expect(this.page.locator(loginSelectors.passwordInput)).toHaveAttribute("placeholder", expectedText);
	}

	// Método para validar se o campo de email está vazio
	async validateEmailIsEmpty() {
		await expect(this.page.locator(loginSelectors.emailInput)).toBeEmpty();
	}

	// Método para validar se o campo de senha está vazio
	async validatePasswordIsEmpty() {
		await expect(this.page.locator(loginSelectors.passwordInput)).toBeEmpty();
	}

	// Método para validar o valor preenchido no campo de email
	async validateEmailValue(expectedValue: string) {
		await expect(this.page.locator(loginSelectors.emailInput)).toHaveValue(expectedValue);
	}

	// Método para validar o valor preenchido no campo de senha
	async validatePasswordValue(expectedValue: string) {
		await expect(this.page.locator(loginSelectors.passwordInput)).toHaveValue(expectedValue);
	}

	// Método para limpar o campo de email
	async clearEmail() {
		await this.page.locator(loginSelectors.emailInput).clear();
	}

	// Método para limpar o campo de senha
	async clearPassword() {
		await this.page.locator(loginSelectors.passwordInput).clear();
	}

	// Método para validar o texto e garantir que o botão de login está habilitado
	async validateSubmitButton(expectedText: string) {
		const submitBtn = this.page.locator(loginSelectors.submitButton);
		await expect(submitBtn).toHaveText(expectedText);
		await expect(submitBtn).toBeEnabled();
	}
}