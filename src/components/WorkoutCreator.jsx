//should contain an input for workout name and an array of ExerciseCreator
//that changes size depending on buttonClick event
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { ExerciseCreator } from './ExerciseCreator';

const WorkoutCreator = () => {
    const dispatch = useDispatch();
    const [exercises, setExercises] = useState([]);

    const handleAddExercises = () => {
        setExercises((prevExercises) => [...prevExercises, {
            exerciseName: '', 
            reps: 0, 
            sets: 0
        }]);
    }

    const handleChangeExercise = (index, update) => {
        setExercises((prevExercises) => {
            const updatedExercises = [...prevExercises];
            updatedExercises[index] = update;
            return updatedExercises;
        })
    }

    const handleWorkoutDispatch = () => {
        dispatch(addWorkout({ exercises }));
        setExercises([]);
    }

    //workout input: dropdown or user input?
    return (
        <div id='workoutContainer'>
            <input type='text' placeholder='workout name...' id='workoutName'/> 
            {exercises.map((exercise, index) => <ExerciseCreator key={index} data={exercise} onChangeFunc={(updatedExercise) => handleChangeExercise(index, updatedExercise)}/>)}
            <button id='addExerciseBtn' onClick={handleAddExercises}><strong>+</strong></button>
            <button id='saveWorkoutBtn' onClick={handleWorkoutDispatch}><strong>save</strong></button>
        </div>
    )
}

export default WorkoutCreator;