const { client } = require('../../database');
const hash = require('../utils/hashUtils');

const signup = async (req, res) => {
  const responseData = await client.query(`SELECT * FROM users WHERE username='${req.body.username}'`);
  if (responseData.rows.length > 0) {
    res.status(409).send(`Error: Account with username "${req.body.username}" already exists!`);
  } else {
    let salt = hash.createRandom32String();
    let hashedPassword = hash.createHash(req.body.password, salt);

    const successfulCreation = await client.query(`INSERT INTO users (username, password, salt) VALUES ('${req.body.username}', '${hashedPassword}', '${salt}')`);
    res.status(200).send(`Account "${req.body.username}" successfully created!`);
  }
}

const login = async (req, res) => {
  const responseData = await client.query(`SELECT * FROM users WHERE username='${req.body.username}'`);
  if (responseData.rows.length === 0 || responseData.rows === undefined) {
    res.status(404).send(`Could not find account with username "${req.body.username}"!`);
  } else {
    const user = responseData.rows[0];
    if (hash.compareHash(req.body.password, user.password, user.salt)) {
      res.status(200).send("Login successful!");
    } else {
      res.status(400).send("Invalid password!");
    }
  }
}

module.exports = {signup, login}