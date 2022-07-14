/// <reference types='Cypress' />
import { Client } from "../pages/Clients";
import { FMC } from "../pages/FMC";
import { Login } from "../pages/Login";
import { Spa } from "../pages/Spa";

const login = new Login();
const spa = new Spa();
const client = new Client();
const fmc = new FMC();

describe("Should enter Login Page", () => {
  beforeEach("Navigate to login page", () => {
    login.navigate();

    const username = Cypress.env("USERNAME");
    const password = Cypress.env("PASS");
    //login.login(username, password);
    cy.Login(username, password);
  });

  it("Should Login Successfully", () => {
    spa.getAgendaTitle.should("contain", "Agenda");
    spa.getCTATitle.should("contain", "CTAs");
    //spa.getAvatarImg.click();
    spa.clickAvatarAndLogout();
  });

  it("Should Logout Successfully", () => {
    spa.clickAvatarAndLogout();
    login.getURL.should("eq", Cypress.env("LOGIN_URL_DEV") + "login");
    login.getTitlePageText.should("contains", "Ingresar | ");
  });

  it("Should Not Login with Wrong credentials - API", () => {
    cy.request({
      method: "POST",
      url: Cypress.env("LOGIN_API"),
      failOnStatusCode: false,
      body: {
        username: "admin9999",
        password: "wrongpassword",
        rememberMe: false,
      },
    }).then((response) => {
      let datos;
      datos = JSON.parse(JSON.stringify(response.body));
      //console.log(datos);

      expect(datos.StatusCode).to.be.equal(400);
      expect(datos.Detail).to.be.equal("Invalid login attempt.");
      expect(datos.Message).to.be.equal(
        "*User Service*. Invalid Request Exception"
      );
    });
  });

  it("Should have 44 filters", () => {
    spa.getClientButton.click();
    cy.wait(6000);
    client.getFilters.should("have.length", 88);
  });

  it("Should Have 5 KPY", () => {
    spa.getClientButton.click();
    cy.wait(6000);
    client.getKpis.should("have.length", 5);
  });

  it.only("Search Rodolfo Teodoro Fiegelist Nielsen", () => {
    spa.clickSearch();
    spa.typeSearch("Rodolfo Teodoro");

    cy.xpath(
      "//div[@firstname='RODOLFO TEODORO'][@lastname='FIEGELIST NIELSEN']"
    ).click();

    fmc.getConsultaButonModal.click();
    fmc.getSiButton.click;
  });
});
