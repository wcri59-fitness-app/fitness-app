import React from "react";
import WorkoutCard from "./WorkoutCard";
import { useDispatch } from "react-redux";
import { loadWorkouts } from "../workoutSlice";
import { useNavigate } from "react-router-dom";

const Home = ({ userId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function getData(userId){
    const data = fetch('/workout', {method:"GET", params:{user_id: userId}})
    .then((resp) => {
      resp.json()
      .then((result) => {
        console.log(result)
        return result
      })
    })
  }
  
  const workouts = getData(userId);
  dispatch(loadWorkouts(workouts));

  const cards = [];
  for(const [key, value] of Object.entries(workouts)) {
    cards.push(<WorkoutCard array={value} name={key}/>)
  }

  return (
    <div id="homePage">
      {cards}
      <button id="addButton" onClick={() => navigate("/WorkoutCreator")} />
    </div>
  )
}

export default Home;

/** FOR REFERENCE */
// const {userId} = props;
// const cards = [];
// const data = getData(userId);
// data.forEach(el => {
//   cards.push(<WorkoutCard array={el} index = {data.indexOf(el)}/>)
// });