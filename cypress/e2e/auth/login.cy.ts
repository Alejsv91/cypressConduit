import { loginPage } from '../../support/pages/login.page';

/// <reference types="cypress" />

describe('login test suite', () => {
    beforeEach(() => {
        // Tu código de prueba aquí
        cy.visit('https://conduit.bondaracademy.com/');
        loginPage.header.clickOnSignInTab();
    })

    it('should login successfully with valid credentials', () => {
        loginPage.fillEmail('Test');
        loginPage.fillPassword('TestPassword');
        loginPage.clickSignIn();
    })
})