const { Pool } = require('pg');

const keys = require('./keys');

const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort
});
pgClient.on('error', ()=>console.log('Lost PG connection'));

const calcDb = 'calculations';
const tokenDb = 'tokens';

const extensionText = 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp"';
pgClient
  .query(extensionText)
  .catch(e=>console.log(e));

const createCalculations =
      `CREATE TABLE IF NOT EXISTS
        ${calcDb}(
          id UUID DEFAULT uuid_generate_v4 (),
          PRIMARY KEY (id)
        )`;

pgClient
  .query(createCalculations)
  .catch(e=>console.log(e));

const createTokens =
  `CREATE TABLE IF NOT EXISTS
    ${tokenDb}(
      type VARCHAR(15) NOT NULL,
      value VARCHAR(15) NOT NULL,
      id UUID, 
      FOREIGN KEY (id) REFERENCES ${calcDb} (id) ON DELETE CASCADE
    )`;

pgClient
  .query(createTokens)
  .catch(e=>console.log(e));

// const postText = `INSERT INTO ${db_name} DEFAULT VALUES returning id`;
// pgClient
//   .query(postText).then(res=>console.log(res))
//   .catch(e=>console.log(e));

module.exports = pgClient;
