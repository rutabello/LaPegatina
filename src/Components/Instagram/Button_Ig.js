import React from 'react';
import './Button_Ig.css';

const ButtonIG = (props) => {

    function checkRightOrWrong (event) {
        if (props.value === props.currentLocation) {
            props.addToCounter();
        }
        
        props.setRandomImageAndLocations();
        
    }

    return (
        <button className="instagram-game-button" onClick={()=> checkRightOrWrong()}>
            {props.value}
        </button>
    )
};

export default ButtonIG;