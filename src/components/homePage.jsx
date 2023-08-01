import React from "react";
import WorkoutCard from "./WorkoutCard";
import { useDispatch } from "react-redux";
import { loadWorkouts } from "../workoutSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Home = ({ userId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [cards, setCards] = useState([]);

  // function getData(userId){
  //   const data = fetch('/workout', {method:"GET", params:{user_id: userId}})
  //   .then((resp) => {
  //     resp.json()
  //     .then((result) => {
  //       // dispatch(loadWorkouts(workouts));
  //       // if(result !== undefined){
  //         const cache = {};
  //         // workouts is array type filled with objects
  //         for(const exerciseObj of result) {
  //           if(!cache[exerciseObj[workout_id]]) { // when you call workouts[workout_id] = 3
  //             cache[exerciseObj[workout_id]] = [];
  //           }
  //           cache[exerciseObj[workout_id]].push({
  //             exercise: exerciseObj[exercise],
  //             reps: exerciseObj[reps],
  //             sets: exerciseObj[sets]
  //           });
  //         }
          
  //         for(const [key, value] of Object.entries(cache)) {
  //           cards.push(<WorkoutCard array={value} name={key}/>);
  //           console.log('cards is', cards);
  //         }
  //       // }
  //       return result
  //     })
  //   })
  // }

  useEffect(async () => {
    const getData = async(userId) => {
      const response = await fetch('/workout', {method:"GET", params:{user_id: userId}});
      const data = response.json();
      return data
    }
    const data = await getData(userId);
    const cache = {};
      // workouts is array type filled with objects
      for(const exerciseObj of data) {
        if(!cache[exerciseObj.workout_id]) { // when you call workouts[workout_id] = 3
          cache[exerciseObj.workout_id] = [];
          // newCards.push({[exerciseObj[workout_id]]: {exercise: exerciseObj[exercise], reps: exerciseObj[reps], sets: exerciseObj[sets]}});
          // setCards(newCards);
        }
        cache[exerciseObj.workout_id].push({
          exercise: exerciseObj.exercise,
          reps: exerciseObj.reps,
          sets: exerciseObj.sets
        });
      }

      // make a copy of cards
      const newCards = [...cards];

      for(const [key, value] of Object.entries(cache)) {
        newCards.push(<WorkoutCard key = {key} array={value} name={key}/>);
      }
      // update state
      setCards(newCards);
  },[]);


  /**
   * [
   * {
   * workout_id: 6
   * workout_date: '2023-08-01',
    workout_name: 'workoutname',
    user_id: 6,
    username: 'username4',
    exercise: 'sdsdsd',
    reps: 3,
    sets: 4
  }
]
   * 
   * 
   * 
  */
  
  // const workouts = getData(userId);
  // console.log(workouts)
  // .then(() => {
  //   dispatch(loadWorkouts(workouts));
  //   console.log(workouts)
  //   if(workouts !== undefined){
  //     for(const [key, value] of Object.entries(workouts[0])) {
  //       console.log(key, value);
  //       cards.push(<WorkoutCard array={value} name={key}/>)
  //     }
  //   }
  // })
  // const cache = {};
  // // workouts is array type filled with objects
  // for(const exerciseObj of workouts) {
  //   if(!cache[exerciseObj[workout_id]]) { // when you call workouts[workout_id] = 3
  //     cache[exerciseObj[workout_id]] = [];
  //   }
  //   cache[exerciseObj[workout_id]].push({
  //     exercise: exerciseObj[exercise],
  //     reps: exerciseObj[reps],
  //     sets: exerciseObj[sets]
  //   });
  // }
  
  // for(const [key, value] of Object.entries(cache)) {
  //   cards.push(<WorkoutCard array={value} name={key}/>);
  //   console.log('cards is', cards);
  // }

  return (
    <div id="homePage">
          <div id="homeHeader"><h1>Home</h1></div>
      {cards}
      <button id="addButton" onClick={() => navigate("/CreateWorkout")} >ADD WORKOUT</button>
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

// import React, { useState, useEffect } from "react";
// import WorkoutCard from "./WorkoutCard";
// import { useDispatch } from "react-redux";
// import { loadWorkouts } from "../workoutSlice";
// import { useNavigate } from "react-router-dom";

// const Home = ({ userId }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [cards, setCards] = useState([]);
//   const [isMounted, setIsMounted] = useState(true);

//   useEffect(() => {
//     const getData = async (userId) => {
//       try {
//         const response = await fetch(`/workout?user_id=${userId}`, {
//           method: "GET",
//         });
//         const data = await response.json();
//         return data;
//       } catch (error) {
//         // Handle error if needed
//         console.error("Error fetching data:", error);
//         return [];
//       }
//     };

//     const fetchData = async () => {
//       const data = await getData(userId);

//       if (isMounted) {
//         const cache = {};
//         for (const exerciseObj of data) {
//           if (!cache[exerciseObj.workout_id]) {
//             cache[exerciseObj.workout_id] = [];
//           }
//           cache[exerciseObj.workout_id].push({
//             exercise: exerciseObj.exercise,
//             reps: exerciseObj.reps,
//             sets: exerciseObj.sets,
//           });
//         }

//         const newCards = Object.entries(cache).map(([key, value]) => (
//           <WorkoutCard key={key} array={value} name={key} />
//         ));

//         setCards(newCards);
//       }
//     };

//     fetchData();

//     return () => {
//       // This cleanup function will run when the component is unmounted
//       setIsMounted(false);
//     };
//   }, [userId, isMounted]);

//   return (
//     <div id="homePage">
//       <div id="homeHeader">
//         <h1>Home</h1>
//       </div>
//       {cards}
//       <button id="addButton" onClick={() => navigate("/CreateWorkout")}>
//         ADD WORKOUT
//       </button>
//     </div>
//   );
// };

// export default Home;
