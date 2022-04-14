const axios = require('axios');

const fetchRandomNumbers = async (req, res) => {
  const URL = 'https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new';
  const randomNums = await axios.get(URL);
  const strArray = Array.from(randomNums.data.replace(/[\r\n]/gm, ''));
  const numArray = strArray.map(str => Number(str));

  if (randomNums.data) {
    res.status(200).send(numArray);
  } else {
    res.status(500).send();
  }
};

module.exports = {fetchRandomNumbers};