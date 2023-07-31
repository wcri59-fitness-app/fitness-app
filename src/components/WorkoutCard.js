//should render a workout that exists within totalWorkout state array
import React from "react";
let cards = []

function getName(id, userId){
  /* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //  This function expects to receive a workout ID.
  //  It will then make a request to the backend database and gather the workout name.
  //  It will then populate the workout card with the received name.
  */ /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // fetch('/getCard',{method:"POST", body: {/*INSERT SQL QUERY HERE USING ID*/}, headers:{"Content-Type": "application/json"}})
}
  
function displayInfo(userId, array){
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
  // exerciseData = populateCard(exerciseArr)
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
`        <div class=exercise> <strong>${el.name.toUpperCase()}</strong> <div class=randp><div class=reps><strong>Reps</strong>: ${el.reps} </div><div>&nbsp;&nbsp;x&nbsp;&nbsp;</div><div class=sets><strong>Sets</strong>: ${el.sets}</div></div></div> `
    }
  )
}

function collapseCard(){
  document.getElementById('cardContainer').style.display = 'none';
}

const WorkoutCard = (array) => {
  let exerciseData;
  array = [{name: 'pushup',reps: 20,sets: 3},{name: 'pullup', reps:5, sets:3},{name:"situps", reps:40, sets:3}]
//placeholder workout name
const workoutName = "Simple"
// const cardId = `card${id}`
  return(
    <div className="workoutCard" id="cards" onMouseEnter={() => displayInfo('cards', array)} onMouseLeave={() => collapseCard()}>
      <h1 className="cardName">{workoutName}</h1>
      <div id="cardContainer" onClick={() => console.log(cards)}>
      </div>
    </div>
  )
}

export default WorkoutCard;