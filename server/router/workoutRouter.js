const express = require ("express");
const path = require ("path");
const router = express.Router();
const db = require ('../models/TaskModel');

// currently have 5 tables
// Table 1. (Users table) Columns => user_id, username, password
// Table 2. (Workouts table) Columns => workout_id, user_id, workout_date, workout_name
// Table 3. (SetAndReps table) Columns => SAR_id, sets, reps
// Table 4. (Exercise table) Columns => exercise_id, exercise
// Table 5. (WorkoutExercise Table) Columns => workout_id, exercise_id, SAR_id, weight_used
// The workout we create on the front end will have a unique id so we can connect multiple exercises to it. each exercise can have a unique amount of set and rep.
// users are connected to the workouts on th eworkout table.
// just need to know how the data is sent to backend so that way we can send it to db and send to front end

router.get("/", async (req, res, next) => {
    // testing to see if the db connects
    // const test = await db.query('SELECT * FROM Workouts');
    try {
        // const {user_id} = req.params;
        const { userID } = req.cookies;
        // return res.status(200).json([]);
        const exercises = await db.query(`
            SELECT 
            we.workout_id,
            we.exercise_id,
            we.sar_id,
            we.weight_used,
            w.workout_date,
            w.workout_name, 
            u.user_id,
            u.username,
            e.exercise,
            ed.reps,
            ed.sets
            FROM WorkoutExercise AS we
            JOIN Workouts AS w ON we.workout_id = w.workout_id
            JOIN Users AS u ON w.user_id = u.user_id
            JOIN Exercise AS e ON we.exercise_id = e.exercise_id
            JOIN setandreps AS ed ON we.sar_id = ed.sar_id WHERE w.user_id = ${userID}`);
        // const exercises = await db.query('SELECT * FROM WorkoutExercise');
        res.status(200).json(exercises.rows); // .rows
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
        const { userID } = req.cookies;
        const addObj = req.body;

        console.log(userID, addObj);
        const workoutName = Object.keys(addObj)[0];

        const currentDate = new Date().toISOString().split('T')[0];
        const workoutQuery = "INSERT INTO Workouts (user_id, workout_date, workout_name) VALUES ($1, $2, $3) RETURNING workout_id";
        const workoutValues = [userID, currentDate, workoutName];
        const workoutResult = await db.query(workoutQuery, workoutValues);
        const workout_id = workoutResult.rows[0].workout_id;

        addObj[workoutName].forEach(async (exerciseObj) => {
            const { exerciseName, reps, sets } = exerciseObj;

            const SARQuery = "INSERT INTO SetAndReps (sets, reps) VALUES ($1, $2) RETURNING sar_id";
            const SARResult = await db.query(SARQuery, [sets, reps]);
            const sar_id = SARResult.rows[0].sar_id;

            const ExerciseQuery = `INSERT INTO Exercise (exercise) VALUES ($1) RETURNING exercise_id`;
            const ExerciseResult = await db.query(ExerciseQuery, [exerciseName]);
            const exercise_id = ExerciseResult.rows[0].exercise_id;

            const workoutExerciseQuery = `INSERT INTO WorkoutExercise (workout_id, exercise_id, sar_id) VALUES ($1, $2, $3)`;
            const workoutExerciseResult = await db.query(workoutExerciseQuery, [workout_id, exercise_id, sar_id]);
        });

        // console.log(workoutResult);

        // const {sets, reps} = req.body;
        // const SARQuery = "INSERT INTO SetAndReps (sets, reps) values ($1, $2)";
        // const SARResult = await db.query(SARQuery, [sets, reps]);
        // console.log(SARResult);

        // const {exercise} = req.body;
        // const ExerciseQuery = `INSERT INTO Exercise (exercise) values ($1)`;
        // const ExerciseResult = await db.query(ExerciseQuery, [exercise]);
        // console.log(ExerciseResult);

        // const { workout_id, exercise_id, sar_id, weight_used } = req.body;
        // const workoutExerciseQuery = `INSERT INTO WorkoutExercise (workout_id, exercise_id, sar_id, weight_used) VALUES ($1, $2, $3, $4)`;
        // const workoutExerciseResult = await db.query(workoutExerciseQuery, [workout_id, exercise_id, sar_id, weight_used]);
        // console.log(workoutExerciseResult);
        
        // res.redirect(200,'http://localhost:3000/Home');
        
       return next();
    } catch (error) {
        return next({
            log: "error with workoutRouter",
            message: {err:"Query Failed"}
        })
    }
})

router.delete("/delete", async (req, res, next) => {
    try {
        const {workout_id} = req.params;
        const deleteQueryWorkoutExercise = `DELETE FROM WorkoutExercise WHERE workout_id = ${workout_id}`; // removing workout from the workout table
        const deleteResultWorkoutExercise = await db.query(deleteQueryWorkoutExercise);
        const deleteQueryWorkouts = `DELETE FROM Workouts WHERE workout_id = ${workout_id}`; // removing workout from the workout table
        const deleteResultWorkouts = await db.query(deleteQueryWorkouts);
        const ret = deleteResultWorkouts.rows.concat(deleteResultWorkoutExercise.rows);
        res.status(200).json(ret);
        return next();
    } catch (error) {
        return next({
            log: "error with workoutRouter",
            message: {err:"Query Failed"}
        })
    }
})

// router.patch("/update", async (req, res, next) => {
//     try {
//         const {workout_id} = req.params;
//         const deleteQueryWorkouts = `DELETE FROM Workouts WHERE workout_id = ${workout_id}`; // removing workout from the workout table
//         const deleteResultWorkouts = await db.query(deleteQueryWorkouts);
//         const deleteQueryWorkoutExercise = `DELETE FROM WorkoutExercise WHERE workout_id = ${workout_id}`; // removing workout from the workout table
//         const deleteResultWorkoutExercise = await db.query(deleteQueryWorkoutExercise);
//         const ret = deleteResultWorkouts.rows.concat(deleteResultWorkoutExercise.rows);
//         res.status(200).json(ret);
//         return next();
//     } catch (error) {
//         return next({
//             log: "error with workoutRouter",
//             message: {err:"Query Failed"}
//         })
//     }
// })

module.exports = router; 