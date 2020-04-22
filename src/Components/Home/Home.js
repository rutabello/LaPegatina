import React from 'react';
import '../../App.css';
import './Home.css';
import logo from '../../Pictures/logo_la_pegatina_2018.png';
import texts from '../../texts.json';
import Rounds from '../Rounds/Rounds';


const Home = ({ language }) => (

  
    <div className="container">
      <div className="main">
  
        <p className="playWith">{texts[language].playwithTitle}</p>
        <img src={logo} alt="la pegatina logo" className="laPegatina" />
  
        <div className="home-play-buttons">
          <p ><Rounds languageSpotify={texts[language].spotifyPlayWithButton} languageYoutube={texts[language].youtubePlayWithButton}
          languageInstagram={texts[language].instagramPlayWithButton} languageWorld={texts[language].allmusicButton} /></p>
        </div>
      </div>
    </div>
  )
  
  export default Home;


