import React from 'react';
import './Button.css';

const Button = (props) => {

    const isCorrect = props.printedSong === props.currentSong;

    return (
        <button 
            onClick={props.onClick} 
            className={"myButton button " + (isCorrect ? "green" : "red")}>
                {props.printedSong}
        </button>
    )
};


export default Button;