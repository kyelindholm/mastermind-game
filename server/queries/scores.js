const { client } = require('../../database');
const logger = require ('../utils/logger');

const saveScoreQuery = async(scoreObject) => {
  const dbEntry = await client.query(`INSERT INTO scores (username, score, difficulty) VALUES ('${scoreObject.username}', '${scoreObject.score}', '${scoreObject.difficulty}')`);

  return dbEntry;
}

module.exports = { saveScoreQuery };