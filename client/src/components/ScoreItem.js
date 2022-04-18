const ScoreItem = ({username, score, difficulty}) => {
  return (
    <div className="scoreItem">
      <div>{username}: {score} ({difficulty[0].toUpperCase() + difficulty.slice(1)})</div>
    </div>
  )

}

export default ScoreItem;