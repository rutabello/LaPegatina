/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react';
import '../Youtube.css';
import { Link } from 'react-router-dom';
import Register from '../../Register/Register';
import YTGame from '../YTGame/YTGame';
import {MyContext} from '../../../context/MyProvider';
import UserForm from '../../Register/User/UserForm/UserForm'

class YoutubeRoundOne extends Component {

    state= {
        gameStatus: 'playing',
        // name: null,
    }

    stopPlaying = () => {
        this.setState({ gameStatus: 'gameOver' });
    }

    // registerUser = () => {
    //     this.setState({ name: 'Rut' });
    // }

    render() {

        const { gameStatus, name } = this.state;

        if (gameStatus === 'playing') {
            return (
                <div>
                    {/* <p>Sandra's YouTube Round One component will go here</p> */}
                    <YTGame stopPlaying={this.stopPlaying} />
                    {/* <button
                        type="button"
                        onClick={() => this.stopPlaying()}
                    >
                        Finish round
                    </button>
                    <button
                        type="button"
                        onClick={() => this.registerUser()}
                    >
                        Register user
                    </button> */}
                </div>
            );
        }
        if (gameStatus === 'gameOver') {
        return (
            <MyContext.Consumer>
            {(context)=>(
                <div>
                <h1>Has llegado al final de esta ronda. Te atreves con la segunda? </h1>
                    {context.state.name ?
                        <Link to="youtuberoundtwo"><button onClick= {()=>context.addPoints(this.counter)}>Juega una segunda ronda</button></Link>
                    :
                    <UserForm />
                    }
                    </div>
            )}
            </MyContext.Consumer>
                )}
    }
}

//         if (gameStatus === 'gameOver') {
//             if (name !== null) {
//                 return (
//                     <div>
//                         <Link to="youtuberoundtwo">Link to YouTube's 2nd round</Link>
//                     </div>
//                 );
//             }

//             return (
//                 <Register currentGame="youtube" />
//             );
//         }

//         return null;
//     }
// }
                

export default YoutubeRoundOne;
