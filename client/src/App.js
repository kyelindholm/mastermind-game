import {useState, useEffect, useRef} from 'react';
import GuessContainer from "./components/GuessContainer";
import GuessInput from "./components/GuessInput";
import GuessHistoryFeed from "./components/GuessHistoryFeed";
import DifficultySelector from "./components/DifficultySelector";
import SubmitScoreForm from "./components/SubmitScoreForm";
import {correctNumberCorrectIdx, correctNumberGuess} from './helpers/checkArrays';
import axios from 'axios';

const App = () => {
  const [randomSequence, setRandomSequence] = useState([]);
  const [currentGuess, setCurrentGuess] = useState([]);
  const [remainingGuesses, setRemainingGuesses] = useState(10);
  const [guessHistory, setGuessHistory] = useState([]);
  const [difficulty, setDifficulty] = useState('easy');
  const didMountRef = useRef(false);
  const targetRef = useRef(null);

  useEffect(() => {
    if (!didMountRef.current) {
      targetRef.current.focus();
      didMountRef.current = true;
    } else {
      getRandomNumbers();
    }
  }, [])

  const getRandomNumbers = async () => {
    const numberSequence = await axios.get('http://localhost:3001/randomnums');
    setRandomSequence(numberSequence.data);
  }

  const handleChangeGuess = (guessNum) => {
    if (currentGuess.length < 4) {
      setCurrentGuess([...currentGuess, Number(guessNum)]);
    }
  }

  const handleBackspace = () => {
    setCurrentGuess(currentGuess.slice(0, currentGuess.length - 1));
  }

  const handleChangeDifficulty = (event) => {
    resetGame();
    if (event.target.value === "hard") {
      setRemainingGuesses(5);
    }
    if (event.target.value === "easy" || event.target.value === "medium") {
      setRemainingGuesses(10);
    }
    setDifficulty(event.target.value);
  }

  const resetGame = () => {
    setCurrentGuess([]);
    setRemainingGuesses(10);
    setGuessHistory([]);
    getRandomNumbers();
  }

  const handleSubtractRemainingGuesses = (feedbackMessage) => {
    if (remainingGuesses <= 1) {
      alert('You lose! Then number was ' + randomSequence.join('') + '!');
      resetGame();
    } else {
      setGuessHistory([...guessHistory, { guess: currentGuess, feedbackMessage: feedbackMessage}]);
      setRemainingGuesses(remainingGuesses - 1);
      setCurrentGuess([]);
    }
  }

  const handleSubmitGuess = () => {
    if (difficulty === "easy") {
      if (currentGuess.join('') === randomSequence.join('')) {
        alert('You win! Play again?');
        resetGame();
      } else if (correctNumberCorrectIdx(currentGuess, randomSequence) !== false) {
        handleSubtractRemainingGuesses(`The number ${correctNumberCorrectIdx(currentGuess, randomSequence)} is in its correct place!`);
      } else if (correctNumberGuess(currentGuess, randomSequence) !== false) {
        handleSubtractRemainingGuesses(`The number ${correctNumberGuess(currentGuess, randomSequence)} is in the hidden sequence, but in a different position!`);
      } else {
        handleSubtractRemainingGuesses('No correct numbers! Try again!');
      }
    } else {
      if (currentGuess.join('') === randomSequence.join('')) {
        alert('You win! Play again?');
        resetGame();
      } else if (correctNumberCorrectIdx(currentGuess, randomSequence) !== false) {
        handleSubtractRemainingGuesses('You\'ve guessed a correct number in its correct place!');
      } else if (correctNumberGuess(currentGuess, randomSequence) !== false) {
        handleSubtractRemainingGuesses('You\'ve guessed at least one correct number!');
      } else {
        handleSubtractRemainingGuesses('No correct numbers! Try again!');
      }
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === "Backspace") {
      handleBackspace();
    } else if (event.keyCode >= 48 && event.keyCode <= 55) {
      handleChangeGuess(Number(event.key));
    } else if (event.key === "Enter" && currentGuess.length === 4) {
      handleSubmitGuess();
    }
  }


  return (
    <div tabIndex="5" ref={targetRef} onKeyDown={(e) => {handleKeyPress(e)}}>
      <h1>MASTERMIND</h1>
      <DifficultySelector handleChangeDifficulty={handleChangeDifficulty}/>
      <h2>{remainingGuesses} guesses left!</h2>
      <hr/>
      <GuessHistoryFeed guessHistory={guessHistory}/>
      <div className="gameBoard">
        <GuessContainer currentGuess={currentGuess}/>
        <GuessInput handleChangeGuess={handleChangeGuess} handleBackspace={handleBackspace}/>
        <div className="submitGuess" style={currentGuess.length === 4 ? {visibility: "visible"} : {visibility: "hidden"}} onClick={handleSubmitGuess}>GUESS</div>
      </div>
    </div>
  );
}

export default App;
