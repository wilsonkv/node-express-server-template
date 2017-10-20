'use strict';
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
if (process.env.NODE_ENV === 'test') {
  process.env.DATABASE_URL = process.env.TEST_DATABASE_URL;
}
let postgrator = require('postgrator');

postgrator.setConfig({
  migrationDirectory: __dirname + '/migrations',
  driver: 'pg',
  connectionString: process.env.DATABASE_URL,
});

// migrate to version specified, or supply 'max' to go all the way up
postgrator.migrate('max', function(err, migrations) {
  if (err) {
    console.log(err);
  } else {
    if (migrations) {
      console.log(
        ['*******************']
          .concat(migrations.map(migration => `checking ${migration.filename}`))
          .join('\n')
      );
    }
  }
  postgrator.endConnection(() => {});
});
