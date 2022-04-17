const {saveScoreQuery} = require('../queries/scores');

const saveScores = async (req, res) => {
  const returnVal = await saveScoreQuery(req.body);
  res.status(200).send(returnVal);
}

module.exports = {saveScores};