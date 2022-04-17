const express = require("express");
const app = express();
const logger = require('./utils/logger');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const {fetchRandomNumbers} = require('./controllers/randomNum');
const {saveScores} = require('./controllers/scoresDB');

app.use(middleware.corsHandler);
app.use(middleware.requestLogger);
app.use(express.json());

// fetches 4 random numbers from random.org, converts them to an integer array, and returns them in the response
app.get('/randomnums', fetchRandomNumbers);

// populates scores table within mastermind db with submitted score object
app.post('/scoreboard', saveScores);

app.listen(config.PORT, () => {
  logger.info(`Server listening on ${config.PORT}`);
});