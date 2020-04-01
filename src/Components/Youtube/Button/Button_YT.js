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
const checkIt = (event)=>{   
    if (props.displayedSong === props.currentSong) {
alert('You are right')
    }
}  
    return (
        <button className='myButtonYT buttonYT' 
        onClick={()=> checkIt()}>
       
        {/* className={"myButton button " + (isCorrect ? "green" : "red")} > */}
              <span className='titleColorYT' >{props.displayedSong}</span> 
        </button>
    )
};


export default ButtonYT;