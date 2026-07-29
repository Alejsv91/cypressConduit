import { Credentials } from "../../types/credentials.interfaces";

export const validCredentials = (): Cypress.Chainable<Credentials> => {
    return cy.env(["EMAIL", "PASSWORD"]).then(
      (env): Credentials => ({
        email: env.EMAIL,
        password: env.PASSWORD
      })
    )
  };

export const fakeCredentials: Credentials = {
    email :  'fakeEmailTets@gmail.com',
    password : 'Abcd123456'
}