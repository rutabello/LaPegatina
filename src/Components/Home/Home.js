import React from 'react';
import { Link } from 'react-router-dom';
// import BgMusic from '@react-element/bg-music';
// import sound from './bg_sound.mp3';
import '../../App.css';
import './Home.css';

// let audio = new Audio("https://freesound.org/data/previews/506/506053_10991815-lq.mp3");


const Home = (props) => (
  <div className="container">
    <div className="main">
      <h3 className="hideGame"><Link to="/">Home</Link></h3>

      <p className="playWith">Juega con</p>
      <p className="laPegatina">La pegatina</p>

      <Link 
        id="btn-game"
        to="/game"
        onClick={() => {sessionStorage.selectedPlaylistId = "37i9dQZF1DZ06evO2EUrsw"}}
      >
        Juega con La Pegatina!
      </Link>

      <Link 
        id="btn-game"
        to="/game"
        onClick={() => {sessionStorage.selectedPlaylistId = "4kCRwBU4lLcXZZrapYOEcL"}}
      >
        Juega con otra lista
      </Link>

      <div>
        {
          //Will we still use background music?
          /* <BgMusic
            src={sound}/> */
        }
      </div>
    </div>
  </div>
)

 export default Home;