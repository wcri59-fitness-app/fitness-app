//should render an input box for exercise name and input for reps and sets
import React from 'react';
// import { some reducer? } from '../workoutSlice';

const ExerciseCreator = ({ data, onChangeFunc }) => {
    /** all state change handlers below utilize the prop-drilled handleChangeExercise function */
    
    //state change handler for current exercise name
    const handleNameChange = (e) => {
        const exerciseName = e.target.value;
        onChangeFunc({...data, exerciseName: exerciseName});
    };
    //state change handler for current reps amount
    const handleRepsChange = (e) => {
        const repsAmount = e.target.value;
        onChangeFunc({...data, reps: repsAmount});
    };
    //state change handler for current sets amount
    const handleSetsChange = (e) => {
        const setsAmount = e.target.value;
        onChangeFunc({...data, sets: setsAmount});
    };

    return (
        <div id='exerciseContainer'>
            <input type ='text' id='exerciseName' placeholder='exercise...' onChange={handleNameChange}/>
            <div id='RASContainer'>
                <input text='number' id='reps' placeholder='reps' step={1} min={1} max={20} onChange={handleRepsChange}/>
                <div><strong>X</strong></div>
                <input text='number' id='sets' placeholder='sets' step={1} min={1} max={10} onChange={handleSetsChange}/>
            </div>
        </div>
    );
};

export default ExerciseCreator;