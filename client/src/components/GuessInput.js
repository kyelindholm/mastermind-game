const GuessInput = ({handleChangeGuess, handleBackspace}) => {
  return (
    <div>
      {[...Array(8)].map((x, i) => (
        <div className="numberInput" id={i} key={i} onClick={(e) => {handleChangeGuess(e.target.id)}}>{i}</div>
      ))}
      <div className="numberInput" onClick={() => handleBackspace()}>⌫</div>
    </div>
  );
};

export default GuessInput;
