const express = require("express");
const app = express();
const logger = require('./utils/logger');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const { fetchRandomNumbers } = require('./controllers/randomNum');
const { saveScores, fetchScores, fetchScoreHistory } = require('./controllers/scoresDb');
const { signup, login } = require('./controllers/userAccounts')

app.use(middleware.corsHandler);
app.use(middleware.requestLogger);
app.use(express.json());

// fetches 4 random numbers from random.org, converts them to an integer array, and returns them in the response
app.get('/randomnums', fetchRandomNumbers);

// fetches the top 10 scores within the scores table of the mastermind db
app.get('/scoreboard', fetchScores);

app.get('/scorehistory', fetchScoreHistory);

// populates scores table within mastermind db with submitted score object
app.post('/scoreboard', saveScores);

// creates a user account after checking for conflicting duplicate username
app.post('/signup', signup);

// logs the user in, given the correct login credentials
app.post('/login', login);





app.listen(config.PORT, () => {
  logger.info(`Server listening on ${config.PORT}`);
});