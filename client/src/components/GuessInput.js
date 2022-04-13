const GuessInput = () => {



  return (
    <div>
      {[...Array(8)].map((x, i) => (
        <div className="numberInput">{i}</div>
      ))}
    </div>
  );
};

export default GuessInput;
