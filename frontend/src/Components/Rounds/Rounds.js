/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import texts from '../../texts.json';
import './Rounds.css';
import '../../App.css';
import '../Home/Home.css';
import photo from '../../Pictures/photo_w.png';
import video from '../../Pictures/video_w.png';
import music from '../../Pictures/music_w.png';
import { MyContext } from '../../context/MyProvider';


class Rounds extends React.Component {

    state = {
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

    componentDidMount = () => {
        localStorage.setItem('savedState', JSON.stringify(this.context));
    }

    render() {

        const { page, instagram, youtube, spotify, button } = this.state;

        const { language } = this.props;

        return (
            <div>
                <div className={page}>
                    <p className="title">{texts[language].roundOneText}</p>
                    <p><b>Guess the right song!</b></p>
                    <p>{texts[language].instructions}</p>
                    <Link className={youtube || instagram ? 'hideGame' : 'title'} to="spotifyroundone"><button className="button1" type="button">{texts[language].startText}</button></Link>
                    <Link className={spotify || instagram ? 'hideGame' : 'title'} to="youtuberoundone"><button className="button1" type="button">{texts[language].startText}</button></Link>
                    <Link className={spotify || youtube ? 'hideGame' : 'title'} to="instagramroundone"><button className="button1" type="button">{texts[language].startText}</button></Link>
                </div>
                <div className="home-play-buttons">
                    <button type="button" className={button} onClick={this.startSpotify}>
                        <img className="home-btn-image" src={music} alt="music" />
                        {texts[language].spotifyPlayWithButton}
                    </button>
                    <button type="button" className={button} onClick={this.startYoutube}>
                        <img className="home-btn-image" src={video} alt="music" />
                        {texts[language].youtubePlayWithButton}
                    </button>
                    <button type="button" className={button} onClick={this.startInsta}>
                        <img className="home-btn-image" src={photo} alt="music" />
                        {texts[language].instagramPlayWithButton}
                    </button>
                </div>
            </div>
        );
    }
}

Rounds.contextType = MyContext;

export default Rounds;
