import React from 'react';
import './ButtonIgTags.css';

const ButtonIG = (props) => {

    function checkRightOrWrong (event) {
        if (props.value === props.currentLocation) {
            props.addToCounter();
        }
        
        props.setRandomImageAndTags();
        
    }

    return (
        <button className="instagram-game-button" onClick={()=> checkRightOrWrong()}>
            {props.value}
        </button>
    )
};

export default ButtonIG;