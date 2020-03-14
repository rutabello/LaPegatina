import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import Game from './Components/Map/Game';
import Home from './Components/Home/Home';

//packages used: react router, react sound, leaflet, leaflet react, 

class App extends React.Component {

  state = {
    display: 'hideGame'
  }
    

  render() {
    return ( 
      <div>
        <div className={this.state.display}>
          <Game /> 
        </div>
          <Switch>
            <Route exact path='/' render={props => <Home {...props} homeContent={this.state.home} />}
            />
            <Route path='/game' render={props => <Game {...props} />}
            />  
          </Switch>        
      </div>
    );
  }
}


export default App;

