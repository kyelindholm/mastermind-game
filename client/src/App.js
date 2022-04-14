import {useState, useEffect, useRef} from 'react';
import GuessContainer from "./components/GuessContainer";
import GuessInput from "./components/GuessInput";
import axios from 'axios';

function App() {
  const [randomSequence, setRandomSequence] = useState([]);
  const [currentGuess, setCurrentGuess] = useState([]);
  const didMountRef = useRef(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const getRandomNumbers = async () => {
      const numberSequence = await axios.get('http://localhost:3001/randomnums');
      setRandomSequence(numberSequence.data);
    }

    if (!didMountRef.current) {
      targetRef.current.focus();
      didMountRef.current = true;
    } else {
      getRandomNumbers();
    }
  }, [])

  const handleChangeGuess = (guessNum) => {
    if (currentGuess.length < 4) {
      setCurrentGuess([...currentGuess, Number(guessNum)]);
    }
  }

  const handleBackspace = () => {
    setCurrentGuess(currentGuess.slice(0, currentGuess.length - 1));
  }

  const handleKeyPress = (event) => {
    if (event.key === "Backspace") {
      handleBackspace();
    } else if (event.keyCode >= 48 && event.keyCode <= 55) {
      handleChangeGuess(Number(event.key));
    } else if (event.key === "Enter" && currentGuess.length === 4) {
      console.log('handle submit guess function goes here');
    }
  }


  return (
    <div tabIndex="5" ref={targetRef} onKeyDown={(e) => {handleKeyPress(e)}}>
      <h1>MASTERMIND</h1>
      <h1>{randomSequence}</h1>
      <hr/>
      <div className="gameBoard">
        <GuessContainer currentGuess={currentGuess}/>
        <GuessInput handleChangeGuess={handleChangeGuess} handleBackspace={handleBackspace}/>
        <div className="submitGuess" style={currentGuess.length === 4 ? {visibility: "visible"} : {visibility: "hidden"}}>GUESS</div>
      </div>
    </div>
  );
}

export default App;
