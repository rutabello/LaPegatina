import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import Game from './Components/Game/Game';
import Home from './Components/Home/Home';
import Instagram from './Components/Instagram/Instagram'
import SocialMedia from './Components/SocialMedia/SocialMedia';
import Team from './Components/Team/Team';


//packages used: react router, react sound, leaflet, leaflet react, 

class App extends React.Component {

  render() {
    return ( 
      <div>
        <Switch>
          <Route exact path='/' render={props => <Home {...props} />} />
          <Route path='/game' render={props => <Game {...props} />} />   
          <Route path='/team' render={props => <Team {...props} />} />
          <Route path='/instagram' render={props => <Instagram {...props} />} />
        </Switch> 
        <div className="social-media-follow-buttons">
          <SocialMedia />
        </div>
      </div>
    );
  }
}

export default App;
