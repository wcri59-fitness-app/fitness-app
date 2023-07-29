const express = require ("express");
const path = require ("path");
const router = express.Router();

// currently have 5 tables
// Table 1. (Users table) Columns => user_id, username, password
// Table 2. (Workouts table) Columns => workout_id, user_id, workout_date
// Table 3. (SetAndReps table) Columns => SAR_id, sets, reps
// Table 4. (Exercises table) Columns => exercise_id, exercise
// Table 5. (WorkoutExercise Table) Columns => workout_id, exercise_id, SAR_id, weight_used
// The workout we create on the front end will have a unique id so we can connect multiple exercises to it. each exercise can have a unique amount of set and rep.
// users are connected to the workouts on th eworkout table.


router.get("/", (req,res) => {
    res.status(200).json()
})

module.exports = router; 