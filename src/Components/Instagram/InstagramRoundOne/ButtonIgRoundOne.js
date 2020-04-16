import React, { useState } from 'react';

const ButtonIgRoundOne = (props) => {

    const { value, currentTags, userClicked } = props;

    const [colorClass, setColorClass] = useState('gray');

    const ANSWERS_TIME_DISPLAYED = 2;

    const checkRightOrWrong = () => {

        if (props.userClicked) {
            // A button has been already clicked, this will block
            // clicks on the rest of the buttons
            return;
        }

        // set userClicked to true, so next buttons clicked will do nothing
        props.userHasClicked();

        if (props.value === props.currentTags) {

            setColorClass('green');
            props.addToCounter();

        } else {
            setColorClass('red');
        }

        setTimeout(() => {
            setColorClass('gray');
            props.setRandomImageAndTags();
        }, ANSWERS_TIME_DISPLAYED * 1000);
    };

    const classGreen = (value === currentTags) && userClicked
        ? 'solutionGreen'
        : '';

    return (
        <button
            type="button"
            className={`instagram-game-button ${colorClass} ${classGreen}`}
            onClick={checkRightOrWrong}
        >
            {value}
        </button>
    );
};

export default ButtonIgRoundOne;
