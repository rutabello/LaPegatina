/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';

export const MyContext = React.createContext();

class MyProvider extends Component {

    state = {
        name: 'rut',
        username: 'Alecsundra',
        age: 20,
        points: 0,
        activePanel: 'login',
    }

    render() {

        const { points: pointsState, activePanel } = this.state;
        // We rename points so we can after do 'points: this.state.points + points' without problems

        const { children } = this.props;

        return (
            <MyContext.Provider value={{
                state: this.state,
                // addPoints: function(points) { this.state.score += points; }
                addPoints: (points) => this.setState({
                    points: pointsState + points,

                }),
                // login sign up switch
                activePanel,
                actions: {
                    handlePanelSwitch: (newPanel) => {
                        this.setState({
                            activePanel: newPanel,
                        });
                    },
                },
            }}
            >
                {children}
            </MyContext.Provider>
        );
    }
}

export default MyProvider;
