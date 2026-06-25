export const accountSelectors = {
	accountsDropdown: 'a.dropdown-toggle:has-text("Contas")',
	addAccountLink: 'a[href="/addConta"]',
	accountNameInput: 'input#nome',
	saveButton: 'button:has-text("Salvar")',
	listAccountsLink: 'a[href="/contas"]',
	accountsTable: 'table#tabelaContas',
	deleteAccountButton: 'a[href^="/removerConta"]',
	editAccountButton: 'a[href^="/editarConta"]',
	successAlert: 'div.alert.alert-success',
	errorAlert: 'div.alert.alert-danger',
};