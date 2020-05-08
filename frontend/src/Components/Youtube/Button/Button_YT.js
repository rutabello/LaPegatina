import React from 'react';
import './Button_YT.css';

const ButtonYT = (props) => {

    const { displayedSong } = props;

    const checkIt = () => {
        if (props.displayedSong === props.currentSong) {
            props.unmute();
        }
    };

    return (
        <button
            type="button"
            className="myButtonYT buttonYT"
            onClick={() => checkIt()}
        >
            <span className="titleColorYT">{displayedSong}</span>
        </button>
    );
};


export default ButtonYT;
