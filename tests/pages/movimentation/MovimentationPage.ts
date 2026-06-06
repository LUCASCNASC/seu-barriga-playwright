import { Page, expect } from "@playwright/test";
import { userSelectors } from "./MovimentationSelectors";

export class MovimentationPage {
    readonly page: Page;
    readonly url: string;

    constructor(page: Page) {
        this.page = page;
        this.url = "/movimentacao";
    }

    // Método para navegar direto para a página de moviemntação
    async goto() {
        await this.page.goto(this.url);
    }

    
}