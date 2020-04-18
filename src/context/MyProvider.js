import React, { Component } from 'react';

export const MyContext = React.createContext();

class MyProvider extends Component {
  state = {
    name: 'Sandra Serediuc',
    username: "Alecsundra",
    age: 20,
    points: 0

  }

  render() {
    console.log(this.props)
    return (
      <MyContext.Provider value={{
        state: this.state,
        //   addPoints: function(points) { this.state.score += points; }
        addPoints: (points) => this.setState({
          points: this.state.points + points
        
        })
      }}>
        {this.props.children}
      </MyContext.Provider>
    )
  }
}

export default MyProvider;
