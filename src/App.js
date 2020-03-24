import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import Game from './Components/Game/Game';
import Home from './Components/Home/Home';
import SocialMedia from './Components/SocialMedia/SocialMedia';


//packages used: react router, react sound, leaflet, leaflet react, 

class App extends React.Component {

  render() {
    return ( 
      <div>
        <Switch>
          <Route exact path='/' render={props => <Home {...props} />} />
          <Route path='/game' render={props => <Game {...props} />} />          
        </Switch> 
        <div className="social-media-follow-buttons">
          <SocialMedia />
        </div>
      </div>
    );
  }
}

export default App;
