import React from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate()
  function signupReq(e){
    if(e.key === 'Enter' || undefined){
      console.log('entered')
      if(document.getElementById("username").value !== null && document.getElementById("password").value !== null){
        fetch('/signup', {method:"POST", body:{username:document.getElementById("username").value, password:document.getElementById('password').value}})
        .then((response) => {
          response.json()
          .then((result) => {
            document.getElementById("username").value=null
            document.getElementById("password").value=null
            console.log(result)
          })
        })
      }
    }
  }
  return (
    <div id="login">
      <div id="loginForm">
        <div id="loginHeader"><strong>Signup</strong></div>
        <p>Username:</p>
        <input type="text" id="username" onKeyDown={(e) => {signupReq(e)}}/>
        <p>Password:</p>
        <input type="password" id="password" onKeyDown={(e) => {signupReq(e)}}/>
        <div className="buttons">
        <button className="cancel" onClick={() => navigate('/Login')}>Cancel</button>
        <button className="submit" onClick={(e) => signupReq({key: 'Enter'})}>Submit</button>
      </div>
      </div>
    </div>
  )
}

export default Signup;