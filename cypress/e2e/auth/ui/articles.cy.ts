import { realUser } from "../../../support/factories/userFactory";
import { Credentials } from "../../../types/credentials.interfaces";
import { validCredentials } from "../../../support/factories/credentialsFactory";
import { User } from "../../../types/user.interfaces";
import { articles } from "../../../support/pages/articles.page";
import { Article } from "../../../types/article.interfaces";

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
    cy.location("pathname").should("contain", "editor");
    articles
      .getTitleInput()
      .checkEnabledVisibleAndType(`${articleFixture.title} ${Date.now()}`);
    articles
      .getDescriptionInput()
      .checkEnabledVisibleAndType(articleFixture.description);
    articles.getBodyInput().checkEnabledVisibleAndType(articleFixture.body);
    addTagsOnArticle(articleFixture.tags);
    articles
      .getTagList()
      .should("be.visible")
      .then(() => {
        articles.getTagsLength().then((total) => {
          expect(total).to.equal(articleFixture.tags.length);
        });
      });
    // articles.getPublishArticleButton().should("be.visible").click();

  });

  //read the article
  //Delete article
  //delete all the trash
  //update the artcile
});

function addTagsOnArticle(tags: string[]) {
  tags.forEach((tag) => {
    articles.getTagsInput().checkEnabledVisibleAndType(tag).type("{enter}");
    articles.getTagByText(tag).should('be.visible');
    articles.getTagsInput().should('be.empty');

  });
}
