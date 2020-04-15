import React, {Component} from 'react';
import '../Youtube.css';
import {Link} from 'react-router-dom';
import Register from '../../Register/Register';
import YTGame from '../YTGame/YTGame'

class YoutubeRoundOne extends Component {

    state= {
        gameStatus: "playing",
        name:  null
    }

    stopPlaying = () => {
        this.setState ({gameStatus: "gameOver"})
    }

    registerUser = () => {
        this.setState ({name: "Rut"})
    }

    render () {
        if (this.state.gameStatus==="playing") {
            return (
                <div>
                    {/* <p>Sandra's YouTube Round One component will go here</p> */}
                    <YTGame />
                    <button onClick={()=>this.stopPlaying()}>Finish round</button>
                    <button onClick={()=>this.registerUser()}>Register user</button>
                </div>
            )
        } if (this.state.gameStatus==="gameOver") {
            if (this.state.name !== null) {
                return (
                    <div>
                        <Link to="youtuberoundtwo">Link to YouTube's 2nd round</Link>
                    </div>
                )
            } else {
                return (
                    <Register currentGame={"youtube"} />
                )
            }
        }
    }
}

export default YoutubeRoundOne;

