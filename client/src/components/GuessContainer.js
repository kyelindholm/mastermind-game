const GuessContainer = ({currentGuess}) => {
  return (
    <div>
      {[...Array(4)].map((x, i) => (
        <div className="square" key={i} style={currentGuess[i] ? {border: "2px solid lightgrey"} : {border: "2px solid grey"}}>{currentGuess[i]}</div>
      ))}
    </div>
  );
};

export default GuessContainer;
