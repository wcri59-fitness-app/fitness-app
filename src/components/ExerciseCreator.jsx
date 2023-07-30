//should render an input box for exercise name and input for reps and sets
import { useDispatch } from 'react-redux';
import React from 'react';
// import { some reducer? } from '../workoutSlice';

const ExerciseCreator = ({ data, onChangeFunc }) => {
    const dispatch = useDispatch();

    //handle state onChanges
    const handleNameChange = (e) => {
        const exerciseName = e.target.value;
        onChangeFunc({...data, exerciseName: exerciseName});
    };

    const handleRepsChange = (e) => {
        const repsAmount = e.target.value;
        onChangeFunc({...data, reps: repsAmount});
    };

    const handleSetsChange = (e) => {
        const setsAmount = e.target.value;
        onChangeFunc({...data, sets: setsAmount});
    };

    return (
        <div id='exerciseContainer'>
            <input type ='text' id='exerciseName' placeholder='exercise name...' onChange={handleNameChange}/>
            <div id='RASContainer'>
                <input text='number' id='reps' step={1} min={1} max={20} onChange={handleRepsChange}/>
                <div><strong>X</strong></div>
                <input text='number' id='sets' step={1} min={1} max={10} onChange={handleSetsChange}/>
            </div>
        </div>
    );
};

export default ExerciseCreator;