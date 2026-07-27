/// <reference types="cypress" />

import { Credentials } from "../types/credentials.interfaces";
import { APIEndpoints } from "../support/constants/api-endpoints";

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
      loginByApi(credentials: Credentials): Cypress.Chainable<Cypress.Response<any>>
    }
  }
}

Cypress.Commands.add('loginByApi', (credentials: Credentials)  => { 
    let apiUrl
    cy.env(["apiUrl", "EMAIL", "PASSWORD"]).then((env) => {
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
          }).then((response) =>{
            return response;
          })
      });
 })