import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import Game from './Components/Game/Game';
import Home from './Components/Home/Home';

class App extends React.Component {
  render() {
    return ( 
      <div>
        <Switch>
          <Route exact path='/' render={props => <Home {...props} />} />
          <Route path='/game' render={props => <Game {...props} />} />          
        </Switch>        
      </div>
    );
  }
}

export default App;
