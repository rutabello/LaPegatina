import React from 'react';
import '../Button/Button_YT.css';

const ButtonYT= (props) => {

    return (
        <button className={"yt-button" }>
            {props.title}
        </button>
    )
};

export default ButtonYT;