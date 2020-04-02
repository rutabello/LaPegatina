import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Game from './Components/Game/Game';
import Home from './Components/Home/Home';
import Instagram from './Components/Instagram/Instagram'
import SocialMedia from './Components/SocialMedia/SocialMedia';
import Team from './Components/Team/Team';
import Navbar from './Components/Navbar/Navbar';

import './App.css';


class App extends React.Component {

  state = {
    selectedLanguage: 'spanish',
  }

  setLanguage = (lang) => {
    this.setState ({
      selectedLanguage: lang
    })
  }

  render() {

    const { selectedLanguage } = this.state;

    return (
      <div>
        <Navbar onChangeLanguage={this.setLanguage} />

        <Switch>
          <Route exact path='/' render={props => <Home language={selectedLanguage} {...props} />} />
          <Route path='/game' render={props => <Game language={selectedLanguage} {...props} />} />   
          <Route path='/team' render={props => <Team language={selectedLanguage} {...props} />} />
          <Route path='/instagram' render={props => <Instagram language={selectedLanguage} {...props} />} />
        </Switch> 
        
        <div className="social-media-follow-buttons">
          <SocialMedia language={selectedLanguage}/>
        </div>
      </div>
    );
  }
}

export default App;
