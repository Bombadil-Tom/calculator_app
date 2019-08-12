const bodyParser = require('body-parser');
const express = require('express');
// const { Pool } = require('pg');
// const mongoose = require('mongoose');

require('./models/CalculationSchema');


// const keys = require('./keys');
const port = 3000;
const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

require('./routes/calculatorApi')(app);


// const pgClient = require('./dbConnect');
// const pgClient = new Pool({
//   user: keys.pgUser,
//   host: keys.pgHost,
//   database: keys.pgDatabase,
//   password: keys.pgPassword,
//   port: keys.pgPort
// });
// pgClient.on('error', ()=>console.log('Lost PG connection'));


// const extensionText = `CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
// pgClient
//   .query(extensionText)
//   .catch(e=>console.log(e));

// const createText =
//     `CREATE TABLE IF NOT EXISTS
//       calculations(
//         id UUID DEFAULT uuid_generate_v4 (),
//         PRIMARY KEY (id)
//       )`;

// //   .query('SELECT NOW()')
// //   .query('CREATE TABLE IF NOT EXISTS operations (type VARCHAR(25) NOT NULL, value INT NOT NULL)')

// const db_name1 = 'calculations';
// const db_name2 = 'tokens';
// const dropText1 = `DROP TABLE IF EXISTS ${db_name1}`;
// const dropText2 = `DROP TABLE IF EXISTS ${db_name2}`;
// pgClient
//   .query(dropText1)
//   .catch(e=>console.log(e));

// pgClient
//   .query(dropText2)
//   .catch(e=>console.log(e));


// pgClient
//   .query(createText)
//   .catch(e=>console.log(e));

// // const newUuid = uuidv1();
// // const testUuid = "ed194837-26e1-49fd-95d5-7bb3ae79261f"
// const testUuid = "40e6215u-b5c6-4896-987c-f30f3678f608"
// // const testUuid = "awe53425"
// // const testUuid = "ed194837-26e1"
// const postText = `INSERT INTO ${db_name} DEFAULT VALUES returning id`;
// // const postText = `INSERT INTO ${db_name}(id) VALUES(${testUuid})`;
// console.log(postText);
// pgClient
// .query(postText).then(res=>console.log(res))
// .catch(e=>console.log(e));


//   app.post('/calculations', (req, res) => {
//     const newUuid = uuidv1();
//     console.log('hiiii', newUuid);
//     const queryText = `INSERT INTO ${db_name}(serial) VALUES(${newUuid})`;
//     console.log('querytext', queryText);
//     pgClient.query(queryText).catch(e=>console.log(e));
//     res.status(201).send(req.body);
//   });

// app.get('/values', async ()=>{
//     console.log('hiiii')
//     const queryText = `SELECT * FROM ${db_name}`;
//   const val = await pgClient.query(queryText).catch(e=>console.log(e));
//   console.log(val.rows);
// });

// axios.post('/calculations').then(res=>console.log(res));


// const { Client } = require('pg');
// const client = new Client();
// client.connect();
// client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
//   console.log(err ? err.stack : res.rows[0].message); // Hello World!
//   client.end();
// });

// const { Pool } = require('pg')
// const pool = new Pool({
//   user: 'BaxterStockman',
//   host: '127.0.0.1',
//   database: 'postgres',
//   password: 'jupiter12',
//   port: '5432'
// });

// pool.query('SELECT NOW()', (err, res) => {
// //   if (err) {
// //     throw err;
// //   }
//   console.log(err, res);
//   pool.end();
// });

app.listen(port, () => console.log(`app listening to port ${port}`));
