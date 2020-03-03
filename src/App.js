import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import Map from './Components/Map/Map';
import Home from './Components/Home/Home';
//import Quiz from './Components/Quiz/Quiz';


//packages used: react router, react sound, leaflet, leaflet react, 

class App extends React.Component {

      state = {

        display1: 'hideGame',

        home: {
          title: 'Play some',
          subtitle: 'with music'
        }
               
      }
    

  render() {

   
    return (

        
      <div>
      
       <div className={this.state.display1}>
       <Map /> 
          </div>
    
          <Switch>
           
          <Route exact path='/'             
              render={props => <Home {...props} homeContent={this.state.home} />}
              />
      
         <Route  path='/map'              
              render={props => <Map {...props} />}
              />  
          </Switch>        
      </div>
        
    );
  }
}


export default App;

