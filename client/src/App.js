import {useState, useEffect, useRef} from 'react';
import GuessContainer from "./components/GuessContainer";
import GuessInput from "./components/GuessInput";
import GuessHistoryFeed from "./components/GuessHistoryFeed";
import {correctNumberCorrectIdx, correctNumberGuess} from './helpers/checkArrays';
import axios from 'axios';

function App() {
  const [randomSequence, setRandomSequence] = useState([]);
  const [currentGuess, setCurrentGuess] = useState([]);
  const [remainingGuesses, setRemainingGuesses] = useState(10);
  const [guessHistory, setGuessHistory] = useState([]);
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

  const resetGame = () => {
    setCurrentGuess([]);
    setRemainingGuesses(10);
    setGuessHistory([]);
    getRandomNumbers();
  }

  const handleSubtractRemainingGuesses = () => {
    if (remainingGuesses <= 1) {
      alert('You lose! Then number was ' + randomSequence.join('') + '!');
      resetGame();
    } else {
      setRemainingGuesses(remainingGuesses - 1);
      setCurrentGuess([]);
    }

  }

  const handleSubmitGuess = () => {
    if (currentGuess.join('') === randomSequence.join('')) {
      alert('You win! Play again?');
      resetGame();
    } else if (correctNumberCorrectIdx(currentGuess, randomSequence)) {
      setGuessHistory([...guessHistory, { guess: currentGuess, feedbackMessage: 'You\'ve guessed a correct number in its correct place!'}]);
      handleSubtractRemainingGuesses();
    } else if (correctNumberGuess(currentGuess, randomSequence)) {
      setGuessHistory([...guessHistory, { guess: currentGuess, feedbackMessage: 'You\'ve guessed at least one correct number!'}]);
      handleSubtractRemainingGuesses();
    } else {
      setGuessHistory([...guessHistory, { guess: currentGuess, feedbackMessage: 'No correct numbers! Try again!'}]);
      handleSubtractRemainingGuesses();
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
