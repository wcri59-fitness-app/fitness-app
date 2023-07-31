import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    totalWorkouts: [],
    currentWorkout: {}
};

export const workoutSlice = createSlice({
    name: 'workout',
    initialState,
    reducers: {
      addWorkout: (state, action) => {
        /* update the current workout to the newly created workout */
        state.currentWorkout = action.payload;

        /** make a fetch post request to db with action payload */
        // fetch('someroute', {
        //     method: 'POST',
        //     headers: { 'content-type': 'Application/JSON' },
        //     body: JSON.stringify(action.payload)
        // })
        // .then(res => res.json())
        // .then(data => {
        //     state.totalWorkouts.push(data);
        // })
        // .catch(err => console.log('AddWorkout fetch /someroute/: ERROR: ', err));
      },
      deleteWorkout: (state, action) => {
        /* action contains workoutId that gets sent to database for deletion */
        // fetch('someroute', {
        //     method: 'DELETE',
        //     headers: { 'content-type': 'Application/JSON' },
        //     body: JSON.stringify(action.payload)
        // })
        // .then(res => res.json())
        // .then(data => console.log(data))
        // .catch(err => console.log('DeleteCharacter fetch /someroute/: ERROR: ', err));
      },
      deleteExercise: (state) => {

      },
      //If There is time to implement 
      // updateWorkout: (state) => {

      // },
      // updateExercise: (state) => {

      // }
    }
});

//export workout.slice actions here
export const { addWorkout, deleteWorkout } = workoutSlice.actions;