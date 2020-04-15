import React, {useState} from 'react';
import './Button.css'

const Button = (props) => {

    const [hasBeenClicked, makeButtonClicked] = useState(false)

    const isCorrect = props.printedSong === props.currentSong;

    const onClickHandler = () => {
        makeButtonClicked(true)

        props.onClick()
    }

    var colorClass = 'colorClass'
    
    if (isCorrect === true) {
        colorClass = "green"
    } else if (isCorrect === false && hasBeenClicked === true) {
        colorClass = "red"
    } else if (isCorrect === false && hasBeenClicked === false){ 
        colorClass = "gray"
    }

    return (
        <button 
            onClick={onClickHandler} 
            className={"myButton button " + colorClass}>
                {props.printedSong}
        </button>
    )
};


export default Button;