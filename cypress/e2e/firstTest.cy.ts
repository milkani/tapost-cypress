import {navigateTo} from "../support/page_objects/navigationPage";

describe('template spec', () => {

    beforeEach('Open URL:', () => {
        cy.visit('https://tapost.fly.dev/')
    })

    it('passes', () => {
        navigateTo.formLayoutsPage()

        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .click()
            .parents('form')
            .find('[status="warning"]')
            .click()
    })
    it('Clean code with Aliases and Callback function', () => {
        navigateTo.formLayoutsPage()

        cy.contains('nb-card', 'Using the Grid')
            .find('[for="inputPassword2"')
            .should('contain', 'Password')

        cy.contains('nb-card', 'Using the Grid')
            .find('[for="inputEmail1"')
            .should('contain', 'Email')

        // const gridContainer = cy.contains('nb-card','Using the Grid')
        // gridContainer.find('[for="inputPassword2"').should('contain', 'Password')
        // gridContainer.find('[for="inputEmail1"').should('contain', 'Email')

        cy.contains('nb-card', 'Using the Grid').as('gridContainer')
        cy.get('@gridContainer')
            .find('[for="inputEmail1"')
            .should('contain', 'Email')

        cy.get('@gridContainer')
            .find('[for="inputPassword2"')
            .should('contain', 'Password')

        cy.contains('nb-card', 'Using the Grid').then(usingGrid => {
            cy.wrap(usingGrid).find('[for="inputPassword2"').should('contain', 'Password')
        })
    })

    it('Extracting text and attribute values ', () => {
        navigateTo.formLayoutsPage()

        cy.get('[for="exampleInputEmail1"]')
            .should('contain', 'Email address')

        cy.get('[for="exampleInputEmail1"]').then(value => {
            let extractedValue = value.text();
            expect(extractedValue).to.be.eq('Email address')

            // Wrap example
            cy.wrap(value).should('contain', 'Email address')
        })
        // Invoking
        cy.get('[for="exampleInputEmail1"]')
            .invoke('text')
            .should('contain', 'Email address')

        cy.get('[for="exampleInputEmail1"]').invoke('attr', 'class').then(attribute => {
            expect(attribute).to.eq('label')
            cy.wrap(attribute).should('contain', 'label')
        })

        cy.get('#exampleInputEmail1').type('nikita@milka.me')

        cy.get('#exampleInputEmail1')
            .invoke('prop', 'value')
            .should('contain', 'nikita@milka.me')
    });

    it('Radio buttons examples', () => {
        navigateTo.formLayoutsPage()

        cy.contains('nb-card', 'Using the Grid').within(() => {
            cy.get('[type="radio"]').then(radioButtons => {
                cy.wrap(radioButtons).eq(0).check({force: true}).should('be.checked')
                cy.wrap(radioButtons).eq(1).check({force: true}).should('be.checked')
                cy.wrap(radioButtons).eq(0).should('not.be.checked')
            })
        })
    })
    it('Checkboxes ', () => {
        navigateTo.modelOverlaysPage()

        cy.get('[type="checkbox"]').check({force: true})
        cy.get('[type="checkbox"]').uncheck({force: true})

        cy.get('[type="checkbox"]').eq(0).check({force: true}).should('be.checked')
        // Bad approach
        cy.get('[type="checkbox"]').eq(1).click({force: true})
        cy.get('[type="checkbox"]').eq(1).click({force: true})
    });

    it('Lists and Dropdowns', () => {
        // cy.get('nav nb-select').click()
        // // One specific
        // cy.get('.option-list').contains('Dark').click()
        // cy.get('nav nb-select').should('contain', 'Dark')

        //How to iterate through all color schemes
        cy.get('nav nb-select').then(dropDown => {
            cy.wrap(dropDown).click()
            cy.get('.option-list nb-option').each(element => {
                const itemText = element.text().trim()
                cy.wrap(element).click()
                cy.wrap(dropDown).should('contain', itemText)
                cy.get('nav nb-select').click()
            })
        })
    })

    it.only('UI Tables', () => {
        navigateTo.smartTablePage()

        const age = [20, 30, 40, 200]

        cy.wrap(age).each(age => {
            // @ts-ignore
            cy.get('input[placeholder="Age"]').clear().type(age)
            cy.wait(500)
            cy.get('tbody tr').each(row => {
                if (age == 200) {
                    cy.wrap(row).should("contain", 'No data found')
                } else {
                    cy.wrap(row).find('td').eq(6).should("contain", age)
                }
            })
        })
    });
})