//should render a workout that exists within totalWorkout state array
import React from "react";
import { useDispatch } from "react-redux";
import { deleteWorkout } from "../workoutSlice";
let cards = []

function getName(id, userId){
  /* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //  This function expects to receive a workout ID.
  //  It will then make a request to the backend database and gather the workout name.
  //  It will then populate the workout card with the received name.
  */ /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // fetch('/getCard',{method:"POST", body: {/*INSERT SQL QUERY HERE USING ID*/}, headers:{"Content-Type": "application/json"}})
}
  
function displayInfo(array){
  /* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //  This function expects to receive a workout ID.
  //  It will then make a request to the backend database and gather the workout exercises.
  //  It will then construct them into an array, and then pass on the data to another function that will populate and generate the exercise description
  //  in the workout card.
  */ /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //const exerciseArr = [];
  // console.log(userId)
  let id="cardContainer"
  document.getElementById(id).style.display = 'flex';
  document.getElementById(id).innerHTML = 'Loading. . . '
  populateCard(array);
  return
}

function populateCard(array){
  /* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //  This function expects to receive an array
  //  It will then populate a div for each workout
  //  It will then store them in an array, and then return the array
  */ /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  document.getElementById('cardContainer').innerHTML = ''
  array.map((el) => {
    console.log(el)
      document.getElementById('cardContainer').innerHTML += 
      //this just adds an exercise element for each element. &nbsp; is just a way to hardcode spaces
`        <div class=exercise> <strong>${el.name.toUpperCase()}</strong> <div class=randp><div class=reps><strong>Reps</strong>: ${el.reps} </div><div>&nbsp;&nbsp;x&nbsp;&nbsp;</div><div class=sets><strong>Sets</strong>: ${el.sets}</div></div></div> `
    }
  )
}

function collapseCard(){
  document.getElementById('cardContainer').style.display = 'none';
}

const WorkoutCard = ({array, name}) => {
  const dispatch = useDispatch();
  const handleDelete = (name) => {
    dispatch(deleteWorkout(name));
  }

  return(
    <div className="workoutCard" id="cards" onMouseEnter={() => displayInfo(array)} onMouseLeave={() => collapseCard()}>
      <h1 className="cardName">{name}</h1>
      <div id="cardContainer">
      </div>
      <button id='deleteButton' onClick={handleDelete} />
    </div>
  )
}

export default WorkoutCard;