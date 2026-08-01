import { realUser } from "../../../support/factories/userFactory";
import { Credentials } from "../../../types/credentials.interfaces";
import { validCredentials } from "../../../support/factories/credentialsFactory";
import { User } from "../../../types/user.interfaces";
import { editArticles } from "../../../support/pages/editArticles.page";
import { articlePage } from "../../../support/pages/article.page";
import { Article, ArticleResponse } from "../../../types/article.interfaces";
import { URLS } from "../../../support/constants/urls";
import { APIEndpoints } from "../../../support/constants/api-endpoints";

describe("Testing for articles section", () => {
  let credentials: Credentials;
  let user: User;
  let articleFixture: Article;

  before(() => {
    cy.fixture("articles").then((articles) => {
      articleFixture = { ...articles.articlesWithMultipleTags };
      articleFixture.title = `${articleFixture.title} ${Date.now()}`;
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
    cy.intercept("POST", APIEndpoints.POST_ARTICLES).as("postArticles");
    editArticles.header.getNewArticleButton().click();
    cy.location("pathname").should("contain", URLS.EDITOR);
    editArticles
      .getTitleInput()
      .checkEnabledVisibleAndType(articleFixture.title);
    editArticles
      .getDescriptionInput()
      .checkEnabledVisibleAndType(articleFixture.description);
    editArticles.getBodyInput().checkEnabledVisibleAndType(articleFixture.body);
    addTagsOnArticle(articleFixture.tagList);
    editArticles
      .getTagList()
      .should("be.visible")
      .then(() => {
        editArticles.getTagsLength().then((total) => {
          expect(total).to.equal(articleFixture.tagList.length);
        });
      });
    editArticles.getPublishArticleButton().should("be.visible").click();
    //API Validation
    cy.wait("@postArticles").then((req) => {
      const articleResponse: ArticleResponse = {
        ...req.response?.body.article,
      };
      cy.validateArticlesPostResponse(articleResponse, articleFixture, user);

      //UI Validation
      cy.location("pathname").should(
        "contain",
        `${URLS.ARTICLE}${articleResponse.slug}`
      );
      //Validate title, username, image, date
      articlePage.getTitleDiv().should("have.text", articleFixture.title);
      articlePage.getAuthorUserName().should("contain.text", user.username);
      articlePage.getAuthorImage().should("have.attr", "src", user.image);
      //I need to change the current date value to expected
      // articlePage.getArticleDate().should('have.text', articleResponse.createdAt);
      articlePage
        .getEditArticleButton()
        .should("be.visible")
        .should("have.attr", "href", `${URLS.EDITOR}/${articleResponse.slug}`);
      articlePage.getDeleteArticleButton().should("be.visible");
      articlePage
        .getArticleDescription()
        .should("be.visible")
        .should("have.text", articleFixture.body);
      // articlePage.getTagList().find('li').each(($el)=>{
      //   expect($el).includes()
      // })
    });
  });

  //read the article
  //Delete article
  //delete all the trash
  //update the artcile
});

function addTagsOnArticle(tagList: string[]) {
  tagList.forEach((tag) => {
    editArticles.getTagsInput().checkEnabledVisibleAndType(tag).type("{enter}");
    editArticles.getTagByText(tag).should("be.visible");
    editArticles.getTagsInput().should("be.empty");
  });
}

function checkTags(articleResponse: ArticleResponse, articleFixture: Article) {
  articleFixture.tagList.forEach((tag: string) => {
    expect(articleResponse.tagList).to.include(tag);
  });
  expect(articleFixture.tagList.length).to.equal(
    articleResponse.tagList.length
  );
}
