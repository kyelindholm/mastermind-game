import {useState} from 'react';
import GuessContainer from "./components/GuessContainer";
import GuessInput from "./components/GuessInput";

function App() {
  const [currentGuess, setCurrentGuess] = useState([]);

  const handleChangeGuess = (guessNum) => {
    if (currentGuess.length < 4) {
      setCurrentGuess([...currentGuess, guessNum]);
    }
  }

  const handleBackspace = () => {
    setCurrentGuess(currentGuess.slice(0, currentGuess.length - 1));
  }


  return (
    <div>
      <h1>MASTERMIND</h1>
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
