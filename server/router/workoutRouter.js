const express = require ("express");
const path = require ("path");
const router = express.Router();
const db = require ('../models/TaskModel');

// currently have 5 tables
// Table 1. (Users table) Columns => user_id, username, password
// Table 2. (Workouts table) Columns => workout_id, user_id, workout_date
// Table 3. (SetAndReps table) Columns => SAR_id, sets, reps
// Table 4. (Exercises table) Columns => exercise_id, exercise
// Table 5. (WorkoutExercise Table) Columns => workout_id, exercise_id, SAR_id, weight_used
// The workout we create on the front end will have a unique id so we can connect multiple exercises to it. each exercise can have a unique amount of set and rep.
// users are connected to the workouts on th eworkout table.
// just need to know how the data is sent to backend so that way we can send it to db and send to front end

router.get("/", async (req, res, next) => {
    // testing to see if the db connects
    // const test = await db.query('SELECT * FROM Workouts');
    try {
        const {user_id} = req.params;
        const exercises = await db.query(`SELECT user_id, Workouts.workout_id FROM Workouts LEFT JOIN WorkoutExercise ON Workouts.workout_id = WorkoutExercise.workout_id WHERE Workouts.workout_id = ${user_id}`);
        res.status(200).json(exercises.rows);
    }
    catch (error) {
        return next({
            log: "error with workoutRouter",
            message: {err:"Query Failed"}
        })
    }
})

// we would need to match the user_id to workout, how would we get the user_id during their session?
// authentication?
// store cookie after login?

// needs to have a defined endpoint otherwise app crashes
// router.post()
router.post("/add", async (req, res, next) => {
    try {
        const currentDate = new Date().toISOString().split('T')[0];
        const workoutQuery = "INSERT INTO Workouts (user_id, workout_date) VALUES ($1, $2)";
        const workoutValues = [userId, currentDate];
        const workoutResult = await db.query(workoutQuery, workoutValues);

        const {sets, reps} = req.body;
        const SARQuery = "INSERT INTO SetAndReps (Sets, reps) values ($1, $2)";
        const SARResult = await db.query(SARQuery, [sets, reps]);

        const {exercise} = req.body;
        const ExerciseQuery = `INSERT INTO Exercises (exercise) values (${exercise})`;
        const ExerciseResult = await db.query(ExerciseQuery);

        const { workout_id, exercise_id, SAR_id, weight_used } = req.body;
        const workoutExerciseQuery = `INSERT INTO WorkoutExercise (workout_id, exercise_id, SAR_id, weight_used) values (${workout_id, exercise_id, SAR_id, weight_used})`
        const workoutExerciseResult = await db.query(workoutExerciseQuery)
        
       return next();
    } catch (error) {
        return next({
            log: "error with workoutRouter",
            message: {err:"Query Failed"}
        })
    }
})

module.exports = router; 