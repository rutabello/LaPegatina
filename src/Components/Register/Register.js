import React, {Component} from 'react';
import './Register.css';
import {Link} from 'react-router-dom';

class Register extends Component {

    state= {

    }

    render (props) {
        
        if (this.props.currentGame === "spotify") {
            return (
                <div>
                    <p>Register form goes here</p>
                    {/* <p>{this.props.score}</p> */}
                    {/* <Link to='/user'>Click to keep the points</Link> */}
                    <Link to='/user'>Click to keep the points</Link>
                    <Link to="spotifyRoundTwo">Send and go to Spotify second round</Link>
                </div>
            )               
        } else if (this.props.currentGame === "youtube") {
            return (
                <div>
                    <Link to="youtubeRoundTwo">Send and go to YouTube second round</Link>
                </div>
            )
        } else if (this.props.currentGame === "instagram") {
            return (
                <div>
                    <Link to="instagramRoundTwo">Send and go to Instagram second round</Link>
                </div>
            )
        }
    }
}

export default Register;