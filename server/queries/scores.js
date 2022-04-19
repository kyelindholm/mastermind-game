const { client } = require('../../database');
const logger = require ('../utils/logger');

const saveScoreQuery = async(scoreObject) => {
  const dbEntry = await client.query(`INSERT INTO scores (username, score, difficulty) VALUES ('${scoreObject.username}', '${scoreObject.score}', '${scoreObject.difficulty}')`);
  return dbEntry;
}

const getScoresQuery = async () => {
  const scores = await client.query(`SELECT * FROM scores LIMIT 5`);
  return scores;
}

module.exports = { saveScoreQuery, getScoresQuery };