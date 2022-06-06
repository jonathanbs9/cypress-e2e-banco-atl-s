/// <reference types='Cypress' />
import { Login } from "../pages/Login";
import { Spa } from "../pages/Spa";

const login = new Login();
const spa = new Spa();

describe("Should enter Login Page", () => {
  /*beforeEach('Navigate to login page', () => {
    login.navigate();
    const username =  Cypress.env('USERNAME_DEV')
    const password =  Cypress.env('PASS_DEV')
    login.login(username, password)
})*/

  it("Should Login Successfully", () => {
    spa.getAgendaTitle.should("contain", "Agenda");
    spa.getCTATitle.should("contain", "CTAs");
  });

  it("Should Logout Successfully", () => {
    spa.clickAvatarAndLogout();
    login.getURL.should("eq", Cypress.env("LOGIN_URL_DEV") + "login");
    login.getTitlePageText.should("contains", "Ingresar | ");
  });

  it.only("Should Not Login with Wrong credentials - API", () => {
    cy.request({
      method: "POST",
      url: "http://atlasdev.eastus2.cloudapp.azure.com/api/v1/user/login",
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
});
