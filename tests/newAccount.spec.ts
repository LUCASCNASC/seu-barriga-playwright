import { test, expect } from "./globalCommands";

test.describe("New Account", () => {
    test("should access new account page after login", async ({ page, loginMainUser }) => {
        // Executa o login global com as credenciais MAIN utilizando a fixture customizada
        await loginMainUser();
        
        // A partir daqui, adicione os passos específicos para a página de contas
        // Exemplo: await page.locator('a[href="/addConta"]').click();
    });
});