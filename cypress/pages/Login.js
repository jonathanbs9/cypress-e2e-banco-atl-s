require("cypress-xpath");

export class Login {
  //navigate() {
  //  cy.visit(Cypress.env("LOGIN_URL_QA"));
  //}

  login(userName, password) {
    this.getUsernameInput.type(userName);
    this.getPasswordInput.type(password);

    this.getAccederButton.click();
  }

  get getUsernameInput() {
    return cy.xpath(
      "//input[@type='text'][@class='MuiInputBase-input MuiInput-input']"
    );
  }

  get getPasswordInput() {
    return cy.xpath(
      "//input[@type='password'][@class='MuiInputBase-input MuiInput-input']"
    );
  }

  get getAccederButton() {
    return cy.get(".MuiButtonBase-root");
  }

  get getTitlePageText() {
    return cy.title();
  }

  get getURL() {
    return cy.url();
  }
}
