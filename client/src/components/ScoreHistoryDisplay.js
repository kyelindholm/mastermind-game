const ScoreHistoryDisplay = ({scoreHistory, isVisible}) => {
  if (scoreHistory && scoreHistory.length > 0) {
    return (
      <div className="scoreHistory" style={isVisible ? {visibility: "visible"} : {visibility: "hidden"}}>
        MY SCORES:
        {scoreHistory.map((score) => {
          const displayDate = score.scoredate.slice(0, score.scoredate.indexOf("T"));
          return (
            <div className="scoreHistoryDisplay" key={score.id}>
              <hr/>
              <p>Score: {score.score}</p>
              <p>Difficulty: {score.difficulty}</p>
              <p>Date: {displayDate}</p>
            </div>
          )
        })}
      </div>
    )
  } else {
    return (
      <div className="scoreHistory" style={isVisible ? {visibility: "visible"} : {visibility: "hidden"}}>
        <div className="scoreHistoryError">Play more Mastermind to rack up some scores!</div>
      </div>
    )
  }
}

export default ScoreHistoryDisplay;