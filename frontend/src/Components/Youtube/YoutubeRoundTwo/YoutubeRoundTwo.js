import React, { Component } from 'react';
// import '../YTPlayer/YTPlayer.css';
import GameEnded from '../../GameEnded/GameEnded';
import YTGame from '../YTGame/YTGame';
import videoDataObject from '../VideoDataObject'
import YouTube from 'react-youtube';
// import Button from '../Button/Button_YT';
import Shuffle from '../../Utils/Shuffle';
// import './YTPlayer.css';
import QuizYT2 from '../YoutubeRoundTwo/QuizYT2';
import texts from '../../../texts.json';
import Confetti from 'react-confetti';
import Loading from '../../Utils/Loading/Loading';


class YoutubeRoundTwo extends Component {
    state = {
        gameStatus: 'playing',
        player: '',
        giveMeConfetti: false,
        loadingDisplayClass: 'show',
        playerDisplayClass: 'hide',
        videoId: '',
        data:[],
        questions:[],
        videoIndex:''
    }

    // access to player in all event handlers via event.target
    VideoOnReady = (event) => {
    console.log(event.target)
    // plays the video at 10s, in case the video has the name of the song at the start
    const {videoId,data } = this.props;
    

    this.setState({
 
        loadingDisplayClass: 'hide',
        playerDisplayClass: 'show',
        videoId: this.props.location.state.videoId,
        data: this.props.location.state.data
    });
    // store the array with 3 random titles in a const
console.log (this.state.data)

    const arrayPlaylist = [];
    this.state.data.map((element) => {
    // here be the if statement
        arrayPlaylist.push(element.videoId);
        return arrayPlaylist;
    });
    this.setState({
        questions: this.state.data[arrayPlaylist.indexOf(this.state.videoId)].questions,
        videoIndex:arrayPlaylist.indexOf(this.state.videoId)
    });
    console.log (this.state.questions)
    console.log()

        event.target.seekTo(20);
        event.target.mute();
        event.target.playVideo();

        this.setState({
            player: event.target,
            giveMeConfetti: false
        });
    }
    showConfetti = () => {
        this.setState({
            giveMeConfetti: true,
        });
    }
    // VideoOnPlay = () => {

    // }

    // when the video end it send you to the endgame screen
    VideoOnEnd = () => {

        // const { stopPlaying } = this.props;

        this.stopPlaying();

    }
    // video can't be paused, it automaticlly plays the video
    VideoOnPause =(event)=>{
        const { player } = this.state;

        player.playVideo();

    }

    stopPlaying = () => {
        this.setState({ gameStatus: 'gameOver' });
    }
    
        restartYoutube = () => {
            this.setState({
                gameStatus: 'playing',
            });
        }

        render() {

            const opts = {
                // height: '315',
                // width: '560',
    
                // default 640 h-390
                playerVars: { // https://developers.google.com/youtube/player_parameters
                    autoplay: 1,
                    playsinline:1,//no full screen on mobile
                    modestbranding: 1, // not big yt branding
                    controls: 0, // the control not displayed
                    loop: 1,
                    muted:1,
                    start: 20, // from where the video starts(at 20 s in case the title is at the beginning)
                    // end: 90,
                    rel: 0, // getting only related videos from the channel
                },
            };

            const { giveMeConfetti, loadingDisplayClass, playerDisplayClass, gameStatus, videoId, questions} = this.state;
            const { language }=this.props
    
            if (gameStatus === 'playing') {
                return (
                    <div className="thegame">
                    <div className={`loading ${loadingDisplayClass}`}>
                        <Loading />
                    </div>

                    <div style={{ position: 'relative' }} className={`theYTPlayer ${playerDisplayClass}`}>
                        <div className="cover-bar"></div>
                        <YouTube
                            videoId={videoId}
                            opts={opts}
                            onReady={this.VideoOnReady}
                            // onPlay={this.VideoOnPlay}
                            onPause={this.VideoOnPause}
                            onEnd={this.VideoOnEnd}
                        />
                    </div>
                    <div>
                            <QuizYT2
                                questions={questions}
                                stopPlaying={this.stopPlaying}
                                showConfetti={this.showConfetti}
                            />
                    </div>
                        }
                        </div>
                )}


            if (gameStatus === 'gameOver') {
                return (
                    <div>
                         <GameEnded currentGame="youtube" language={language}/>
                    </div>
                )
            }
          }
          }

export default YoutubeRoundTwo;
