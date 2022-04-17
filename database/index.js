const { Client } = require('pg');
const { host, user, password } = require('../config.js');

const client = new Client({
  user: user,
  host: host,
  database: 'mastermind',
  password: password, // password for database
  port: 5432,
});

client
  .connect()
  .then(() => {
    console.log('postgres connected');
  })
  .catch((err) => {
    console.log('err: ', err);
  });

module.exports = {client};