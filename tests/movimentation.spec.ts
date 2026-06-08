import { test, expect } from "./globalCommands";
import { MovimentationPage } from "./pages/movimentation/MovimentationPage";
import { fakerPT_BR as faker } from "@faker-js/faker";
import messagesAccount from "./pages/account/messagesAccount.json";

test.describe("New Movimentation", () => {
    let accountName: string;

    test.beforeEach(async ({ page, loginMainUser, createAccount }) => {
        await loginMainUser();
        accountName = faker.person.fullName();
        await createAccount(accountName);
        const movimentationPage = new MovimentationPage(page);
        await movimentationPage.goto();
    });
    test("create new movimentation and delete it", async ({ page }) => {
        const movimentationPage = new MovimentationPage(page);
        await movimentationPage.clickCreateMovimentation();

        // Obtém a data atual no formato DD/MM/YYYY
        const now = new Date();
        const todayDate = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
        
        const parteInteressada = faker.person.fullName();
        const randomValor = faker.number.int({ min: 1, max: 10000 }).toString();

        await movimentationPage.selectTipoReceita();
        await movimentationPage.fillDataTransacao(todayDate);
        await movimentationPage.fillDataPagamento(todayDate);
        await movimentationPage.fillDescricao("Pagamento pix");
        await movimentationPage.fillInteressado(parteInteressada);
        await movimentationPage.fillValor(randomValor);
        await movimentationPage.selectConta(accountName);
        await movimentationPage.selectStatusPago();
        await movimentationPage.submit();
        await movimentationPage.validateSuccessMessage("Movimentação adicionada com sucesso!");
        await movimentationPage.clickResumoMensal();

        // await movimentationPage.validateMovimentationVisible("Pagamento pix", todayDate, accountName, randomValor + ".00", "Pago");
        // await movimentationPage.deleteMovimentation("Pagamento pix", accountName);
        // await movimentationPage.validateSuccessMessage("Movimentação removida com sucesso!");
        // await movimentationPage.validateMovimentationNotVisible("Pagamento pix", accountName);
    });
});