const express = require("express");
const app = express();
const logger = require('./utils/logger');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const {fetchRandomNumbers} = require('./controllers/randomNum');
const { saveScore } = require('./queries/scores');

app.use(middleware.corsHandler);
app.use(middleware.requestLogger);
app.use(express.json());

// fetches 4 random numbers from random.org, converts them to an integer array, and returns them in the response
app.get('/randomnums', fetchRandomNumbers);

app.post('/scoreboard', async (req, res) => {
  const returnVal = await logger.info(saveScore(req.body));
  res.status(200).send(returnVal);
});

app.listen(config.PORT, () => {
  logger.info(`Server listening on ${config.PORT}`);
});