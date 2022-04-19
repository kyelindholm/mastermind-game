import ScoreItem from "./ScoreItem";

const ScoreBoard = ({topScores, visible}) => {
  return (
    <div className="scoreBoard" style={visible ? {visibility: "visible"} : {visibility: "hidden"}}>
      <h2>TOP 5</h2>
      {topScores.map((score) => {
        return (
          <ScoreItem key={score.id} username={score.username} score={score.score} difficulty={score.difficulty}/>
        )
      })}
    </div>
  )
}

export default ScoreBoard;