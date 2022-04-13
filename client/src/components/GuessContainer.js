const GuessContainer = () => {
  return (
    <div>
      {[...Array(4)].map((x, i) => (
        <div className="square"/>
      ))}
    </div>
  );
};

export default GuessContainer;
