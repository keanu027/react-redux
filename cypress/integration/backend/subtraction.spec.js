describe('Subtraction API', function () {
  //The site to automate
  const urladdition = '/api/subtraction';
  const urllogin = '/api/login';

  Cypress.Commands.add('loginCb', (username, password) => {
    cy.request({
      method: 'POST',
      url: urllogin,
      failOnStatusCode: false,
      body: {
        username,
        password,
      },
    });
  });
  Cypress.Commands.add('registerCb', (token, firstnum, secondnum) => {
    cy.request({
      method: 'POST',
      url: urladdition,
      failOnStatusCode: false,
      headers: {
        authorization: `token ${token}`,
      },
      body: {
        firstnum,
        secondnum,
      },
    });
  });

  Cypress.Commands.add('getlistCb', (token) => {
    cy.request({
      method: 'GET',
      url: urladdition,
      failOnStatusCode: false,
      headers: {
        authorization: `token ${token}`,
      },
    });
  });

  Cypress.Commands.add('patchCb', (token, firstnum, secondnum, id) => {
    cy.request({
      method: 'PATCH',
      url: urladdition,
      failOnStatusCode: false,
      headers: {
        authorization: `token ${token}`,
      },
      body: {
        firstnum,
        secondnum,
        id,
      },
    });
  });

  Cypress.Commands.add('deleteCb', (token, id) => {
    cy.request({
      method: 'DELETE',
      url: `/api/subtraction/${id}`,
      failOnStatusCode: false,
      headers: {
        authorization: `token ${token}`,
      },
    });
  });

  it('Test#1 - Register in Subtraction Success', function () {
    const firstnum = 10;
    const secondnum = 10;
    const statusCode = 200;

    cy.loginCb('user', '12345678').then((response) => {
      cy.log(response);
      cy.registerCb(response.body.token, firstnum, secondnum).then(
        (response) => {
          cy.log(response);
          expect(response.status).to.eq(statusCode);
        }
      );
    });
  });

  it('Test#2 - Register in Subtraction Failed', function () {
    const firstnum = '';
    const secondnum = 10;
    const statusCode = 400;

    cy.loginCb('user', '12345678').then((response) => {
      cy.log(response);
      cy.registerCb('', firstnum, secondnum).then((response) => {
        cy.log(response);
        expect(response.status).to.eq(statusCode);
      });
    });

    cy.loginCb('user', '12345678').then((response) => {
      cy.log(response);
      cy.registerCb(response.body.token, firstnum, secondnum).then(
        (response) => {
          cy.log(response);
          expect(response.status).to.eq(statusCode);
        }
      );
    });
  });

  it('Test#3 - Get List in Subtraction Success', function () {
    const statusCode = 200;

    cy.loginCb('user', '12345678').then((response) => {
      cy.log(response);
      cy.getlistCb(response.body.token).then((resp) => {
        cy.log(resp);
        expect(resp.status).to.eq(statusCode);
      });
    });
  });

  it('Test#4 - Get List in Subtraction Failed', function () {
    const statusCode = 401;

    cy.loginCb('user', '12345678').then((response) => {
      cy.log(response);
      cy.getlistCb('').then((resp) => {
        cy.log(resp);
        expect(resp.status).to.eq(statusCode);
      });
    });
  });

  it('Test#5 - Update in Subtraction Success', function () {
    const firstnum = 20;
    const secondnum = 1;
    const statusCode = 200;

    cy.loginCb('user', '12345678').then((response) => {
      cy.log(response);
      cy.getlistCb(response.body.token).then((resp) => {
        cy.log(resp.body[0]);
        cy.patchCb(
          response.body.token,
          firstnum,
          secondnum,
          resp.body[0].id
        ).then((responses) => {
          cy.log(responses);
          expect(responses.status).to.eq(statusCode);
        });
      });
    });
  });

  it('Test#6 - Update in Subtraction Failed', function () {
    const firstnum = '';
    const secondnum = 1;
    const statusCode = 400;

    cy.loginCb('user', '12345678').then((response) => {
      cy.log(response);
      cy.getlistCb(response.body.token).then((resp) => {
        cy.log(resp.body[0]);
        cy.patchCb('', firstnum, secondnum, resp.body[0].id).then(
          (responses) => {
            cy.log(responses);
            expect(responses.status).to.eq(statusCode);
          }
        );
      });
    });

    cy.loginCb('user', '12345678').then((response) => {
      cy.log(response);
      cy.getlistCb(response.body.token).then((resp) => {
        cy.log(resp.body[0]);
        cy.patchCb(
          response.body.token,
          firstnum,
          secondnum,
          resp.body[0].id
        ).then((responses) => {
          cy.log(responses);
          expect(responses.status).to.eq(statusCode);
        });
      });
    });
  });

  it('Test#7 - Delete in Subtraction Success', function () {
    const statusCode = 200;

    cy.loginCb('user', '12345678').then((response) => {
      cy.log(response);
      cy.getlistCb(response.body.token).then((resp) => {
        cy.log(resp.body[0]);
        cy.deleteCb(response.body.token, resp.body[0].id).then((responses) => {
          cy.log(responses);
          expect(responses.status).to.eq(statusCode);
        });
      });
    });
  });

  it('Test#8 - Delete in Subtraction Failed', function () {
    const statusCode = 401;

    cy.loginCb('user', '12345678').then((response) => {
      cy.log(response);
      cy.getlistCb(response.body.token).then((resp) => {
        cy.log(resp.body[0]);
        cy.deleteCb('', resp.body[0].id).then((responses) => {
          cy.log(responses);
          expect(responses.status).to.eq(statusCode);
        });
      });
    });

    cy.loginCb('user', '12345678').then((response) => {
      cy.log(response);
      cy.getlistCb(response.body.token).then((resp) => {
        cy.log(resp.body[0]);
        cy.deleteCb(response.body.token, '').then((responses) => {
          cy.log(responses);
          expect(responses.status).to.eq(404);
        });
      });
    });
  });
});
