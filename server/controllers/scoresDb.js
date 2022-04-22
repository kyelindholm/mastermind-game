const { saveScoreQuery, getScoresQuery, getScoreHistoryQuery } = require('../queries/scores');

const saveScores = async (req, res) => {
  try {
    const returnVal = await saveScoreQuery(req.body);
    res.status(200).send(returnVal);
  } catch (error) {
    res.status(500).send(error);
  }
};

const fetchScores = async (req, res) => {
  try {
    const returnVal = await getScoresQuery();
    res.status(200).send(returnVal.rows);
  } catch (error) {
    res.status(500).send(error);
  }
};

const fetchScoreHistory = async (req, res) => {
  try {
    const returnVal = await getScoreHistoryQuery(req.query.username);
    res.status(200).send(returnVal.rows);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { saveScores, fetchScores, fetchScoreHistory };