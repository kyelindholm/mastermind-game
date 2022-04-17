import ScoreItem from "./ScoreItem";

const ScoreBoard = ({topScores}) => {
  return (
    <div className="scoreBoard">
      {topScores.map((score) => {
        return (
          <ScoreItem key={score.id} username={score.username} score={score.score} difficulty={score.difficulty}/>
        )
      })}
    </div>
  )
}

export default ScoreBoard;