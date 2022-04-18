const { client } = require('../../database');
const hash = require('../utils/hashUtils');

const signup = async (req, res) => {
  console.log('signup', req.body);
  res.status(200).send();
}

const login = async (req, res) => {
  console.log('login', req.body);
  res.status(200).send();
}

module.exports = {signup, login}