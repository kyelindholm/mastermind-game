const DifficultySelector = ({handleChangeDifficulty}) => {
  return (
    <div className="selector">
    <label className="selectorLabel" htmlFor="difficulties">Select a diffculty:</label>
    <select name="difficulties" onChange={(e) => handleChangeDifficulty(e)}>
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
      <option value="insane">Insane</option>
    </select>
  </div>
  )
}

export default DifficultySelector;