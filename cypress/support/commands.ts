/// <reference types="cypress" />

import { Credentials } from "../types/credentials.interfaces";
import { APIEndpoints } from "../support/constants/api-endpoints";
import { User } from "../types/user.interfaces";
import { editArticles } from "./pages/editArticles.page";
import { Article, ArticleResponse } from "../types/article.interfaces";

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
      createSession(credentials: Credentials, user: User): Chainable<void>;
      checkEnabledVisibleAndType(text: string): Chainable<JQuery<HTMLElement>>;
      validateArticlesPostResponse(
        articleRequestResponse: ArticleResponse,
        expectedArticle: Article,
        user: User
      ): Chainable<void>;
    }
  }
}

function checkTags(articleResponse: ArticleResponse, articleFixture: Article) {
  articleFixture.tagList.forEach((tag: string) => {
    expect(articleResponse.tagList).to.include(tag);
  });
  expect(articleFixture.tagList.length).to.equal(
    articleResponse.tagList.length
  );
}

Cypress.Commands.add(
  "validateArticlesPostResponse",
  (articleResponse: ArticleResponse, expectedArticle: Article, user: User) => {
    expect(articleResponse.slug).not.NaN;
    expect(articleResponse.title).equal(expectedArticle.title);
    expect(articleResponse.description).equal(expectedArticle.description);
    expect(articleResponse.body).equal(expectedArticle.body);
    checkTags(articleResponse, expectedArticle);
    expect(articleResponse.createdAt).not.NaN;
    expect(articleResponse.updatedAt).not.NaN;
    expect(articleResponse.favorited).equal(false);
    expect(articleResponse.favoritesCount).equal(0);
    expect(articleResponse.author.bio).equal(user.bio);
    expect(articleResponse.author.following).equal(false);
    expect(articleResponse.author.image).equal(user.image);
    expect(articleResponse.author.username).equal(user.username);
  }
);

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
          debugger;
          window.localStorage.setItem("jwtToken", response.body.user.token!);
        });
      },
      {
        validate() {
          cy.visit("/").then(() => {
            editArticles.header
              .getUsernameImg(user)
              .should("contain", user.username);
          });
        },
      }
    );
  }
);
