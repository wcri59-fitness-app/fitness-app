import { configureStore } from "@reduxjs/toolkit";
import { workoutSlice } from "./workoutSlice";

const store = configureStore({
    reducer: {
        workout: workoutSlice.reducer
    }
});


export default store;