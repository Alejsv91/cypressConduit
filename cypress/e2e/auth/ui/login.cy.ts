import { loginPage } from "../../../support/pages/login.page";
import { Credentials } from "../../../types/credentials.interfaces";
import { URLS } from "../../../support/constants/urls";
import { APIEndpoints } from "../../../support/constants/api-endpoints";
import { User } from "../../../types/user.interfaces";
import { realUser } from "../../../support/factories/userFactory";

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
    cy.url().should("contain", URLS.LOGIN);
    loginPage.getEmailInput().should("be.visible");
    loginPage.getPasswordInput().should("be.visible");
    loginPage.getSignInButton().should("be.visible");
  });

  it("should login successfully with valid credentials", () => {
    cy.intercept("POST", APIEndpoints.LOGIN).as("loginRequest");
    cy.intercept("GET", APIEndpoints.ARTICLES).as("articlesRequest");
    cy.intercept("GET", APIEndpoints.TAGS).as("tagsRequest");

    userExecuteLogin(credentials);
    cy.url().should("not.include", URLS.LOGIN);
    cy.wait("@loginRequest").then((interception) => {
      let userResponse: User = interception.response?.body.user;
      realUser().then((expectedInfo) => {
        expect(interception.response?.statusCode).to.eq(200);
        expect(userResponse.email).to.eq(credentials.email);
        expect(userResponse.username).to.eq(expectedInfo.username);
        expect(userResponse.bio).to.eq(expectedInfo.bio);
        expect(userResponse.image).to.eq(expectedInfo.image);
        expect(userResponse.token).not.NaN;
      });
    });
    cy.wait("@articlesRequest").its("response.statusCode").should("eq", 200);
    cy.wait("@tagsRequest").its("response.statusCode").should("eq", 200);
  });

  it("When user don't filled the email input", () => {
    loginPage.fillPassword(credentials.password);
    loginPage.getSignInButton().should("be.disabled");
  });

  it("When user don't filled the password input", () => {
    loginPage.fillEmail(credentials.email);
    loginPage.getSignInButton().should("be.disabled");
  });

  it("Unsuccessfull login with invalid credentials", () => {
    credentials.password = "fakePassword123";
    userExecuteLogin(credentials);
    //Validate if error is visible
    loginPage
      .getLoginErrorMessage()
      .should("be.visible")
      .should("have.text", "email or password is invalid");
  });

  function userExecuteLogin(credentials: Credentials) {
    loginPage.fillEmail(credentials.email);
    loginPage.fillPassword(credentials.password);
    loginPage.clickSignIn();
  }
});
