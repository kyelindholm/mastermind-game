import { useState } from 'react';

const LoginForm = ({handleLogin, handleCreateAccount, statusMessage}) => {
  const [displayLogin, toggleDisplayLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form className="loginForm" onSubmit={ displayLogin ? (e) => {handleLogin(e, {username: username, password: password})} : (e) => {handleCreateAccount(e, {username: username, password: password});}}>
      <div className="statusMessage">{statusMessage}</div>
      <h2>{displayLogin ? "SIGN IN" : "CREATE ACCOUNT"}</h2>
      <div className="toggleForm" onClick={() => {toggleDisplayLogin(!displayLogin)}}>{displayLogin ? "I need to make an account!" : "I already have an account!" }</div>
      <label htmlFor="username" className="loginComponent">Username:</label>
      <input type="text" name="username" onChange={(e) => {setUsername(e.target.value)}} required/>
      <label htmlFor="password" className="loginComponent">Password:</label>
      <input type="password" name="password" onChange={(e) => {setPassword(e.target.value)}} required/>
      <input type="submit" value={displayLogin ? "Login" : "Create Account"} className="loginComponent"/>
  </form>
  )
}

export default LoginForm;