import { Page, expect } from "@playwright/test";
import { movimentationSelectors } from "./MovimentationSelectors";

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

    // Clica no link para acessar a página de criar movimentação
    async clickCreateMovimentation() {
        await this.page.click(movimentationSelectors.createMovimentationLink);
    }

    // Seleciona a opção Receita no Tipo de Movimentação
    async selectTipoReceita() {
        await this.page.selectOption(movimentationSelectors.tipoSelect, 'REC');
    }

    // Preenche a data da movimentação
    async fillDataTransacao(date: string) {
        await this.page.fill(movimentationSelectors.dataTransacaoInput, date);
    }

    // Preenche a data de pagamento
    async fillDataPagamento(date: string) {
        await this.page.fill(movimentationSelectors.dataPagamentoInput, date);
    }

    // Preenche a descrição
    async fillDescricao(descricao: string) {
        await this.page.fill(movimentationSelectors.descricaoInput, descricao);
    }

    // Preenche o interessado
    async fillInteressado(interessado: string) {
        await this.page.fill(movimentationSelectors.interessadoInput, interessado);
    }

    // Preenche o valor da movimentação
    async fillValor(valor: string) {
        await this.page.fill(movimentationSelectors.valorInput, valor);
    }

    // Seleciona a conta baseada no label (texto visível)
    async selectConta(contaName: string) {
        await this.page.selectOption(movimentationSelectors.contaSelect, { label: contaName });
    }

    // Marca o status como Pago
    async selectStatusPago() {
        await this.page.check(movimentationSelectors.statusPagoRadio);
    }

    // Clica no botão salvar e salva uma movimentação
    async submit() {
        await this.page.click(movimentationSelectors.submitButton);
    }

    // Valida a mensagem de sucesso esperada
    async validateSuccessMessage(expectedText: string) {
        const successLocator = this.page.locator(movimentationSelectors.successAlert, { hasText: expectedText });
        await expect(successLocator).toBeVisible();
    }
}