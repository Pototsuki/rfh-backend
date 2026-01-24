require('dotenv').config();
const path = require('path');
const { Umzug, SequelizeStorage } = require('umzug');
const sequelize = require('../config/database');

const umzug = new Umzug({
  migrations: {
    glob: 'migrations/*.js'
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({
    sequelize
  }),
  logger: console
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    const migrations = await umzug.up();
    console.log(
      '✅ Migrations executed:',
      migrations.map(m => m.name)
    );

    process.exit(0);
  } catch (err) {
    console.error('❌ Migration failed:', err);
    process.exit(1);
  }
})();
