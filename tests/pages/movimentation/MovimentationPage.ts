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

    // Clica no link para ir ao Resumo Mensal
    async clickResumoMensal() {
        await this.page.click(movimentationSelectors.resumoMensalLink);
    }

    // Valida se a movimentação está visível com os dados corretos no extrato
    async validateMovimentationVisible(descricao: string, dataPagamento: string, conta: string, valor: string, status: string) {
        const row = this.page.locator(movimentationSelectors.extratoTable).getByRole('row').filter({ hasText: descricao }).filter({ hasText: conta });
        await expect(row.locator('td').nth(0)).toHaveText(descricao);
        await expect(row.locator('td').nth(1)).toHaveText(dataPagamento);
        await expect(row.locator('td').nth(2)).toHaveText(conta);
        await expect(row.locator('td').nth(3)).toHaveText(valor);
        await expect(row.locator('td').nth(4)).toHaveText(status);
        await expect(row).toBeVisible();
    }

    // Remove a movimentação baseada na descrição e conta
    async deleteMovimentation(descricao: string, conta: string) {
        const row = this.page.locator(movimentationSelectors.extratoTable).getByRole('row').filter({ hasText: descricao }).filter({ hasText: conta });
        await row.locator(movimentationSelectors.removeButton).click();
    }

    // Valida se a movimentação não está mais visível no extrato
    async validateMovimentationNotVisible(descricao: string, conta: string) {
        const row = this.page.locator(movimentationSelectors.extratoTable).getByRole('row').filter({ hasText: descricao }).filter({ hasText: conta });
        await expect(row).toBeHidden();
    }
}