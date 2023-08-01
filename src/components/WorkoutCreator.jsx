//should contain an input for workout name and an array of ExerciseCreator
//that changes size depending on buttonClick event
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import ExerciseCreator from './ExerciseCreator.jsx';
import { addWorkout } from '../workoutSlice.js';
import { useNavigate } from "react-router-dom";


const WorkoutCreator = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //Local state for managing dynamic exercise creation
    const [exercises, setExercises] = useState([]);

    /** handling of adding exercises dynamically:
     *      local state is changed by spreading previous state into a new array
     *      and adding an empty object that will be manipulated by user
     */
    const handleAddExercises = () => {
        setExercises((prevExercises) => [...prevExercises, {
            exerciseName: '', 
            reps: 0, 
            sets: 0
        }]);
    }

    /** handling of changing of exercises dynamically:
     *      local state is changed by assigning a variable to a copy of state
     *      and changes based on the index the function is being called.
     *      NOTE: this is being prop-drilled into each exerciseCreator component
     */
    const handleChangeExercise = (index, update) => {
        setExercises((prevExercises) => {
            const updatedExercises = [...prevExercises];
            updatedExercises[index] = update;
            return updatedExercises;
        })
    }

    /** handling of submitting workout once creation is completed:
     *      utilizing dispatch hook to send exercise state to workoutSlice with the
     *      addWorkout reducer being imported in. Local state is then cleared out and
     *      workoutName input field is cleared.
     */
    const handleWorkoutDispatch = (workoutName) => {
        dispatch(addWorkout({ [workoutName]: exercises }));
        setExercises([]);
        document.querySelector('#workoutName').value = '';
    }

    //workout input: dropdown or user input?
    return (
        <div id='workoutContainer'>
            <input type='text' placeholder='workout name...' id='workoutName'/> 
            {exercises.map((exercise, index) => <ExerciseCreator key={index} data={exercise} onChangeFunc={(updatedExercise) => handleChangeExercise(index, updatedExercise)}/>)}
            <button id='addExerciseBtn' onClick={handleAddExercises}><strong>+</strong></button>
            <button id='saveWorkoutBtn' onClick={() => {
                handleWorkoutDispatch(document.querySelector('#workoutName').value);
                navigate('/Home');
        }}><strong>save</strong></button>
        </div>
    );
};

export default WorkoutCreator;