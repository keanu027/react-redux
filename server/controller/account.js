const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const secret = require('../../secret');

function Create(req, res) {
  const db = req.app.get('db');

  const {
    username,
    email,
    password,
    firstname,
    middlename,
    lastname,
    usertype,
  } = req.body;
  if (
    username.toLowerCase().length !== 0 &&
    email.toLowerCase().length !== 0 &&
    password.toLowerCase().length !== 0 &&
    firstname.toLowerCase().length !== 0 &&
    middlename.toLowerCase().length !== 0 &&
    lastname.toLowerCase().length !== 0 &&
    usertype.toLowerCase().length !== 0
  ) {
    db.users.findOne({ username }).then((user) => {
      if (user) {
        res.status(400).send({ error: 'Username ALready Exist' });
      } else {
        argon2
          .hash(password)
          .then((hash) => {
            return db.users.insert(
              {
                username,
                email,
                password: hash,
                firstname,
                middlename,
                lastname,
                usertype,
              },
              {
                fields: [
                  'id',
                  'username',
                  'email',
                  'password',
                  'firstname',
                  'middlename',
                  'lastname',
                  'usertype',
                ],
              }
            );
          })
          .then((user) => {
            const token = jwt.sign({ userId: user.id }, secret);
            res.status(201).json({ ...user, token });
          })
          .catch((err) => {
            console.log(err);
            return res.status(400).send({ error: 'Incorrect Credentials' });
          });
      }
    });
  } else {
    return res.status(400).send({ error: 'Incorrect Credentials' });
  }
}

function Login(req, res) {
  const db = req.app.get('db');

  const { username, password } = req.body;

  db.users
    .findOne(
      { username },
      {
        fields: [
          'id',
          'username',
          'password',
          'email',
          'firstname',
          'middlename',
          'lastname',
          'usertype',
        ],
      }
    )
    .then(async (user) => {
      if (!user) {
        throw new Error('Invalid Username');
      }

      const valid = await argon2.verify(user.password, password);
      console.log(valid);
      if (!valid) {
        throw new Error('Incorrect Password');
      }
      const token = jwt.sign({ userId: user.id }, secret);
      delete user.password;
      res.status(200).json({ ...user, token });
    })
    .catch((err) => {
      if (['Invalid Username', 'Incorrect Password'].includes(err.message)) {
        res.status(400).json({ error: err.message });
      } else {
        console.error(err);
        res.status(500).end();
      }
    });
}

function UserData(req, res) {
  const db = req.app.get('db');

  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, secret);
    const data = jwt.decode(token, secret);
    db.users
      .findOne(
        {
          id: data.userId,
        },
        {
          fields: [
            'id',
            'username',
            'email',
            'firstname',
            'middlename',
            'lastname',
            'usertype',
          ],
        }
      )
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).end();
      });
  } catch (err) {
    console.error(err);
    res.status(401).end();
  }
}

function UserList(req, res) {
  const db = req.app.get('db');

  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, secret);

    db.users
      .find(
        { usertype: 'user' },
        {
          fields: [
            'id',
            'username',
            'password',
            'email',
            'firstname',
            'middlename',
            'lastname',
            'usertype',
          ],
        }
      )
      .then((user) => res.status(200).json(user))
      .catch((err) => {
        console.error(err);
        res.status(500).end();
      });
  } catch (err) {
    console.error(err);
    res.status(401).end();
  }
}

function UpdateUser(req, res) {
  const db = req.app.get('db');
  const {
    username,
    email,
    password,
    firstname,
    middlename,
    lastname,
    usertype,
    id,
  } = req.body;

  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, secret);
    if (
      username.toLowerCase().length !== 0 &&
      email.toLowerCase().length !== 0 &&
      password.toLowerCase().length !== 0 &&
      firstname.toLowerCase().length !== 0 &&
      middlename.toLowerCase().length !== 0 &&
      lastname.toLowerCase().length !== 0 &&
      usertype.toLowerCase().length !== 0
    ) {
      db.users
        .findOne({ id: id }, { fields: ['password'] })
        .then(async (user) => {
          if (!user) {
            throw new Error('Invalid Account');
          }
          const valid = await argon2.verify(user.password, password);

          if (valid || user.password === password) {
            db.users
              .update(
                { id: id },
                {
                  username: username,
                  email: email,
                  password: user.password,
                  firstname: firstname,
                  middlename: middlename,
                  lastname: lastname,
                  usertype: usertype,
                  id: id,
                }
              )
              .then((userdata) => res.status(201).json(userdata))
              .catch((err) => {
                console.error(err);
                return res.status(400).send({ error: 'Incorrect Credentials' });
              });
          } else {
            argon2
              .hash(password)
              .then((hash) => {
                return db.users.update(
                  { id: id },
                  {
                    username: username,
                    email: email,
                    password: hash,
                    firstname: firstname,
                    middlename: middlename,
                    lastname: lastname,
                    usertype: usertype,
                    id: id,
                  }
                );
              })
              .then((userdata) => res.status(201).json(userdata))
              .catch((err) => {
                console.error(err);
                return res.status(400).send({ error: 'Incorrect Credentials' });
              });
          }
        })
        .catch((err) => {
          console.error(err);
          return res.status(400).send({ error: err.message });
        });
    } else {
      return res.status(400).send({ error: 'Incorrect Credentials' });
    }
  } catch (err) {
    console.error(err);
    res.status(401).end();
  }
}

function DeleteUser(req, res) {
  const db = req.app.get('db');

  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, secret);

    db.users
      .destroy({ id: req.params.id })
      .then((user) => res.status(200).json())
      .catch((err) => {
        console.error(err);
        res.status(500).end();
      });
  } catch (err) {
    console.error(err);
    res.status(401).end();
  }
}

module.exports = {
  Create,
  Login,
  UserData,
  UserList,
  UpdateUser,
  DeleteUser,
};
