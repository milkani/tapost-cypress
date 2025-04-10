import {navigateTo} from "../support/page_objects/navigationPage";
import {onFormLayoutsPage} from "../support/page_objects/formLayoutsPage";

describe('Tapost: test', {retries: 2}, () => {

    beforeEach('Open Tapost Angular app home page', () => {
        cy.visit("https://tapost.fly.dev/")
    })

    it('Submit inline form with name and email', () => {
        navigateTo.formLayoutsPage()
        // cy.fixture('userData.json').as('userData')
        // cy.get('@userData').then(data => {
        //     onFormLayoutsPage
        //         .submitInlineFormWithNameAndEmail(data.fullName, data.email)
        // })

        // onFormLayoutsPage.submitInlineFormWithNameAndEmail('Nikita Milka', 'nikita@milka.me')
        onFormLayoutsPage.submitInlineFormWithNameAndEmail(Cypress.env('fullName'), Cypress.env('email'))
    });
})