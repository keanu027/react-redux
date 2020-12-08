exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('division', {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    userId: {
      type: 'integer',
      notNull: true,
      references: '"users"',
    },
    firstnum: {
      type: 'text',
      notNull: true,
    },
    secondnum: {
      type: 'text',
      notNull: true,
    },
    total: {
      type: 'text',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {};
