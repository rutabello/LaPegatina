/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';

export const MyContext = React.createContext();

class MyProvider extends Component {

    state = {
        first_name: 'Rut',
        last_name: '',
        username: 'Ruteta',
        birth_date: '1987-09-14',
        email: 'rut.abello@gmail.com',
        points_spotify_round_one: '',
        points_spotify_round_two: '',
        points_instagram_round_one: '',
        points_instagram_round_two: '',
        points_youtube_round_one: '',
        points_youtube_round_two: '',

        activePanel: 'login',
        language: 'spanish',
        authed: true,
    }

    render() {

        const { points: pointsState, activePanel } = this.state;
        // We rename points so we can after do 'points: this.state.points + points' without problems

        const { children } = this.props;

        return (
            <MyContext.Provider value={{
                state: this.state,
                addPoints: (points) => this.setState({
                    points: pointsState + points,
                }),

                clearUser: () => this.setState({
                    first_name: '',
                    last_name: '',
                    username: '',
                    birth_date: '',
                    email: '',
                    points_spotify_round_one: '',
                    points_spotify_round_two: '',
                    points_instagram_round_one: '',
                    points_instagram_round_two: '',
                    points_youtube_round_one: '',
                    points_youtube_round_two: '',
                    activePanel: 'login',
                    language: 'spanish',
                    authed: false,
                }),

                // logUserIntoContext: (first_name, last_name, usermame, birth_date, email) => this.setState({
                //     first_name,
                //     last_name,
                //     username,
                //     birth_date,
                //     email,
                //     activePanel: 'login',
                //     language: 'spanish',
                //     authed: true,
                // }),


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
