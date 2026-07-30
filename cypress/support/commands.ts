/// <reference types="cypress" />

import { Credentials } from "../types/credentials.interfaces";
import { APIEndpoints } from "../support/constants/api-endpoints";
import { User } from "../types/user.interfaces";
import { articles } from "./pages/articles.page";

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      loginByApi(
        credentials: Credentials
      ): Cypress.Chainable<Cypress.Response<any>>;
      createSession(credentials: Credentials, user: User): any;
      checkEnabledVisibleAndType(text: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add(
  "checkEnabledVisibleAndType",
  { prevSubject: true },
  (subject: JQuery<HTMLElement>, text: string) => {
    cy.wrap(subject)
      .should("be.visible")
      .should("be.enabled")
      .clear()
      .type(text);
  }
);

Cypress.Commands.add("loginByApi", (credentials: Credentials) => {
  let apiUrl;
  cy.env(["apiUrl"]).then((env) => {
    apiUrl = env.apiUrl;
    cy.request({
      method: "POST",
      url: `${apiUrl}${APIEndpoints.LOGIN}`,
      failOnStatusCode: false,
      body: {
        user: {
          email: credentials.email,
          password: credentials.password,
        },
      },
    }).then((response) => {
      return response;
    });
  });
});

Cypress.Commands.add(
  "createSession",
  (credentials: Credentials, user: User) => {
    cy.session(
      credentials.email,
      () => {
        cy.loginByApi(credentials).then((response) => {
          window.localStorage.setItem("jwtToken", response.body.user.token);
        });
      },
      {
        validate() {
          cy.visit("/");
          articles.header.getUsernameImg(user).should("contain", user.username);
        },
      }
    );
  }
);
