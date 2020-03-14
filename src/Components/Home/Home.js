import React from 'react';
import {Link} from 'react-router-dom';
import BgMusic from '@react-element/bg-music';
import sound from './bg_sound.mp3';
import '../../App.css';
import './Home.css';
import './Button.css';

let audio = new Audio("https://freesound.org/data/previews/506/506053_10991815-lq.mp3");

  const start = () => {
    audio.play();
  }

const Home = () => (

      <div className="main">
          <span className="socod">Juega con 
          </span>
          <span className="webdev">
            <span>&nbsp;La pegatina</span>
            <span>&nbsp;La pegatina</span>
          </span>
          
         { <h3 className="hideGame"><Link to="/">Home</Link></h3>
         }
          <h3 ><Link id="btn-game" to="game" onClick={start} >Juega!</Link></h3>
          <div>
          { //Will we still use background music?
          /* <BgMusic
            src={sound}/> */} 
          </div>
        </div>
 )

 export default Home;