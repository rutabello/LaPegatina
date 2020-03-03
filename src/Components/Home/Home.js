import React from 'react';
import {Link} from 'react-router-dom';
import '../../App.css';
import './Home.css';
import './Button.css';

let audio = new Audio("https://freesound.org/data/previews/506/506053_10991815-lq.mp3")

  const start = () => {
    audio.play()
  }

const Home = () => (

      <div className="main">
          <span className="webdev">Play  
            <span>&nbsp;Some</span>
            <span>&nbsp;With</span>
            </span>
            <span className="socod">Music</span>
          
          <h3 className="hideGame"><Link to="/">Home</Link></h3>
         { /*<h3><Link to="quiz">Quiz</Link></h3>*/}
          <h3 ><Link id="btn-game" to="map" onClick={start} >Start Game</Link></h3>
       
      </div>
  
 
 )

export default Home;