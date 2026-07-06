import { constants } from "node:buffer";
import { loginPage } from "../../support/pages/login.page";
import { debug, log } from "node:console";

/// <reference types="cypress" />

describe("login test suite", () => {
  const credentials = { email: "", password: "" };
  beforeEach(() => {
    cy.env(["EMAIL", "PASSWORD"]).then((env) => {
        credentials.email = env.EMAIL;
        credentials.password = env.PASSWORD;
    });
    cy.visit("/");
    loginPage.header.getSignInTab().should("be.visible");
    loginPage.header.clickOnSignInTab();
    loginPage.getEmailInput().should("be.visible");
    loginPage.getPasswordInput().should("be.visible");
    loginPage.getSignInButton().should("be.visible");

  });

  it("should login successfully with valid credentials", () => {
    console.log(`Credentials: ${credentials.email}, ${credentials.password}`);
    loginPage.fillEmail(credentials.email);
    loginPage.fillPassword(credentials.password);
    loginPage.clickSignIn();
  });
});
