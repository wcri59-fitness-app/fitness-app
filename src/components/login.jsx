import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
  function loginReq(e){
    if(e.key === 'Enter'){
      if(document.getElementById("username").value !== null && document.getElementById("password").value !== null){
        fetch('/login', {method:"GET", params:{username:document.getElementById("username").value, password:document.getElementById('password').value}})
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
        <div id="loginHeader"><strong>Login</strong></div>
        <p>Username:</p>
        <input type="text" id="username" onKeyDown={(e) => loginReq(e)}/>
        <p>Password:</p>
        <input type="password" id="password" onKeyDown={(e) => loginReq(e)}/>
        <div className="buttons">
        <button className="signUp" onClick={() => navigate('/Signup')}>Sign Up</button>
        <button className="submit" onClick={(e) => loginReq(e)}>Submit</button>
      </div>
      </div>
    </div>
  )
}

export default Login;