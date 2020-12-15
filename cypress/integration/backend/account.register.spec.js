describe('Account API', function () {
  //The site to automate
  const urlregister = '/api/register';

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

  it('Test#1 - Register in Account Success', function () {
    const username = 'admincypress0';
    const password = 'admincypress0';
    const email = 'admin@gmail.com';
    const firstname = 'Rex';
    const middlename = 'B';
    const lastname = 'Lee';
    const statusCode = 201;

    cy.registerCb(
      username,
      password,
      email,
      firstname,
      middlename,
      lastname,
      'admin'
    ).then((response) => {
      cy.log(response);
      expect(response.status).to.eq(statusCode);
    });

    cy.registerCb(
      'usercypress0',
      'usercypress0',
      email,
      firstname,
      middlename,
      lastname,
      'user'
    ).then((response) => {
      cy.log(response);
      expect(response.status).to.eq(statusCode);
    });
  });
});
