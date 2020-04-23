import React from 'react';
import './Rounds.css';
import '../../App.css';
import '../Home/Home.css';
import { Link } from 'react-router-dom';

class Rounds extends React.Component {

    state = {
        ronda1: 'Ronda 1',
        // ronda2: "Ronda 2",
        page: 'hideGame',
        button: 'btn-game',
        spotify: false,
        youtube: false,
        instagram: false,
    }

    startSpotify = () => {

        const spotStart = true;
        const start = 'screen';

        this.setState({
            spotify: spotStart,
            page: start,
            button: 'hideGame',
        });
    }

    startYoutube = () => {

        const youStart = true;
        const start = 'screen';

        this.setState({
            youtube: youStart,
            page: start,
            button: 'hideGame',
        });
    }

    startInsta = () => {

        const instaStart = true;
        const start = 'screen';

        this.setState({
            instagram: instaStart,
            page: start,
            button: 'hideGame',
        });
    }


    render() {

        const { page, ronda1, instagram, youtube, spotify, button } = this.state;

        const { languageInstagram, languageSpotify, languageYoutube } = this.props;

        return (
            <div>
                <div className={page}>
                    <p className="playWith title">{ronda1}</p>
                    <Link className={youtube || instagram ? 'hideGame' : 'title'} to="spotifyroundone">start</Link>
                    <Link className={spotify || instagram ? 'hideGame' : 'title'} to="youtuberoundone">start</Link>
                    <Link className={spotify || youtube ? 'hideGame' : 'title'} to="instagramroundone">start</Link>
                </div>
                <div className="home-play-buttons">
                    <button type="button" className={button} onClick={this.startSpotify}>{languageSpotify}</button>
                    <button type="button" className={button} onClick={this.startYoutube}>{languageYoutube}</button>
                    <button type="button" className={button} onClick={this.startInsta}>{languageInstagram}</button>
                    {/* <button >  <a className="title" href="https://playwith.es">{this.props.languageWorld}</a></button> */}
                </div>
            </div>
        );
    }
}

export default Rounds;
