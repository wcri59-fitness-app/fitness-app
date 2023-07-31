import React from 'react';
import { Router, Route } from 'react-router';
import WorkoutCard from './components/WorkoutCard.js';
import App from './components/App.js';
import Home from './components/homePage.jsx';
import WorkoutCreator from './components/WorkoutCreator.jsx';
import Login from './components/login.jsx';
import Signup from './components/signup.jsx';
function getCookie(cName) {
  const name = cName + "=";
  const cDecoded = decodeURIComponent(document.cookie);
  const cArr = cDecoded.split('; ');
  let res;
  cArr.forEach(val => {
    if (val.indexOf(name) === 0) res = val.substring(name.length);
  })
  return res
}
function checklogin(){
  console.log('ran')
  if(getCookie('userId') !== undefined){
    return <Home userId = {getCookie('userID')}/>
  }
  else{
    return <Login/>
  }
}

const NewRoutes = [
  <Route index element={checklogin()}/>,
  <Route path='/Home' element={<Home userId = {getCookie('userID')}/>}/>,
  <Route path='/CreateWorkout' element={<WorkoutCreator/>}/>,
  <Route path='/Login' element={<Login/>}/>,
  <Route path='Signup' element={<Signup/>} />,
  <Route path='/' element={<Login/>}/>
]

export default NewRoutes;