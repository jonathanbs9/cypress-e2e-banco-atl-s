require("cypress-xpath");

export class FMC {
  get getConsultaButonModal() {
    cy.wait(3000);
    return cy.xpath("//p[contains(text(),'Consulta')]");
  }

  get getSiButton() {
    return cy.xpath("//span[contains(text(),'Sí')]");
  }
}
