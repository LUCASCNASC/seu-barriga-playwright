import { test, expect } from "./globalCommands";
import { MovimentationPage } from "./pages/movimentation/MovimentationPage";
import { fakerPT_BR as faker } from "@faker-js/faker";
import messagesAccount from "./pages/account/messagesAccount.json";
import messagesMovimentation from "./pages/movimentation/messagesMovimentation.json";

test.describe("New Movimentation", () => {
    test.beforeEach(async ({ page, loginMainUser }) => {
        await loginMainUser();
        const movimentationPage = new MovimentationPage(page);
        await movimentationPage.goto();
    });
    test("create new movimentation and delete it.", async ({ page }) => {
        const movimentationPage = new MovimentationPage(page);
        await movimentationPage.clickCreateMovimentation();

        const now = new Date();
        const currentDate = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
        const description = "Pagamento do serviço";
        const interested = faker.person.fullName();
        const value = faker.number.int({ min: 1, max: 999999 }).toString();

        await movimentationPage.selectTipoReceita();
        await movimentationPage.fillDataTransacao(currentDate);
        await movimentationPage.fillDataPagamento(currentDate);
        await movimentationPage.fillDescricao(description);
        await movimentationPage.fillInteressado(interested);
        await movimentationPage.fillValor(value);
        await movimentationPage.selectConta(messagesMovimentation.accountName.standard);
        await movimentationPage.selectStatusPago();
        await movimentationPage.submit();
        await movimentationPage.validateSuccessMessage(messagesMovimentation.messages.movimentationAddedSuccess);
    });
});
