import { User } from "../../../types/user.interfaces";

class HeaderComponent {
  private get newArticleButton() {
    return cy.get('div.container i.ion-compose');
  }
  private get signInTab() {
    return cy.contains("a", "Sign in");
  }

  private usernameImg = (user: User) => {
    return cy.get("img.user-pic").parent().should("contain", user.username);
  };

  public getNewArticleButton(){
    return this.newArticleButton;
  }

  public getUsernameImg(user: User) {
    return this.usernameImg(user);
  }

  public getSignInTab() {
    return this.signInTab;
  }

  public clickOnSignInTab() {
    this.signInTab.click();
  }
}

export const headerComponent = new HeaderComponent();
