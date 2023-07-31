import React from "react";
import WorkoutCard from "./WorkoutCard";
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
const Home = (props) => {
  const {userId} = props;
  const cards = [];
  const data = getData(userId);
  data.forEach(el => {
    cards.push(<WorkoutCard array={el} index = {data.indexOf(el)}/>)
  });
  return (
    <div id="homePage">
      {cards}
    </div>
  )
}

export default Home;