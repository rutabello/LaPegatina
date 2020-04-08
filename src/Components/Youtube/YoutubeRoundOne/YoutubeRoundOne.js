import React, {Component} from 'react';
import '../Youtube.css';
import {Link} from 'react-router-dom';
import Register from '../../Register/Register';

class YoutubeRoundOne extends Component {

    state= {
        gameStatus: "playing",
        name: ""
    }

    stopPlaying = () => {
        this.setState ({gameStatus: "gameOver"})
    }

    registerUser = () => {
        this.setState ({name: "Rut"})
    }

    render () {
        return (
            <div>
                {this.state.gameStatus==="playing" ?
                    <div>
                        <p>Sandra's YouTube Round One component will go here</p>
                        <button onClick={()=>this.stopPlaying()}>Finish round</button>
                        <button onClick={()=>this.registerUser()}>Register user</button>
                    </div>
                    :   this.state.name ? 
                            <div>
                                <Link to="youtuberoundtwo">Link to YouTube's 2nd round</Link>
                            </div>
                    : <Register />
                }
            </div>
        )
    }
}

export default YoutubeRoundOne;