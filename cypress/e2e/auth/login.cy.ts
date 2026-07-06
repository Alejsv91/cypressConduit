import { loginPage } from '../../support/pages/login.page';

/// <reference types="cypress" />

describe('login test suite', () => {
    beforeEach(() => {
        // Tu código de prueba aquí
        cy.visit('https://conduit.bondaracademy.com/');
    })

    it('should login successfully with valid credentials', () => {
        console.log('Starting login test with valid credentials');
        loginPage.header.clickOnSignInTab();
    })
})