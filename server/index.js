const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const axios = require('axios');
const logger = require('./utils/logger');

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', async (req, res) => {
  const randomNums = await axios.get('https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new');
  const strArray = Array.from(randomNums.data.replace(/[\r\n]/gm, ''));
  const numArray = strArray.map(str => Number(str));

  if (randomNums.data) {
    res.status(200).send(numArray);
  } else {
    res.status(500).send();
  }
});

app.listen(PORT, () => {
  logger.info(`Server listening on ${PORT}`);
});