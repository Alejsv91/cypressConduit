import { validCredentials } from "../../../support/factories/credentialsFactory";
import { Article, ArticleResponse } from "../../../types/article.interfaces";
import { APIEndpoints } from "../../../support/constants/api-endpoints";
import { realUser } from "../../../support/factories/userFactory";
import { User } from "../../../types/user.interfaces";
import { headerComponent } from "../../../support/pages/components/header.component";
import { title } from "node:process";

describe("API testing for articles", () => {
  let apiToken: string;
  let articleFixture: Article;
  let user: User;
  let apiUrl: string;

  before(() => {
    cy.env(["apiUrl"]).then((env) => {
        apiUrl = env.apiUrl;
    });
    realUser().then((userInfo) => {
      user = userInfo;
    });
    cy.fixture("articles").then((articles) => {
      articleFixture = { ...articles.articlesWithMultipleTags };
      articleFixture.title = `${articleFixture.title} ${Date.now()}`;
    });
    validCredentials().then((cred) => {
      cy.loginByApi(cred).then((response) => {
        apiToken = response.body.user.token;
        debugger;
      });
    });
  });
  it("create a article by API post", () => {
    cy.request({
      method: "POST",
      url: `${apiUrl}${APIEndpoints.POST_ARTICLES}`,
      body: {
        article: {
          body: articleFixture.body,
          description: articleFixture.description,
          title: articleFixture.title,
          tagList: articleFixture.tagList,
        },
      },
      headers: {
        Authorization: `Token ${apiToken}`,
      },
    }).then((reqResponse) => {
      console.log(reqResponse); // Log the full response for debugging
      cy.log(JSON.stringify(reqResponse.body)); // Log the response body
    });
  });
});
