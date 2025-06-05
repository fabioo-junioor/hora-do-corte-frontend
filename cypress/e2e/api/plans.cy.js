const url = 'http://localhost:3333/api/';

describe('Plans API', () => {
    it('get list of plans', () => {
        cy.request({
            url: url + 'plan/allPlans',
            method: 'GET'
        })
        .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('data');
            expect(response.body.data).to.be.an('array');
            expect(response.body.data).that.is.empty;
            
            cy.log(JSON.stringify(response.body));
        })
    })
});