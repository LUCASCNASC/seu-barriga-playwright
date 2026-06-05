import { Page, expect } from "@playwright/test";
import { userSelectors } from "./UserSelectors";

export class UserPage {
    readonly page: Page;
    readonly url: string;

    constructor(page: Page) {
        this.page = page;
        this.url = "/cadastro";
    }

    // Método para navegar direto para a página de cadastro
    async goto() {
        await this.page.goto(this.url);
    }

    //This method assumes that the user is already logged in and on the account management page
    async clickAccountsDropdown() {
        await this.page.click(userSelectors.accountsDropdown);
    }

    // Clica no link para iniciar o cadastro de um novo usuário
    async clickNewUser() {
        await this.page.click(userSelectors.newUserLink);
    }

    // Preenche o campo de nome
    async fillName(name: string) {
        await this.page.fill(userSelectors.nameInput, name);
    }

    // Preenche o campo de email
    async fillEmail(email: string) {
        await this.page.fill(userSelectors.emailInput, email);
    }

    // Preenche o campo de senha
    async fillPassword(password: string) {
        await this.page.fill(userSelectors.passwordInput, password);
    }

    // Clica no botão de cadastrar
    async submit() {
        await this.page.click(userSelectors.submitButton);
    }

    // Valida a mensagem de erro esperada garantindo que ela está visível
    async validateErrorMessage(expectedText: string) {
        const errorLocator = this.page.locator(userSelectors.errorAlert, { hasText: expectedText });
        await expect(errorLocator).toBeVisible();
    }

    // Valida a mensagem de sucesso esperada garantindo que ela está visível
    async validateSuccessMessage(expectedText: string) {
        const successLocator = this.page.locator(userSelectors.successAlert, { hasText: expectedText });
        await expect(successLocator).toBeVisible();
    }
}