import React, { Component } from 'react';

export const MyContext = React.createContext();

class MyProvider extends Component {
  state = {
    name: '',
    username: "Alecsundra",
    age: 20,
    points: 0,
    activePanel: "login"

  }

  render() {
    console.log(this.props)
    return (
      <MyContext.Provider value={{
        state: this.state,
        //   addPoints: function(points) { this.state.score += points; }
        addPoints: (points) => this.setState({
          points: this.state.points + points
        
        }),
        // login sign up switch
            activePanel: this.state.activePanel,
            actions: {
              handlePanelSwitch: newPanel => {
                this.setState({
                  activePanel: newPanel
                })
              }
            }
      }}>
        {this.props.children}
      </MyContext.Provider>
    )
  }
}

export default MyProvider;
