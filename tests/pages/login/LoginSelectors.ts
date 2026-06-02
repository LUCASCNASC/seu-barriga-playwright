// Mapeamento dos seletores principais da tela de login
export const loginSelectors = {
	emailInput: "input#email",
	passwordInput: 'input#senha',
	submitButton: 'button[type="submit"]',
	successAlert: 'div.alert.alert-success',
	errorAlert: 'div.alert.alert-danger',
	navbarBrand: 'a.navbar-brand',
	navbarLoginLink: 'li.active a[href="/login"]',
	navbarRegisterLink: 'li a[href="/cadastro"]',
	emailLabel: 'label[for="exampleInputEmail1"]',
	passwordLabel: 'label[for="exampleInputPassword1"]',
	navbarLogoutLink: 'li a[href="/logout"]',
	accountsDropdown: 'a.dropdown-toggle:has-text("Contas")',
	addAccountLink: 'a[href="/addConta"]',
	accountNameInput: 'input#nome',
};