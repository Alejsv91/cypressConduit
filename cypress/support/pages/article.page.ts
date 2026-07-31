class ArticlePage {
  private get tagList() {
    return cy.get("ul.tag-list");
  }

  private get articleDescription() {
    return cy.get("div.article-content p");
  }

  private get deleteArticleButton() {
    return cy.get(
      "div.container > app-article-meta > div.article-meta > span > button"
    );
  }

  private get editArticleButton() {
    return cy.get(
      "div.container > app-article-meta > div.article-meta > span > a"
    );
  }

  private get articleDate() {
    return cy.get(
      "div.container > app-article-meta > div.article-meta > div > span"
    );
  }

  private get authorImage() {
    return cy.get(
      "div.container > app-article-meta > div.article-meta > a > img"
    );
  }

  private get authorUsername() {
    return cy.get("div.container > app-article-meta > div.article-meta > div > a");
  }

  private get titleDiv() {
    return cy.get("div.banner > div.container > h1");
  }

  //
  public getTagList(){
    return this.tagList;
  }

  public getArticleDescription() {
    return this.articleDescription;
  }

  public getDeleteArticleButton() {
    return this.deleteArticleButton;
  }

  public getEditArticleButton() {
    return this.editArticleButton;
  }

  public getArticleDate() {
    return this.articleDate;
  }

  public getAuthorImage() {
    return this.authorImage;
  }

  public getAuthorUserName() {
    return this.authorUsername;
  }

  public getTitleDiv() {
    return this.titleDiv;
  }
}

export const articlePage = new ArticlePage();
