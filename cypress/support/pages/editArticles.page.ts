import { MainPage } from "./main.page";

class EditArticlePage extends MainPage {
  private get publishArticleButton() {
    return cy.get("form > fieldset > button.btn-primary");
  }
  private get tagsInpunt() {
    return cy.get('fieldset > input[placeholder="Enter tags"]');
  }

  private get titleInput() {
    return cy.get('fieldset > input[formcontrolname="title"]');
  }

  private get descriptionInput() {
    return cy.get('fieldset > input[formcontrolname="description"]');
  }

  private get bodyInput() {
    return cy.get('fieldset > textarea[formcontrolname="body"]');
  }

  private get tagList() {
    return cy.get("div.tag-list");
  }

  public getTagByText(tagText: string) {
    return this.tagList.find("span").contains(` ${tagText} `);
  }

  public getTagsLength(): Cypress.Chainable<number> {
    return this.tagList.find("span > i").its("length");
  }

  public getTagList() {
    return this.tagList;
  }

  public getPublishArticleButton() {
    return this.publishArticleButton;
  }

  public getTagsInput() {
    return this.tagsInpunt;
  }

  public getBodyInput() {
    return this.bodyInput;
  }

  public getDescriptionInput() {
    return this.descriptionInput;
  }

  public getTitleInput() {
    return this.titleInput;
  }
}
export const editArticles = new EditArticlePage();
