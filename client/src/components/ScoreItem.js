const ScoreItem = ({username, score, difficulty}) => {
  return (
    <div className="scoreItem">
      <div>{username}</div>
      <div>{score}</div>
      <div>Level: {difficulty}</div>
    </div>
  )

}

export default ScoreItem;