import { realUser } from "../../../support/factories/userFactory";
import { Credentials } from "../../../types/credentials.interfaces";
import { validCredentials } from "../../../support/factories/credentialsFactory";
import { User } from "../../../types/user.interfaces";
import { articles } from "../../../support/pages/articles.page";
import { Article } from "../../../types/article.interfaces";
import { debug } from "node:console";


describe("Testing for articles section", () => {
  let credentials: Credentials;
  let user: User;
  let articleFixture: Article;

  before(() => {
    cy.fixture("articles").then((articles) => {
      articleFixture = { ...articles.articlesWithMultipleTags };
    });
  });

  beforeEach(() => {
    validCredentials().then((creds) => {
      credentials = creds;
      realUser().then((userInfo) => {
        user = userInfo;
        cy.createSession(credentials, userInfo);
        cy.visit("/");
      });
    });
  });

  //Create article
  it("Create the article by API", () => {
    articles.header.getNewArticleButton().click();
    articles
      .getTitleInput()
      .CheckEnabledVisibleAndType(`${articleFixture.title} ${Date.now()}`);
    articles.getDescriptionInput().CheckEnabledVisibleAndType(articleFixture.description);
    articles.getBodyInput().CheckEnabledVisibleAndType(articleFixture.body);
    articles
      .getTagsInput()
      .should("be.visible")
      .should("be.enabled")
      .type("automation")
      .type("{enter}");
    articles.getPublishArticleButton().should("be.visible").click();
    //validate the article is created
  });

  //read the article
  //Delete article
  //delete all the trash
  //update the artcile
});
