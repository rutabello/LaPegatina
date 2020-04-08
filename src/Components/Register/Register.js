import React, {Component} from 'react';
import './Register.css';
import {Link} from 'react-router-dom';

class Register extends Component {

    state= {

    }

    render () {
        return (
            <div>
                <p>Register form goes here</p>
                <Link to="game">Send and go to Spotif second round</Link>
                <Link to="youtubeRoundTwo">Send and go to YouTube second round</Link>
                <Link to="instagramlocations">Send and go to Instagram second round</Link>
            </div>
        )
    }

}

export default Register;