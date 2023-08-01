//should render a workout that exists within totalWorkout state array
import React from "react";
import { useDispatch } from "react-redux";
import { deleteWorkout } from "../workoutSlice";
let cards = []

  
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
  // document.getElementById(id).style.display = 'flex';
  // document.getElementById(id).innerHTML = 'Loading. . . '
  populateCard(array);
  return
}

function populateCard(array){
  /* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //  This function expects to receive an array
  //  It will then populate a div for each workout
  //  It will then store them in an array, and then return the array
  */ /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //this just adds an exercise element for each element. &nbsp; is just a way to hardcode spaces
      array.forEach(el => {
        cards.push(<div class='exercise'> <strong>{el.exercise.toUpperCase()}</strong> <div class='randp'><div class='reps'><strong>Reps</strong>: {el.reps} </div><div>&nbsp;&nbsp;x&nbsp;&nbsp;</div><div class='sets'><strong>Sets</strong>: {el.sets}</div></div></div> )
      })
}

// function collapseCard(){
//   document.getElementById('cardContainer').style.display = 'none';
// }

const WorkoutCard = ({array, name}) => {
  const dispatch = useDispatch();
  const handleDelete = (name) => {
    dispatch(deleteWorkout(name));
  }
  populateCard(array)
  return(
    <div className="workoutCard" id="cards">
      <h1 className="cardName">{name}</h1>
      <div id="cardContainer">
        {cards}
      </div>
      {/* <button id='deleteButton' onClick={handleDelete} /> */}
    </div>
  )
}

export default WorkoutCard;