import React, { useState } from 'react';
import './Button.css';

const Button = ({ printedSong, currentSong, onClick }) => {

    const [hasBeenClicked, makeButtonClicked] = useState(false);

    const isCorrect = printedSong === currentSong;

    const onClickHandler = () => {

        makeButtonClicked(true);

        onClick();
    };

    let colorClass = 'colorClass';


    if (isCorrect === true) {
        colorClass = 'green';
    }

    if (isCorrect === false && hasBeenClicked === true) {
        colorClass = 'red';
    }

    if (isCorrect === false && hasBeenClicked === false) {
        colorClass = 'gray';
    }

    return (
        <button
            type="button"
            onClick={onClickHandler}
            className={`myButton button ${colorClass}`}
        >
            {printedSong}
        </button>
    );
};


export default Button;
