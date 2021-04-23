/* global cy */
describe('Note App', ()=>{
    beforeEach(()=>{
        cy.visit('http://localhost:3000');
        cy.request('POST', 'http://localhost:3001/api/testing/reset')

        const user = {
            "username": "esmith",
            "name": "Edwin Joel",
            "password": "123456"
            
          }
          cy.request('POST','http://localhost:3001/api/users', user )

    })
    it('Frontpage can be opened', ()=>{
        cy.contains('Note List')
    })
    it('Login Form can be opened', ()=>{
        cy.contains('Show Login').click()
    })
    it('User Can login', ()=>{
        cy.contains('Show Login').click()
        cy.get('input[placeholder="Username"]').first().type('esmith')
        cy.get('input:last').type('123456')
        cy.get('[data-testid="login-form"] button').click();
        cy.contains('Create Note')
    })
    it('login fails with wrong password', ()=>{
        cy.contains('Show Login').click()
        cy.get('input[placeholder="Username"]').first().type('esmith')
        cy.get('input:last').type('1234567')
        cy.get('[data-testid="login-form"] button').click();
        cy.get('div.login-error')
        .should('contain','Wrong Credentials')
        .should('have.css', 'color', 'rgb(218, 15, 15)')
        .should('have.css', 'border-style', 'solid')
    })
    describe('When logged in', ()=>{
        beforeEach(()=>{
            // cy.contains('Show Login').click()
            // cy.get('input[placeholder="Username"]').first().type('esmith')
            // cy.get('input:last').type('123456')
            // cy.get('[data-testid="login-form"] button').click();
           cy.login({
            username: 'esmith',
            password: '123456' 
           })
        })
        it('A new note can be created', ()=>{
            const noteContent = 'A note created by cypress';
            cy.contains('Create Note')
            cy.get('input[placeholder="Write your Note"]').type(noteContent)
            cy.contains('Create New Note').click();
            cy.contains(noteContent)
        })

        describe('and a note exists', ()=>{
            beforeEach(()=>{
               cy.createNote({ content: 'This is a first Note', important: false})
               cy.createNote({ content: 'This is a second Note', important: false})
               cy.createNote({ content: 'This is a third Note', important: false})
            })
            it('can be made important', ()=>{
                cy.contains('This is a second Note').as('theNote')
                
                cy.get('@theNote')
                .contains('Make Important')
                .click()
                
                cy.debug()

                cy.get('@theNote')
                .contains('Make Not Important')
            })
        })

    })

})