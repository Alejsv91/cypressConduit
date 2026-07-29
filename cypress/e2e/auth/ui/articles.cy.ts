import { realUser } from "../../../support/factories/userFactory";
import { Credentials } from "../../../types/credentials.interfaces";
import { validCredentials } from "../../../support/factories/credentialsFactory";
import { User } from "../../../types/user.interfaces";
import { articles } from "../../../support/pages/articles.page";

describe("Testing for articles section", () => {
  let credentials: Credentials;
  let resp: Cypress.Response<User>;
  let user: User;

  before(() => {
    validCredentials().then((creds) => {
      credentials = creds;
      realUser().then((userInfo) => {
        user = userInfo;
        cy.createSession(credentials, userInfo);
      })
    }); 
  });

  beforeEach(()=>{
    cy.visit("/");
  })

  it("First article test", () => {
    articles.header.getUsernameImg(user).should('contain', user.username);
  });
});
