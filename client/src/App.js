import { useState, useEffect, useRef } from "react";
import GuessContainer from "./components/GuessContainer";
import GuessInput from "./components/GuessInput";
import GuessHistoryFeed from "./components/GuessHistoryFeed";
import DifficultySelector from "./components/DifficultySelector";
import SubmitScoreForm from "./components/SubmitScoreForm";
import ScoreBoard from "./components/ScoreBoard";
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
    setCurrentGuess([]);
    setScore(0);
    setDifficulty('easy');
    setInitialGuesses(10);
    setRemainingGuesses(10);
    setGuessHistory([]);
    setSubmitModalVisible(false);
    getScores();
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
    console.log(randomSequence);
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

  const handleSubmitScore = async (username) => {
    axios.post(`http://localhost:3001/scoreboard`, {
      username: username,
      score: score,
      difficulty: difficulty,
    });
    resetGame();
  };

  return (
    <div
    className="container"
      tabIndex="5"
      ref={targetRef}
      onKeyDown={
        submitModalVisible
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
        <label htmlFor="scorboardCheck">{scoreBoardVisible ? "Hide" : "Show"} Scoreboard</label>
      </div>
      <hr />
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
  );
};

export default App;
