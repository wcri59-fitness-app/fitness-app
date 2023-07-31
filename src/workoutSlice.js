import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    totalWorkouts: [],
    currentWorkout: {}
};

export const workoutSlice = createSlice({
    name: 'workout',
    initialState,
    reducers: {
      loadWorkouts: (state, action) => {
        /** updates totalWorkouts state that can be manipulated on front-end, editWorkout reducer will update db on any changes */
        state.totalWorkouts = action.payload;
      },
      addWorkout: (state, action) => {
        /* update the current workout to the newly created workout */
        state.currentWorkout = action.payload;

        /** make a fetch post request to db with action payload */
        fetch('/add', {
            method: 'POST',
            headers: { 'content-type': 'Application/JSON' },
            body: JSON.stringify(action.payload)
        })
        .then(res => res.json())
        .then(data => {
            // state.totalWorkouts = data;      expecting to receive back updated total workouts for rerender
            console.log(data)                   //otherwise, console.log res.status to ensure good request
        })
        .catch(err => console.log('AddWorkout fetch /someroute/: ERROR: ', err));
      },
      deleteWorkout: (state, action) => {
        /* action contains workoutId that gets sent to database for deletion */
        fetch('someroute', {
            method: 'DELETE',
            headers: { 'content-type': 'Application/JSON' },
            body: JSON.stringify(action.payload)
        })
        .then(res => res.json())
        .then(data => state.totalWorkouts = data)         //expecting to receive back updated total workouts for rerender
        .catch(err => console.log('DeleteCharacter fetch /someroute/: ERROR: ', err));
      },
      editWorkout: (state, action) => {
        /** STRETCH: This reducer should be invoked upon a save button click that submits all changes to the workout being edited */
      }
    }
});

//export workout.slice actions here
export const { addWorkout, deleteWorkout, loadWorkouts } = workoutSlice.actions;