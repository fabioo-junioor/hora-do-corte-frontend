const url = 'http://localhost:3333/api/';

describe('Auth API', () => {
    const userData = {
        'email': 'fabio.junior@acad.ufsm.br',
        'password': 'fabio321'
    }
    it('login user', () => {
        cy.request({
            url: url + 'auth/login',
            headers: { 'Content-Type': 'application/json'},
            method: 'POST',
            body: userData
        })
        .then((response) => {
            expect(response.status).to.eq(200);
            //expect(response.body.message).to.eq('Email e/ou senha incorretos!');
            expect(response.body).to.have.property('data');
            expect(response.body.data).to.be.an('array');
            expect(response.body.data).that.is.empty;

            cy.log(JSON.stringify(response.body))
        })
    })
});