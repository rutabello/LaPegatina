import React from 'react';

const ButtonIgTags = (props) => {

    function checkRightOrWrong (event) {
        
        console.log(props.value, props.currentTags)

        if (props.value === props.currentTags) {
            
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

export default ButtonIgTags;