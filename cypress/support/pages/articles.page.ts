import { MainPage } from "./main.page";

class Articles extends MainPage {
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

  public getPublishArticleButton(){
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
export const articles = new Articles();
