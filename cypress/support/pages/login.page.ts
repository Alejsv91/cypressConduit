import { MainPage } from "./main.page";

class LoginPage extends MainPage{
    private emailInput = () => cy.get('input[placeholder="Email"]');
    private passwordInput = () => cy.get('input[placeholder="Password"]');
    private signInButton = () => cy.get('button[type="submit"]');   

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