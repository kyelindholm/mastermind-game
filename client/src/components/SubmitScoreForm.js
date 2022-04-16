import {useState} from 'react';

const SubmitScoreForm = ({closeForm, handleSubmitScore}) => {
  const [username, setUsername] = useState('');

  return (
    <form className="modalForm" onSubmit={(e) => {
      e.preventDefault();
      handleSubmitScore(username);
    }}>
      <p className="closeForm" onClick={closeForm}>x</p>
      <h2>YOU WIN!</h2>
      <h2>SUBMIT YOUR SCORE!</h2>
      <input type="text" placeholder="Username..." required onChange={(e) => {setUsername(e.target.value)}}/>
      <input type="submit"/>
    </form>
  )
}

export default SubmitScoreForm;