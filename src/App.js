import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import Game from './Components/Game/Game';
import Home from './Components/Home/Home';
import Instagram from './Components/Instagram/Instagram'
import SocialMedia from './Components/SocialMedia/SocialMedia';
import Team from './Components/Team/Team';
import catalan from './Pictures/bandera_catalan_small.png'
import spanish from './Pictures/bandera_spanish_small.png';
import english from './Pictures/bandera_english_small.png';
import french from './Pictures/bandera_french_small.png';

import texts from '../src/Components/texts.json';


class App extends React.Component {

  state = {
    selectedLanguage: 'spanish',
  }

  languagesAvailableArr = ['catalan', 'spanish', 'english', 'french']

  languagesAvailable = [
    {language: 'catalan', flag: catalan},
    {language: 'spanish', flag: spanish},
    {language: 'english', flag: english},
    {language: 'french', flag: french}
  ]

  setLanguage = (lang) => {
    this.setState ({
      selectedLanguage: lang
    })
  }

  render() {
    return ( 
      <div>
        <div className="language-dropdown">
          <button className="dropbtn">{texts[this.state.selectedLanguage].languageButton}</button>
          <div className="dropdown-content">
            {this.languagesAvailable.map((lang) => 
              <img src={lang.flag} onClick={() => this.setLanguage(lang.language)} alt={lang.language}/>
            )}
          </div>
        </div>
        <Switch>
          <Route exact path='/' render={props => <Home language={this.state.selectedLanguage} {...props} />} />
          <Route path='/game' render={props => <Game language={this.state.selectedLanguage} {...props} />} />   
          <Route path='/team' render={props => <Team language={this.state.selectedLanguage} {...props} />} />
          <Route path='/instagram' render={props => <Instagram language={this.state.selectedLanguage} {...props} />} />
        </Switch> 
        <div className="social-media-follow-buttons">
          <SocialMedia language={this.state.selectedLanguage}/>
        </div>
      </div>
    );
  }
}

export default App;
