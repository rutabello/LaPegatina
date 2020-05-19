/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable max-len */
import React, { Component } from 'react';
import '../Rounds/Rounds.css';
import { Link } from 'react-router-dom';
import { MyContext } from '../../context/MyProvider';
import '../Home/Home.css';
import './Register.css';
import Spotify from '../Utils/Spotify';
import videoDataObject from '../Youtube/VideoDataObject';
import texts from '../../texts.json';
import MembersAccounts from '../Instagram/InstagramRoundTwo/MembersAccounts';

class Register extends Component {
    state = {
        link: 'hide',
        albums: [],
        selectedAlbum: '',
        data: [],
        videoId: '',
        questions:[],
        setSelectedMemberId: '',
        picData: []
    };



    async getSpotifyAlbums() {
        const unSecretoAVoces = await Spotify.getAlbumsImages('0KHcK2Qehfh1imPj5NJXZz');

        // Ahora o nunca
        const ahoraONunca = await Spotify.getAlbumsImages('1gVTdZJaemKysGPHgMQfvD');

        // La Gran Pegatina Live 2016
        const laPegatinaLive2016 = await Spotify.getAlbumsImages('3yAo1PKKqDKK3JzaZNAIVU');

        // Revulsiu
        const revulsiu = await Spotify.getAlbumsImages('1QhYAMuClrXwodJbdWr9kb');

        // Eureka!
        const eureka = await Spotify.getAlbumsImages('6wTQ7zBcv3hwG3jSvBb6nI');

        // Xapomelon
        const xapomelon = await Spotify.getAlbumsImages('5YGUW9OJPCoT3bUySE50X7');

        // Via Mandarina
        const viaMandarina = await Spotify.getAlbumsImages('17xrJ6CwY9OEtof17QV9OB');

        // Al carrer
        const alCarrer = await Spotify.getAlbumsImages('4GDvxuvYI9ZrnBOiE8of32');

        const albums = [
            unSecretoAVoces,
            ahoraONunca,
            laPegatinaLive2016,
            revulsiu,
            eureka,
            xapomelon,
            viaMandarina,
            alCarrer,
        ]

        console.log(albums)

        this.setState({
            albums,
        });

    }

    showLink = (context, newPoints, gameName, roundIn) => {

        context.addPoints(newPoints, gameName, roundIn);

        this.setState({

            link: 'screen',
        });
    }

    setSelectedMemberId = (id) => {
        this.setState ({
            setSelectedMemberId: id,
        })
        localStorage.setItem('memberId', id)
    }

    componentDidMount() {

        const { currentGame } = this.props;

        if (currentGame === 'spotify') {
            this.getSpotifyAlbums();
        }
        if (currentGame === 'youtube') {
            const json = JSON.stringify(videoDataObject);
            const newdata = JSON.parse(json);

            this.setState({
                data: newdata,
            });
        }
    }

    render() {
        const { currentGame, score, language } = this.props;

        const { link, albums } = this.state;

        if (currentGame === 'spotify') {

            return (
                <MyContext.Consumer>
                    {(context) => (
                        <div>
                            <div className={link}>
                                <div className="screenDiv">
                                    <div className="screenDiv__firstDiv">
                                        <h1 className="round2Title">{texts[language].roundTwoText}</h1>
                                        <h2>{texts[language].spotifyRoundTwoQuestion}</h2>
                                        <h2>{texts[language].chooseAlbumText}</h2>
                                        <Link to={{ pathname: '/spotifyRoundTwo', state: { selectedAlbum: this.state.selectedAlbum } }}>
                                            <button
                                                className="button1"
                                                type="button"
                                                onClick={() => this.showLink(context, score, 'spotify', 'one')}
                                            >
                                                Start
                                            </button>
                                        </Link>
                                    </div>
                                    <div className="allAlbumsDiv">
                                        {albums.map((albumObject) => (
                                            <button
                                                type="button"
                                                className="buttonAlbum"
                                                onClick={(event) => this.setState({ selectedAlbum: event.target.alt })}
                                            >
                                                <img
                                                    src={albumObject.images[0].url}
                                                    alt={albumObject.name}
                                                    className="blackBorder"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <button className="suma-puntos-button" type="button" onClick={() => this.showLink(context, score, 'spotify', 'one')}>
                                {texts[language].keepPointsPlayMoreText}
                            </button>
                        </div>
                    )}
                </MyContext.Consumer>
            );
        }

        if (currentGame === 'youtube') {
            return (
                <MyContext.Consumer>
                    {(context) => (
                        <div>
                            <div className={link}>
                                <div className="screenDiv">
                                    <div className="screenDiv__firstDiv">
                                        <h1 className="playWith">{texts[language].roundTwoText}</h1>
                                        <p>Instrucciones</p>
                                        <p>Con que concerto de La Pegatina quieres jugar?</p>
                                        <Link to={{ pathname: '/youtuberoundtwo', state: { videoId: this.state.videoId,
                                            data:this.state.data} }}
                                        >
                                            <button
                                                className="button1"
                                                type="button"
                                                onClick={() => this.showLink(context, localStorage.yt_points_1, 'youtube', 'one')}
                                            >
                                                Start
                                            </button>
                                        </Link>
                                    </div>
                                    <div className="btn-concert">
                                        {this.state.data.map((name) => (
                                            <button
                                                className="btn-nav"
                                                type="button"
                                                key={name.title}
                                                onClick={(e) => this.setState({videoId:name.videoId})}

                                            >
                                                <img className='img_concert'
                                                src='https://comoexplicarte.files.wordpress.com/2018/08/img_20180810_214227-e1534105981107.jpg?w=1120'
                                            />
                                                {name.title}

                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <button className="suma-puntos-button" type="button" onClick={() => this.showLink(context, localStorage.yt_points_1, 'youtube', 'one')}>
                                {texts[language].keepPointsPlayMoreText}
                            </button>
                        </div>
                    )}
                </MyContext.Consumer>
            );
        }

        if (currentGame === 'instagram') {
            return (
                <MyContext.Consumer>
                    {(context) => (
                        <div className="instagram-round">
                            <div className={link}>
                                <h1 className="header">{texts[language].roundTwoText}</h1>
                                <div>
                                    <MembersAccounts
                                        setSelectedMemberId={this.setSelectedMemberId}
                                        language={language}
                                    />
                                </div>

                                <Link to="instagramroundtwo">
                                    <button className="button1 instagram-start-button" type="button" onClick={() => context.addPoints(score)}>
                                        Start
                                    </button>
                                </Link>
                            </div>
                            <div>
                                <button className="suma-puntos-button" type="button" onClick={() => this.showLink(context, score, 'instagram', 'one')}>
                                    {texts[language].keepPointsPlayMoreText}
                                </button>
                            </div>

                        </div>
                    )}
                </MyContext.Consumer>
            );
        }

        return null;
    }
}

export default Register;
