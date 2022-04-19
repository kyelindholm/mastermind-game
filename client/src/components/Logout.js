const Logout = ({username, handleLogout, visibility}) => {
  return (
    <div className="logout" onClick={handleLogout} style={{visibility: visibility}}>LOGGED IN AS "{username}". CLICK TO LOGOUT.</div>
  )
}

export default Logout;