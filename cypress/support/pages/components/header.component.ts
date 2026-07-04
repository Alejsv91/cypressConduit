class Header {
    protected get signInTab(){ return cy.contains('a', 'Sign in') }
}

export const headerComponent = new Header()