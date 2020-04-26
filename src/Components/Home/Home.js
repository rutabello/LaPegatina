import React from 'react';
import '../../App.css';
import './Home.css';
import logo from '../../Pictures/logo_la_pegatina_2018.png';
import texts from '../../texts.json';
import Rounds from '../Rounds/Rounds';


// all the links to the first games are in Rounds.js now
// the links to the second Rounds in Register.js

const Home = ({ language }) => (

    <div className="container">
        <div className="main">
            <p className="playWith">{texts[language].playwithTitle}</p>
            <img src={logo} alt="la pegatina logo" className="laPegatina" />
            <div className="home-play-buttons">
                <Rounds
                    language={language}
                />
            </div>
        </div>
    </div>
);

export default Home;
