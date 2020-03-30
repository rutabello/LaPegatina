import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import './Home.css';
import logo from '../../Pictures/logo_la_pegatina_2018.png';
import texts from '../../Components/texts.json';

const Home = (props) => (
  <div className="container">
    <div className="main">
      <h3 className="hideGame"><Link to="/">Home</Link></h3>

      <p className="playWith">{texts[props.language].playwithTitle}</p>
      <img src={logo} alt="" className="laPegatina" />

      <Link className="btn-game" to="game">{texts[props.language].playWithButton}</Link>
      <a className="btn-game" href="https://playwith.es">{texts[props.language].allmusicButton}</a>
    </div>
  </div>
)

 export default Home;