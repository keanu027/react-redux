describe('Account API', function () {
  //The site to automate
  const urlregister = '/api/register';
  const urllogin = '/api/login';
  const urlprofile = '/api/profile';
  const urlaccount = '/api/account';

  //Callback loginCb
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

  Cypress.Commands.add(
    'registerCb',
    (username, password, email, firstname, middlename, lastname, usertype) => {
      cy.request({
        method: 'POST',
        url: urlregister,
        failOnStatusCode: false,
        body: {
          username,
          password,
          email,
          firstname,
          middlename,
          lastname,
          usertype,
        },
      });
    }
  );

  Cypress.Commands.add('profileCb', (token) => {
    cy.request({
      method: 'GET',
      url: urlprofile,
      failOnStatusCode: false,
      headers: {
        authorization: `token ${token}`,
      },
    });
  });

  Cypress.Commands.add('accountCb', (token) => {
    cy.request({
      method: 'GET',
      url: urlaccount,
      failOnStatusCode: false,
      headers: {
        authorization: `token ${token}`,
      },
    });
  });

  Cypress.Commands.add(
    'patchaccountCb',
    (
      token,
      username,
      password,
      email,
      firstname,
      middlename,
      lastname,
      usertype,
      id
    ) => {
      cy.request({
        method: 'PATCH',
        url: urlaccount,
        failOnStatusCode: false,
        headers: {
          authorization: `token ${token}`,
        },
        body: {
          username,
          password,
          email,
          firstname,
          middlename,
          lastname,
          usertype,
          id,
        },
      });
    }
  );

  Cypress.Commands.add('deleteaccountCb', (token, id) => {
    cy.request({
      method: 'DELETE',
      url: `/api/account/${id}`,
      failOnStatusCode: false,
      headers: {
        authorization: `token ${token}`,
      },
    });
  });
  /**
   * The result will pass if the status code is equal to 403
   */
  it('Test#1 - Login failed', function () {
    const username = 'wrong1';
    const password = 'password';
    const statusCode = 400;

    cy.loginCb(username, password).then((response) => {
      cy.log(response);
      expect(response.status).to.eq(statusCode);
    });

    cy.loginCb(username).then((response) => {
      cy.log(response);
      expect(response.status).to.eq(statusCode);
    });

    cy.loginCb('', '').then((response) => {
      cy.log(response);
      expect(response.status).to.eq(statusCode);
    });
  });

  /**
   * The result will pass if the status code is equal to 200, meaning success
   */
  it('Test#2 - Logged in success', function () {
    const username = 'admin';
    const password = 'admin';
    const statusCode = 200;
    // login admin
    cy.loginCb(username, password).then((response) => {
      cy.log(response);
      expect(response.status).to.eq(statusCode);
    });

    // login user
    cy.loginCb('user', '12345678').then((response) => {
      cy.log(response);
      expect(response.status).to.eq(statusCode);
    });
  });

  it('Test#3 - Register failed', function () {
    const username = 'wrong';
    const password = 'password';
    const email = 'asdas';
    const firstname = 'sample';
    const middlename = 'sample';
    const lastname = 'sample';
    const usertype = 'admin';
    const statusCode = 500;
    // incomplete data
    cy.registerCb(username, password).then((response) => {
      cy.log(response);
      expect(response.status).to.eq(statusCode);
    });
    // the username already exist
    cy.registerCb(
      username,
      password,
      email,
      firstname,
      middlename,
      lastname,
      usertype
    ).then((response) => {
      cy.log(response);
      expect(response.status).to.eq(400);
    });
  });

  it('Test#4 - Get Profile', function () {
    const username = 'admin';
    const password = 'admin';
    const statusCode = 200;
    // getting data admin profile
    cy.loginCb(username, password).then((response) => {
      cy.log(response);
      cy.profileCb(response.body.token).then((resp) => {
        expect(resp.status).to.eq(statusCode);
      });
    });
    // getting data user profile
    cy.loginCb('user', '12345678').then((response) => {
      cy.log(response);
      cy.profileCb(response.body.token).then((resp) => {
        expect(resp.status).to.eq(statusCode);
      });
    });
  });

  it('Test#5 - Get Profile Failed', function () {
    const username = 'admin';
    const password = 'admin';
    const statusCode = 401;
    // no token passed
    cy.loginCb(username, password).then((response) => {
      cy.log(response);
      cy.profileCb('').then((resp) => {
        expect(resp.status).to.eq(statusCode);
      });
    });
  });

  it('Test#6 - Get List of Users', function () {
    const username = 'admin';
    const password = 'admin';
    const statusCode = 200;
    // getting data of users
    cy.loginCb(username, password).then((response) => {
      cy.log(response);
      cy.accountCb(response.body.token).then((resp) => {
        expect(resp.status).to.eq(statusCode);
      });
    });
  });

  it('Test#7 - Get List of Users Failed', function () {
    const username = 'admin';
    const password = 'admin';
    const statusCode = 401;
    // no token passed
    cy.loginCb(username, password).then((response) => {
      cy.log(response);
      cy.accountCb('').then((resp) => {
        expect(resp.status).to.eq(statusCode);
      });
    });
  });

  it('Test#8 - Update Users Data', function () {
    const username = 'admin';
    const password = 'admin';
    const statusCode = 201;
    // getting data of users
    cy.loginCb(username, password).then((response) => {
      cy.log(response);
      cy.accountCb(response.body.token).then((resp) => {
        cy.log(resp.body[0]);
        cy.patchaccountCb(
          response.body.token,
          resp.body[0].username,
          resp.body[0].password,
          resp.body[0].email,
          'update user cypress',
          resp.body[0].middlename,
          resp.body[0].lastname,
          resp.body[0].usertype,
          resp.body[0].id
        ).then((responses) => {
          cy.log(responses);
          expect(responses.status).to.eq(statusCode);
        });
      });
    });
  });

  it('Test#9 - Update Users Data Failed', function () {
    const username = 'admin';
    const password = 'admin';
    const statusCode = 401;
    // getting data of users
    cy.loginCb(username, password).then((response) => {
      cy.log(response);
      cy.accountCb(response.body.token).then((resp) => {
        cy.log(resp.body[0]);
        cy.patchaccountCb(
          '',
          resp.body[0].username,
          resp.body[0].password,
          resp.body[0].email,
          'update user cypress',
          resp.body[0].middlename,
          resp.body[0].lastname,
          resp.body[0].usertype,
          resp.body[0].id
        ).then((responses) => {
          cy.log(responses);
          expect(responses.status).to.eq(statusCode);
        });
      });
    });
  });

  it('Test#10 - Delete Users Data', function () {
    const username = 'admin';
    const password = 'admin';
    const statusCode = 200;
    // getting data of users
    cy.loginCb(username, password).then((response) => {
      cy.log(response);
      cy.accountCb(response.body.token).then((resp) => {
        cy.log(resp.body[0].id);
        cy.deleteaccountCb(response.body.token, resp.body[0].id).then(
          (responses) => {
            cy.log(responses);
            expect(responses.status).to.eq(statusCode);
          }
        );
      });
    });
  });

  it('Test#11 - Delete Users Data Failed', function () {
    const username = 'admin';
    const password = 'admin';
    const statusCode = 401;
    // getting data of users
    cy.loginCb(username, password).then((response) => {
      cy.log(response);
      cy.accountCb(response.body.token).then((resp) => {
        cy.log(resp.body[0].id);
        cy.deleteaccountCb(response.body.token, '').then((responses) => {
          cy.log(responses);
          expect(responses.status).to.eq(404);
        });
      });
    });

    cy.loginCb(username, password).then((response) => {
      cy.log(response);
      cy.accountCb(response.body.token).then((resp) => {
        cy.log(resp.body[0].id);
        cy.deleteaccountCb('', resp.body[0].id).then((responses) => {
          cy.log(responses);
          expect(responses.status).to.eq(statusCode);
        });
      });
    });
  });
});
