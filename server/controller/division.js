const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const secret = require('../../secret');
const e = require('express');

function Create(req, res) {
  const db = req.app.get('db');

  const { firstnum, secondnum } = req.body;
  if (firstnum.length !== 0 && secondnum.length !== 0) {
    if (!req.headers.authorization) {
      return res.status(401).end();
    }
    try {
      const token = req.headers.authorization.split(' ')[1];

      jwt.verify(token, secret);
      const data = jwt.decode(token, secret);
      const total = parseFloat(firstnum) / parseFloat(secondnum);
      db.division
        .insert(
          {
            userId: data.userId,
            firstnum,
            secondnum,
            total,
          },
          {
            fields: ['id', 'userId', 'firstnum', 'secondnum', 'total'],
          }
        )
        .then((adddata) => res.status(200).json(adddata))
        .catch((err) => {
          console.error(err);
          res.status(500).end();
        });
    } catch (err) {
      console.error(err);
      res.status(401).end();
    }
  } else {
    return res.status(400).send({ error: 'Incorrect Credentials' });
  }
}

function DivideList(req, res) {
  const db = req.app.get('db');

  if (!req.headers.authorization) {
    return res.status(401).end();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, secret);
    const data = jwt.decode(token, secret);

    db.division
      .find(
        { userId: data.userId },
        {
          fields: ['id', 'userId', 'firstnum', 'secondnum', 'total'],
        }
      )
      .then((adddata) => res.status(200).json(adddata))
      .catch((err) => {
        console.error(err);
        res.status(500).end();
      });
  } catch (err) {
    console.error(err);
    res.status(401).end();
  }
}

function UpdateUserDivide(req, res) {
  const db = req.app.get('db');

  const { firstnum, secondnum, id } = req.body;
  if (firstnum.length !== 0 && secondnum.length !== 0) {
    if (!req.headers.authorization) {
      return res.status(401).end();
    }
    try {
      const token = req.headers.authorization.split(' ')[1];

      jwt.verify(token, secret);
      const total = parseFloat(firstnum) / parseFloat(secondnum);
      db.division
        .update(
          { id: id },
          {
            firstnum: firstnum,
            secondnum: secondnum,
            total: total,
          },
          {
            fields: ['id', 'userId', 'firstnum', 'secondnum', 'total'],
          }
        )
        .then((updatedata) => res.status(200).json(updatedata))
        .catch((err) => {
          console.error(err);
          res.status(500).end();
        });
    } catch (err) {
      console.error(err);
      res.status(401).end();
    }
  } else {
    return res.status(400).send({ error: 'Incorrect Credentials' });
  }
}

function DeleteUserDivide(req, res) {
  const db = req.app.get('db');

  if (!req.headers.authorization) {
    return res.status(401).end();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, secret);
    const data = jwt.decode(token, secret);

    db.division
      .destroy({ id: req.params.id })
      .then((deleledata) => res.status(200).json())
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
  DivideList,
  UpdateUserDivide,
  DeleteUserDivide,
};
