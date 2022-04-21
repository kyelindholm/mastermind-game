import { useState } from 'react';

const LoginForm = ({handleLogin, handleCreateAccount, statusMessage, handleUsernameError}) => {
  const [displayLogin, toggleDisplayLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form className="loginForm" onSubmit={ displayLogin ? (e) => {handleLogin({username: username, password: password}, e)} : (e) => {
      if (username.toLowerCase() === "guest") {
        handleUsernameError(e);
      } else {
        handleCreateAccount(e, {username: username, password: password});
      }
      }}>
      <div className="statusMessage">{statusMessage}</div>
      <h2>{displayLogin ? "SIGN IN" : "CREATE ACCOUNT"}</h2>
      <div className="toggleForm" onClick={() => {toggleDisplayLogin(!displayLogin)}}>{displayLogin ? "I need to make an account!" : "I already have an account!" }</div>
      <label htmlFor="username" className="loginComponent">Username:</label>
      <input type="text" name="username" onChange={(e) => {setUsername(e.target.value)}} required/>
      <label htmlFor="password" className="loginComponent">Password:</label>
      <input type="password" name="password" onChange={(e) => {setPassword(e.target.value)}} required/>
      <input type="submit" value={displayLogin ? "Login" : "Create Account"} className="loginComponent"/>
      <p>OR</p>
      <div className="guestSignIn" onClick={() => {handleLogin({username: "Guest"})}}>SIGN-IN AS GUEST</div>
  </form>
  )
}

export default LoginForm;