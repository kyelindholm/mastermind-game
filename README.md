<p align="center">
  <h1 align="center">MASTERMIND</h1>
</p>

## About:
Mastermind is a guessing game! In this iteration, the user tries to guess a random combination of four numbers between 0 and 7 inclusive. The user has 10 attempts, and after each attempt the user is notified whether they have guessed a correct number, whether they have guessed a correct number in its correct position, or whether their guess was wholly incorrect.

While I wasn't very familiar with the Mastermind game before this project, its rules certainly remind of a game I *am* familiar with! The flow of Mastermind reminds me a lot of Wordle, which I used to inspire my game's interface. I decided to build this iteration of the Mastermind game as a full stack React web application, powered by Node/Express.js on the back end and supported by a PostgreSQL database.

## File Structure:
```
├── README.md
├── client
│   ├── README.md
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── styles.css
│   └── src
│       ├── App.js
│       ├── components
│       │   ├── DifficultySelector.js
│       │   ├── GuessContainer.js
│       │   ├── GuessHistoryFeed.js
│       │   ├── GuessInput.js
│       │   ├── LoginForm.js
│       │   ├── Logout.js
│       │   ├── ScoreBoard.js
│       │   ├── ScoreItem.js
│       │   └── SubmitScoreForm.js
│       ├── helpers
│       │   └── checkArrays.js
│       └── index.js
├── config.js
├── database
│   ├── index.js
│   └── schema.sql
├── package-lock.json
├── package.json
└── server
    ├── controllers
    │   ├── randomNum.js
    │   ├── scoresDb.js
    │   └── userAccounts.js
    ├── index.js
    ├── queries
    │   └── scores.js
    └── utils
        ├── config.js
        ├── hashUtils.js
        ├── logger.js
        └── middleware.js
```
## Personal Extensions:
- __Hints/Difficulty Levels__: I felt the base version of the game as described in the project documentation was a little too difficult. This base version is my "medium" mode. The "easy" mode on Mastermind provides the user with hints after each guess attempt, giving feedback as to *which* numbers you may have guessed correctly as opposed to just whether or not there is a correct number within the current guess. The "hard" mode does away with these hints, like "medium", but cuts the number of guess attempts in half.

- __Scoring System/Scoreboard__: What's the fun of playing a harder version of the game if you're not earning more? Score is calculated by number of remaining guesses (i.e. the quicker you guess the correct answer, the higher your score) and there is a multiplier for each successively harder level. Interested in some competition? Check out the scoreboard, where you can view the top 5. This scoreboard is updated immediately after every score submission, so people can see your dominance instantly!

- __User Accounts__: While you can opt to play Mastermind as a guest, the user can also choose to create an account to make a name for themselves! When a logged-in user submits their score, it's automatically saved alongside their username (which is used to display scores on the scoreboard for bragging rights). Logins are persistant on the client-side, so no need to log in more than once until you log out! Worried about account security? Worry no more! Our stored passwords are encrypted behind SHA-256 hash functions - even I can't log in to accounts I didn't create!

- __Score History__: Want to monitor your personal Mastermind improvement? Logged-in users can view a history of their past scores in a toggle-able modal, complete with the date the score was achieved and the difficulty it was achieved on!

## Preview:

Mastermind's account creation doesn't allow accounts with duplicate usernames - "guest" is also a reserved word and cannot be uses as a username!
<p align="center">
  <img src="https://i.imgur.com/FImclCe.png" alt="Mastermind homepage" />
</p>

Mastermind's "easy" mode gives you comprehensive feedback after each guess - it'll tell you *which* number you've guessed correctly.
<p align="center">
  <img src="https://i.imgur.com/yShkUoL.png" alt="Mastermind easy hint" />
</p>

Mastermind's "hard" mode makes hints less specific and gives the user less chances to guess! Check out the best players on the scoreboard!
<p align="center">
  <img src="https://i.imgur.com/tuIjGLP.png" alt="Mastermind hard hint + scoreboard" />
</p>

Want to show off how good you are at Mastermind? Submit your score once you've won the game!
<p align="center">
  <img src="https://i.imgur.com/fbRjYgh.png" alt="Mastermind submit score" />
</p>





## To Run Locally:
1) After downloading the project, install dependencies. Be sure to run `npm install` within both the root directory and the client directory!

2) Ensure you have PostgreSQL installed on your machine! Create a `config.js` file in the root directory (as shown in the file structure above). This file should export "user", "host", and "password" variables that correspond with your PostgreSQL credentials. The default PostgreSQL user is "postgres" and the host should be "localhost". If you have not set one up, the password should be an empty string. For context, these variables are used in `index.js` within the database directory.

    - To connect to the deployed database and view others' scores for a bit more competition (or if you don't feel like installing PostgreSQL), your config.js file should look like:
    ```
    module.exports.host="mastermind-db.cq8styafifva.us-east-1.rds.amazonaws.com";
    module.exports.user="kyelindholm";
    module.exports.password="password123";
    ```

3) Assuming you're not using the deployed database, once PostgreSQL is installed and your config file is set up, run `npm run create-database` from the root directory. As the script's name suggests, this executes the `schema.sql` file within the database directory and will automatically create the database and tables needed to run Mastermind.

4) To create a production-ready build run `npm run build` from the root directory. Run `npm start` and your client and server will start - you should be ready to play Mastermind!