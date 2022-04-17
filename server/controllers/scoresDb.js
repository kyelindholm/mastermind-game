const { saveScoreQuery, getScoresQuery } = require('../queries/scores');

const saveScores = async (req, res) => {
  const returnVal = await saveScoreQuery(req.body);
  res.status(200).send(returnVal);
}

const fetchScores = async (req, res) => {
  const returnVal = await (getScoresQuery());
  res.status(200).send(returnVal.rows);
}

module.exports = { saveScores, fetchScores };