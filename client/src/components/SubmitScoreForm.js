const SubmitScoreForm = ({closeForm, handleSubmitScore, score}) => {

  return (
    <form className="modalForm" onSubmit={(e) => {
      e.preventDefault();
      handleSubmitScore();
    }}>
      <p className="closeForm" onClick={closeForm}>x</p>
      <h2>YOU WIN!</h2>
      <h2>SUBMIT YOUR SCORE: {score}!</h2>
      <input type="submit"/>
    </form>
  )
}

export default SubmitScoreForm;