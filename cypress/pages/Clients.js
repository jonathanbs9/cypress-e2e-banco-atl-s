require("cypress-xpath");

export class Client {
  get getFilters() {
    return cy.get(".filtersGroup__header___2OEbJ").find("span");
  }

  get getKpis() {
    return cy.xpath("//div[@class='facetsLayer__card___jGrf1']");
  }
}
