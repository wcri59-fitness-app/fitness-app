import React from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate()
  function signupReq(e){
    if(e.key === 'Enter'){
      const usernames = document.getElementById("usernamee").value;
      const passwords = document.getElementById("passwordd").value;
      if((usernames !== null) && (passwords !== null)){
        fetch('/signup', {method:"POST", body: JSON.stringify({username: usernames, password:passwords}), headers: {'Content-Type': "application/json"}})
            // document.getElementById("usernamee").value=null;
            // document.getElementById("passwordd").value=null;
            .then (() => navigate('/Login'));
        }
      }
    }
  return (
    <div id="login">
      <div id="loginForm">
        <div id="loginHeader"><strong>Signup</strong></div>
        <p>Username:</p>
        <input type="text" id="usernamee" onKeyDown={(e) => {signupReq(e)}}/>
        <p>Password:</p>
        <input type="password" id="passwordd" onKeyDown={(e) => {signupReq(e)}}/>
        <div className="buttons">
        <button className="cancel" onClick={() => navigate('/Login')}>Cancel</button>
        <button className="submit" onClick={() => signupReq({key: 'Enter'})}>Submit</button>
      </div>
      </div>
    </div>
  )
}

export default Signup;