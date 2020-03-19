import React from 'react';
import { Link } from 'react-router-dom';
// import BgMusic from '@react-element/bg-music';
// import sound from './bg_sound.mp3';
import '../../App.css';
import './Home.css';
import logo from '../../Pictures/logo_la_pegatina_2018.png'

// let audio = new Audio("https://freesound.org/data/previews/506/506053_10991815-lq.mp3");

// const start = () => {
//   audio.play();
// }

const Home = (props) => (
  <div className="container">
    <div className="main">
      <h3 className="hideGame"><Link to="/">Home</Link></h3>

      <p className="playWith">Juega con</p>
      <img src={logo} alt="" className="laPegatina" />

      <Link className="btn-game" to="game">Juega con La Pegatina!</Link>
      <a className="btn-game" href="https://playwith.es">Juega con música de todo el mundo</a>
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