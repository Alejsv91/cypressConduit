import { loginPage } from "../../support/pages/login.page";
import { Credentials } from "../../types/credentials.interfaces";

/// <reference types="cypress" />

describe("login test suite", () => {
  const credentials: Credentials = { email: "", password: "" };
  beforeEach(() => {
    cy.env(["EMAIL", "PASSWORD"]).then((env) => {
      credentials.email = env.EMAIL;
      credentials.password = env.PASSWORD;
    });
    cy.visit("/");
    loginPage.header.getSignInTab().should("be.visible");
    loginPage.header.clickOnSignInTab();
    cy.url().should("contain", "/login");
    loginPage.getEmailInput().should("be.visible");
    loginPage.getPasswordInput().should("be.visible");
    loginPage.getSignInButton().should("be.visible");
  })

  it("should login successfully with valid credentials", () => {
    userExecuteLogin(credentials);
    cy.url().should("not.include", "/login");
  })

  it("When user don't filled the email input", () => {
    loginPage.fillPassword(credentials.password);
    loginPage.getSignInButton().should("be.disabled");
  })

  it("When user don't filled the password input", () => {
    loginPage.fillEmail(credentials.email);
    loginPage.getSignInButton().should("be.disabled");
  })

  it("Unsuccessfull login with invalid credentials", () => {
    credentials.password = "fakePassword123";
    userExecuteLogin(credentials);
    //Validate if error is visible
    loginPage
      .getLoginErrorMessage()
      .should("be.visible")
      .should("have.text", "email or password is invalid");
  })

  function userExecuteLogin(credentials: Credentials) {
    loginPage.fillEmail(credentials.email);
    loginPage.fillPassword(credentials.password);
    loginPage.clickSignIn();
  }
});
