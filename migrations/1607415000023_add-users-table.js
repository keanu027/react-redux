exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('users', {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    username: {
      type: 'text',
      notNull: true,
    },
    email: {
      type: 'text',
      notNull: true,
    },
    password: {
      type: 'text',
      notNull: true,
    },
    firstname: {
      type: 'text',
      notNull: true,
    },
    middlename: {
      type: 'text',
      notNull: true,
    },
    lastname: {
      type: 'text',
      notNull: true,
    },
    usertype: {
      type: 'text',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {};
