import React, { Component } from 'react';

export const MyContext = React.createContext();

class MyProvider extends Component {
  state = {
    name: 'Sandra Serediuc',
    username: "Alecsundra",
    age: 20,
    score: 0,
    points: ' '

  }

  render() {
    console.log(this.props)
    return (
      <MyContext.Provider value={{
        state: this.state,
        //   addPoints: function(points) { this.state.score += points; }
        addPoints: () => this.setState({
          score: this.state.score +10
        
        })
      }}>
        {this.props.children}
      </MyContext.Provider>
    )
  }
}

export default MyProvider;
