import React from 'react';
import './Button.css';
import BgMusic from '@react-element/bg-music';

function Button() {

  return (
    <div id="btn-div">
        {/* <h3 ><Link id="btn-game" to="map" onClick={start} >Start Game</Link></h3>  */ }
        <a href="" id="btn-game" target="_b">Start game</a>
        <BgMusic.Default/>
    </div>
  );

}

export default Button;

