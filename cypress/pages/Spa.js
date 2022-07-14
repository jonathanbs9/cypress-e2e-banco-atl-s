require("cypress-xpath");
const URL_LOGIN = Cypress.env("LOGIN_URL_DEV");
export class Spa {
  get getAgendaTitle() {
    return cy.xpath("//h3[contains(text(),'Agenda')]");
  }

  get getCTATitle() {
    return cy.xpath("//h3[contains(text(),'CTAs')]");
  }

  get getAvatarImg() {
    return cy.xpath("//img[@class='MuiAvatar-img']");
  }

  get getLogOutSpan() {
    return cy.xpath("//span[contains(text(),'Cerrar Sesión')]");
  }

  get getClientButton() {
    return cy.xpath("//a[@href='/clientes']");
  }

  navigate() {
    cy.visit(URL_LOGIN);
  }

  clickAvatarAndLogout() {
    this.getAvatarImg.click();
    this.getLogOutSpan.click();
  }

  clickSearch() {
    cy.xpath("//input[@class='prompt']").click();
  }

  typeSearch(client) {
    cy.xpath("//input[@class='prompt']").type(client);
  }
}
