const GuessContainer = ({currentGuess}) => {
  return (
    <div>
      {[...Array(4)].map((x, i) => (
        <div className="square" key={i} style={currentGuess[i] || currentGuess[i] === 0 ? {border: "2px solid lightgrey"} : {border: "2px solid grey"}}>{currentGuess[i]}</div>
      ))}
    </div>
  );
};

export default GuessContainer;
