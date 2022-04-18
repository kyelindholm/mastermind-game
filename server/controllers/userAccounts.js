const { client } = require('../../database');
const hash = require('../utils/hashUtils');

const signup = async (req, res) => {
  const responseData = await client.query(`SELECT * FROM users WHERE username='${req.body.username}'`);
  if (responseData.rows.length > 0) {
    const accountError = new Error(`ERROR: USER WITH USERNAME ${req.body.username} ALREADY EXISTS`)
    res.status(409).send();
  } else {
    let salt = hash.createRandom32String();
    let hashedPassword = hash.createHash(req.body.password, salt);

    const successfulCreation = await client.query(`INSERT INTO users (username, password, salt) VALUES ('${req.body.username}', '${hashedPassword}', '${salt}')`);
    res.status(200).send(`ACCOUNT ${req.body.username} SUCCESSFULLY CREATED`);
  }
}

const login = async (req, res) => {
  console.log('login', req.body);
  res.status(200).send();
}

module.exports = {signup, login}