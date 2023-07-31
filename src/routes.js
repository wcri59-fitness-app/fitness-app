import React from 'react';
import { Router, Route } from 'react-router';
import WorkoutCard from './components/WorkoutCard.js';
import App from './components/App.js';
import Home from './components/homePage.jsx';
import WorkoutCreator from './components/WorkoutCreator.jsx';
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
const NewRoutes = [
  <Route index element={<App/>}/>,
  <Route path='/Home' element={<Home userId = {getCookie('userID')}/>}/>,
  <Route path='/CreateWorkout' element={<WorkoutCreator/>}/>,
]

export default NewRoutes;