import { User } from "../../types/user.interfaces";

export const realUser = (): Cypress.Chainable<User> => {
  return cy.env(["EMAIL", "USERNAME"]).then(
    (env): User => ({
      email: env.EMAIL,
      username: env.USERNAME,
      bio: null,
      image: 'https://conduit-api.bondaracademy.com/images/smiley-cyrus.jpeg',
    })
  );
};