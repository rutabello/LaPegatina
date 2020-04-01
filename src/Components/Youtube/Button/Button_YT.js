import React from 'react';
import '../Button/Button_YT.css';

// const ButtonYT= (props) => {

//     return (
//         <button className={"yt-button" }>
//             {props.title}
//         </button>
//     )
// };

// export default ButtonYT;
const ButtonYT = (props) => {
    console.log (props)
    const isCorrect = props.displayedSong === props.currentSong;

    return (
        <button className='myButton button' 
        onClick={props.onClick}>
        {/* className={"myButton button " + (isCorrect ? "green" : "red")} > */}
              <span className='titleColor' >{props.displayedSong}</span> 
        </button>
    )
};


export default ButtonYT;