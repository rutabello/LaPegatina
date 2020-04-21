import React from 'react';
import '../Button/Button_YT.css';

const ButtonYT = (props) => {
    console.log (props)
const checkIt = (event)=>{   
    if (props.displayedSong === props.currentSong) {
props.unmute()    }
}  
    return (
        <button className='myButtonYT buttonYT' 
        onClick={()=> checkIt()}>
              <span className='titleColorYT' >{props.displayedSong}</span> 
        </button>
    )
};


export default ButtonYT;