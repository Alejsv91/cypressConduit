class HeaderComponent {
  private get signInTab() {
    return cy.contains("a", "Sign in");
  }

  public getSignInTab(){
    return this.signInTab;
  }

  public clickOnSignInTab() {
    this.signInTab.click();
  }
}

export const headerComponent = new HeaderComponent();