import { useState, useEffect, useRef } from "react";
import GuessContainer from "./components/GuessContainer";
import GuessInput from "./components/GuessInput";
import GuessHistoryFeed from "./components/GuessHistoryFeed";
import DifficultySelector from "./components/DifficultySelector";
import SubmitScoreForm from "./components/SubmitScoreForm";
import ScoreBoard from "./components/ScoreBoard";
import LoginForm from "./components/LoginForm"
import Logout from "./components/Logout";
import ScoreHistoryDisplay from "./components/ScoreHistoryDisplay";
import {
  correctNumberCorrectIdx,
  correctNumberGuess,
} from "./helpers/checkArrays";
import axios from "axios";




const App = () => {
  const [randomSequence, setRandomSequence] = useState([]);
  const [currentGuess, setCurrentGuess] = useState([]);
  const [initialGuesses, setInitialGuesses] = useState(10);
  const [remainingGuesses, setRemainingGuesses] = useState(10);
  const [guessHistory, setGuessHistory] = useState([]);
  const [difficulty, setDifficulty] = useState("easy");
  const [submitModalVisible, setSubmitModalVisible] = useState(false);
  const [score, setScore] = useState(0);
  const [scoreBoardVisible, setScoreBoardVisible] = useState(false);
  const [topScores, setTopScores] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.loggedInUser));
  const [username, setUsername] = useState(localStorage.loggedInUser);
  const [statusMessage, setStatusMessage] = useState('');
  const [scoreHistory, setScoreHistory] = useState([]);
  const [toggleScoreHistoryDisplay, setToggleScoreHistoryDisplay] = useState(false);
  const didMountRef = useRef(false);
  const targetRef = useRef(null);

  useEffect(() => {
    if (!didMountRef.current) {
      targetRef.current.focus();
      didMountRef.current = true;
    } else {
      getScores();
      getRandomNumbers();
    }
  }, []);


  const getScores = async () => {
    const newTopScores = await axios.get("http://localhost:3001/scoreboard");
    newTopScores.data.sort((a, b) => b.score - a.score);
    setTopScores(newTopScores.data);
  }

  const getScoreHistory = async () => {
    const newScoreHistory = await axios.get(`http://localhost:3001/scorehistory?username=${username}`);
    setToggleScoreHistoryDisplay(!toggleScoreHistoryDisplay);
    setScoreHistory(newScoreHistory.data);
  }

  const getRandomNumbers = async () => {
    const numberSequence = await axios.get("http://localhost:3001/randomnums");
    setRandomSequence(numberSequence.data);
  };

  const handleChangeGuess = (guessNum) => {
    if (currentGuess.length < 4) {
      setCurrentGuess([...currentGuess, Number(guessNum)]);
    }
  };

  const handleBackspace = () => {
    setCurrentGuess(currentGuess.slice(0, currentGuess.length - 1));
  };

  const handleChangeDifficulty = (event) => {
    resetGame();
    if (event.target.value === "hard") {
      setInitialGuesses(5);
      setRemainingGuesses(5);
    }
    if (event.target.value === "easy" || event.target.value === "medium") {
      setInitialGuesses(10);
      setRemainingGuesses(10);
    }
    setDifficulty(event.target.value);
  };

  const resetGame = () => {
    getScores();
    setCurrentGuess([]);
    setScore(0);
    setDifficulty('easy');
    setInitialGuesses(10);
    setRemainingGuesses(10);
    setGuessHistory([]);
    setSubmitModalVisible(false);
    getRandomNumbers();
  };

  const handleSubtractRemainingGuesses = (feedbackMessage) => {
    if (remainingGuesses <= 1) {
      alert("You lose! Then number was " + randomSequence.join("") + "!");
      resetGame();
    } else {
      setGuessHistory([
        ...guessHistory,
        { guess: currentGuess, feedbackMessage: feedbackMessage },
      ]);
      setRemainingGuesses(remainingGuesses - 1);
      setCurrentGuess([]);
    }
  };

  const handleSubmitGuess = () => {
    setScore((remainingGuesses / initialGuesses) * 100);
    if (difficulty === "easy") {
      if (currentGuess.join("") === randomSequence.join("")) {
        setSubmitModalVisible(true);
      } else if (
        correctNumberCorrectIdx(currentGuess, randomSequence) !== false
      ) {
        handleSubtractRemainingGuesses(
          `The number ${correctNumberCorrectIdx(
            currentGuess,
            randomSequence
          )} is in its correct place!`
        );
      } else if (correctNumberGuess(currentGuess, randomSequence) !== false) {
        handleSubtractRemainingGuesses(
          `The number ${correctNumberGuess(
            currentGuess,
            randomSequence
          )} is in the hidden sequence, but in a different position!`
        );
      } else {
        handleSubtractRemainingGuesses("No correct numbers! Try again!");
      }
    } else {
      if (currentGuess.join("") === randomSequence.join("")) {
        if (difficulty === "medium") {
          setScore((score * 2) - 20);
        } else if (difficulty === "hard") {
          setScore((score * 5) - 50);
        }
        setSubmitModalVisible(true);
      } else if (
        correctNumberCorrectIdx(currentGuess, randomSequence) !== false
      ) {
        handleSubtractRemainingGuesses(
          "You've guessed a correct number in its correct place!"
        );
      } else if (correctNumberGuess(currentGuess, randomSequence) !== false) {
        handleSubtractRemainingGuesses(
          "You've guessed at least one correct number!"
        );
      } else {
        handleSubtractRemainingGuesses("No correct numbers! Try again!");
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Backspace") {
      handleBackspace();
    } else if (event.keyCode >= 48 && event.keyCode <= 55) {
      handleChangeGuess(Number(event.key));
    } else if (event.key === "Enter" && currentGuess.length === 4) {
      handleSubmitGuess();
    }
  };

  const handleSubmitScore = async () => {
    await axios.post(`http://localhost:3001/scoreboard`, {
      username: username,
      score: score,
      difficulty: difficulty,
    });
    resetGame();
  };

  const handleCreateAccount = async (event, accountDetails) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/signup', accountDetails);
      console.log(response);
      setStatusMessage(response.data);
    } catch (err) {
      setStatusMessage('Error: User with that username already exists!');
    }
  }

  const handleUsernameError = (event) => {
    event.preventDefault();
    setStatusMessage('Error: "Guest" is a reserved term and cannot be a username!');
  }

  const setLoginConditions = (user) => {
    setUsername(user);
    setIsLoggedIn(true);
    targetRef.current.focus();
    resetGame();
  }

  const handleLogin = async (loginDetails, event = null) => {
    if (event) event.preventDefault();
    if (loginDetails.username === "Guest") {
      setLoginConditions('Guest');
    } else {
      try {
        await axios.post('http://localhost:3001/login', loginDetails);
        localStorage.loggedInUser = loginDetails.username;
        setLoginConditions(loginDetails.username);
      } catch (err) {
        setStatusMessage(err.response.data);
      }
    }
  }

  const handleLogout = () => {
    resetGame();
    localStorage.clear();
    setIsLoggedIn(false);
    setStatusMessage('')
    setUsername('');
  }

  return (
    <div
    className="container"
      tabIndex="5"
      ref={targetRef}
      onKeyDown={
        submitModalVisible || !isLoggedIn
          ? () => {}
          : (e) => {
              handleKeyPress(e);
            }
      }
    >
      {submitModalVisible ? (
        <SubmitScoreForm
          closeForm={resetGame}
          handleSubmitScore={handleSubmitScore}
          score={score}
        />
      ) : (
        <div className="header">
          <h1>MASTERMIND</h1>
          <DifficultySelector handleChangeDifficulty={handleChangeDifficulty} />
          <h2 style={{display: "inline-block"}}>{remainingGuesses} guesses left!</h2>
        </div>
      )}
      <div className="showScoreBoard">
        <input type="checkbox" name="scorboardCheck" checked={scoreBoardVisible} onChange={() => {setScoreBoardVisible(!scoreBoardVisible)}}/>
        <label htmlFor="scorboardCheck">Show Scoreboard</label>
      </div>
      <Logout visibility={username ? "visible" : "hidden"} username={username} handleLogout={handleLogout}/>
      <hr />
      {isLoggedIn ?  (
      <div>
        <ScoreBoard topScores={topScores} visible={scoreBoardVisible}/>
        <GuessHistoryFeed guessHistory={guessHistory} />
        <div className="gameBoard">
          <GuessContainer currentGuess={currentGuess} />
          <GuessInput
            handleChangeGuess={handleChangeGuess}
            handleBackspace={handleBackspace}
          />
          <div
            className="submitGuess"
            style={
              currentGuess.length === 4
                ? { visibility: "visible" }
                : { visibility: "hidden" }
            }
            onClick={handleSubmitGuess}
          >
            GUESS
          </div>
        </div>
      </div>
      ) : (
        <LoginForm handleLogin={handleLogin} handleCreateAccount={handleCreateAccount} statusMessage={statusMessage} handleUsernameError={handleUsernameError}/>
      )}
      <ScoreHistoryDisplay scoreHistory={scoreHistory} isVisible={toggleScoreHistoryDisplay}/>
      <div className="showScoreHistory" style={isLoggedIn && username !== "Guest" ? {visibility: "visible"} : {visibility: "hidden"}} onClick={getScoreHistory}>{toggleScoreHistoryDisplay ? "HIDE" : "SHOW"} SCORE HISTORY</div>
    </div>
  );
};

export default App;
