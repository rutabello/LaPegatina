/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable max-len */
import React, { Component } from 'react';
// import './Register.css';
import '../Rounds/Rounds.css';
import { Link } from 'react-router-dom';
import { MyContext } from '../../context/MyProvider';
import '../Home/Home.css';
import './Register.css';
import Spotify from '../Utils/Spotify';
import videoDataObject from '../Youtube/VideoDataObject'

class Register extends Component {
    state = {
        link: 'hide',
        albums: [],
        selectedAlbum: '',
        data: [],
        videoId: '',
        questions:[]
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
    componentDidMount = () => {
        const json = JSON.stringify(videoDataObject);
        const newdata = JSON.parse(json);

        this.setState({
            data: newdata,
        });
// console.log (this.state.data)
// console.log (newdata)
    //    const arrayPlaylist = [];
    //    newdata.map((element) => {
    //    // here be the if statement
    //        arrayPlaylist.push(element.videoId);
    //        return arrayPlaylist;
    //    });
    //    this.setState({
    //     //    questions: newdata[arrayPlaylist.indexOf(arrayPlaylist.videoId)].questions,
    //     //    currentTitle: newdata[arrayPlaylist.indexOf(randomVideoId)].title,
    //        // currentSongTitle:
    //    });
    }
    showLink = (context, newPoints, gameName, roundIn) => {

        // context.addPoints(newPoints, gameName, roundIn);

        this.setState({
            // link: 'showIt',
            link: 'screen',
        });
    }

    componentDidMount() {

        const { currentGame } = this.props;

        if (currentGame === 'spotify') {
            this.getSpotifyAlbums();
        }
    }

    render() {
        const { currentGame, score } = this.props;

        const { link, albums } = this.state;

        if (currentGame === 'spotify') {

            return (
                <MyContext.Consumer>
                    {(context) => (
                        <div>
                            <div className={link}>
                                <div className="screenDiv">
                                    <div className="screenDiv__firstDiv">
                                        <h1 className="round2Title">Ronda 2</h1>
                                        <h2>Choose the album you want to play with!</h2>
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
                            <button type="button" onClick={() => this.showLink(context, score, 'spotify', 'one')}>
                                Suma puntos y sigue jugando
                            </button>
                        </div>
                    )}
                </MyContext.Consumer>
            );
        }

        if (currentGame === 'spotify1') {
            return (
                <MyContext.Consumer>
                    {(context) => (
                        <div>
                            <div className={link}>
                                <h1 className="playWith title">Ronda 1</h1>
                                <Link to="spotifyroundone">
                                    <button className="button1" type="button" onClick={() => context.addPoints(score)}>
                                        Start
                                    </button>
                                </Link>
                            </div>
                            <button type="button" onClick={this.showLink}>
                                Juega con Música
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
                                <h1 className="playWith">Ronda 2</h1>
                                <p>Instrucciones</p>
                                <p>Con que concerto de La Pegatina quieres jugar?</p>
                                        <Link to={{ pathname: '/youtuberoundtwo', state: { videoId: this.state.videoId} }}>
                                            <button
                                                className="button1"
                                                type="button"
                                                onClick={() => this.showLink()}
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
                                                    // key={data.title}
                                                    onClick={(e) => this.setState({videoId:name.videoId})}
                                                >
                                                    {name.title}
                                            
                                                </button>
                                            ))}
                                            </div>
                                            </div>
                                            </div>
                                {/* <Link to="youtuberoundone">
                                    <button className="button1" type="button" onClick={() => context.addPoints(score)}>
                                        Start
                                    </button>
                                </Link> */}
                            {/* </div> */}
                          <button type="button" onClick={this.showLink}>
                                Juega una segunda ronda
                            </button> 
                         </div> 
                    )}
                </MyContext.Consumer>
            );
        }

        if (currentGame === 'youtube1') {
            return (
                <MyContext.Consumer>
                    {(context) => (
                        <div>
                            <div className={link}>
                                <h1 className="playWith">Ronda 1</h1>
                                <p>Instrucciones</p>
                                <Link to="youtuberoundone">
                                    <button className="button1" type="button" onClick={() => context.addPoints(score)}>
                                        Start
                                    </button>
                                </Link>
                            </div>
                            <button type="button" onClick={this.showLink}>
                                Juega con Videos
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
                        <div>
                            <div className={link}>
                                <h1 className="playWith">Ronda 2</h1>
                                <Link to="instagramroundtwo">
                                    <button className="button1" type="button" onClick={() => context.addPoints(score)}>
                                        Start
                                    </button>
                                </Link>
                            </div>
                            <button type="button" onClick={this.showLink}>
                                Juega una segunda Ronda
                            </button>
                        </div>
                    )}
                </MyContext.Consumer>
            );
        }

        if (currentGame === 'instagram1') {
            return (
                <MyContext.Consumer>
                    {(context) => (
                        <div>
                            <div className={link}>
                                <h1 className="playWith">Ronda 1</h1>
                                <Link to="instagramroundone">
                                    <button className="button1" type="button" onClick={() => context.addPoints(score)}>
                                        Start
                                    </button>
                                </Link>
                            </div>
                            <button type="button" onClick={this.showLink}>
                                Juega con Fotos
                            </button>
                        </div>
                    )}
                </MyContext.Consumer>
            );
        }
        return null;
    }
}

export default Register;
