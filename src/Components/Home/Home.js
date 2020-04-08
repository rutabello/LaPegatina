import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import './Home.css';
import logo from '../../Pictures/logo_la_pegatina_2018.png';
import texts from '../../texts.json';

const Home = (props) => (
  <div className="container">
    <div className="main">
      <h3 className="hideGame"><Link to="/">Home</Link></h3>

      <p className="playWith">{texts[props.language].playwithTitle}</p>
      <img src={logo} alt="la pegatina logo" className="laPegatina" />

      <div className="home-play-buttons">
        <Link className="btn-game" to="spotifyroundone">{texts[props.language].spotifyPlayWithButton}</Link>
        <Link className="btn-game" to="youtuberoundone">{texts[props.language].youtubePlayWithButton}</Link>
        <Link className="btn-game" to="instagramroundone">{texts[props.language].instagramPlayWithButton}</Link>
        <a className="btn-game" href="https://playwith.es">{texts[props.language].allmusicButton}</a>
      </div>
    </div>
  </div>
)

export default Home;