const express = require('express');
const massive = require('massive');
var cors = require('cors');
const account = require('./controller/account');
const addition = require('./controller/addition');
const subtraction = require('./controller/subtraction');
const multiplication = require('./controller/multiplication');
const division = require('./controller/division');

massive({
  host: 'localhost',
  port: 5432,
  database: 'redux',
  user: 'postgres',
  password: 'reduxdb',
}).then((db) => {
  const app = express();

  app.set('db', db);
  app.use(cors());
  app.use(express.json());

  const PORT = 3001;

  app.post('/api/register', account.Create);
  app.post('/api/login', account.Login);
  app.get('/api/profile', account.UserData);
  app.get('/api/account', account.UserList);
  app.patch('/api/account', account.UpdateUser);
  app.delete('/api/account/:id', account.DeleteUser);
  //operation Addition
  app.post('/api/addition', addition.Create);
  app.get('/api/addition', addition.AddList);
  app.patch('/api/addition', addition.UpdateUserAdd);
  app.delete('/api/addition/:id', addition.DeleteUserAdd);
  //operation Subtraction
  app.post('/api/subtraction', subtraction.Create);
  app.get('/api/subtraction', subtraction.SubList);
  app.patch('/api/subtraction', subtraction.UpdateUserSub);
  app.delete('/api/subtraction/:id', subtraction.DeleteUserSub);
  //operation multiplication
  app.post('/api/multiplication', multiplication.Create);
  app.get('/api/multiplication', multiplication.MultiList);
  app.patch('/api/multiplication', multiplication.UpdateUserMulti);
  app.delete('/api/multiplication/:id', multiplication.DeleteUserMulti);
  //   //operation division
  app.post('/api/division', division.Create);
  app.get('/api/division', division.DivideList);
  app.patch('/api/division', division.UpdateUserDivide);
  app.delete('/api/division/:id', division.DeleteUserDivide);

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
