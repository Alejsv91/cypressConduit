import { MainPage } from "./main.page";

class LoginPage extends MainPage{
    private emailInput = () => cy.get('input[placeholder="Email"]');
    private passwordInput = () => cy.get('input[placeholder="Password"]');
    private signInButton = () => cy.get('button[type="submit"]'); 
    private loginErrorMessage = () => cy.get('app-list-errors > ul > li')
    
    getLoginErrorMessage(){
        return this.loginErrorMessage();
    }

    getEmailInput() {
        return this.emailInput();
    }

    getPasswordInput() {
        return this.passwordInput();
    }

    getSignInButton() {
        return this.signInButton();
    }

    fillEmail(email: string) {
        this.emailInput().type(email);
    }

    fillPassword(password: string) {
        this.passwordInput().type(password);
    }

    clickSignIn() {
        this.signInButton().click();
    }
}

export const loginPage = new LoginPage();