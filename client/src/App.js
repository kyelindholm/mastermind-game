import GuessContainer from "./components/GuessContainer";
import GuessInput from "./components/GuessInput";

function App() {
  return (
    <div>
      <h1>MASTERMIND</h1>
      <hr/>
      <div className="gameBoard">
        <GuessContainer />
        <GuessInput/>
      </div>

    </div>
  );
}

export default App;
