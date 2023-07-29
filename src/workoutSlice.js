import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    totalWorkouts: [],
    currentWorkout: []
};

export const workoutSlice = createSlice({
    name: 'workout',
    initialState,
    reducers: {
      addWorkout: (state) => {

      },
      deleteWorkout: (state) => {

      },
      addExercise: (state) => {

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
// export const { addWorkout, deleteWorkout, updateWorkout } = workoutSlice.actions;