import React, { Component } from 'react';
// import '../YTPlayer/YTPlayer.css';
import GameEnded from '../../GameEnded/GameEnded';
import YTGame from '../YTGame/YTGame';
import videoDataObject from '../VideoDataObject'
import YouTube from 'react-youtube';
// import Button from '../Button/Button_YT';
import Shuffle from '../../Utils/Shuffle';
// import './YTPlayer.css';
import QuizYT from '../QuizYT/QuizYT';
import texts from '../../../texts.json';
import Confetti from 'react-confetti';
import Loading from '../../Utils/Loading/Loading';
class YoutubeRoundTwo extends Component {
    state = {
        gameStatus: 'playing',
        player: '',
        title: '',
        fourShuffledSongsTitles: [],
        showButtons: true,
        giveMeConfetti: false,
        loadingDisplayClass: 'show',
        playerDisplayClass: 'hide',
        videoId: ''
        // done: false,
    }

    // access to player in all event handlers via event.target
    VideoOnReady = (event) => {
    console.log(event.target)
    // plays the video at 10s, in case the video has the name of the song at the start
    const {videoId } = this.props;
    

    this.setState({
        // title:event.target.playerInfo.videoData.title,
        // videoUrl: event.target.playerInfo.videoUrl,
        // passing the title props to be written the same way
        // title,
        loadingDisplayClass: 'hide',
        playerDisplayClass: 'show',
        videoId: videoId
    });

    // store the array with 3 random titles in a const

    // const threeTitlesArr = det;

    // // push inside the name of the title that is playing now

    // threeTitlesArr.push(title);
    // // suffle all titles
    // const fourShuffledSongsTitles = Shuffle(threeTitlesArr);
    // keep the new array , where is included the title of the playing song in the state

    // this.setState({
    //     fourShuffledSongsTitles,
    // });
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
    // getting the title from the object to coincide with the other names that will be in the buttons
    // VideoOnPlay = () => {

    //     const { title, det } = this.props;
    //     // alert(event.target.playerInfo.videoData.title)

    //     this.setState({
    //         // title:event.target.playerInfo.videoData.title,
    //         // videoUrl: event.target.playerInfo.videoUrl,
    //         // passing the title props to be written the same way
    //         title,
    //     });

    //     // store the array with 3 random titles in a const

    //     const threeTitlesArr = det;

    //     // push inside the name of the title that is playing now

    //     threeTitlesArr.push(title);
    //     // suffle all titles
    //     const fourShuffledSongsTitles = Shuffle(threeTitlesArr);
    //     // keep the new array , where is included the title of the playing song in the state

    //     this.setState({
    //         fourShuffledSongsTitles,
    //     });
    //     // console.log(fourShuffledSongsTitles);
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

    // the video unmute when the answer is right and the button disappear
    // unmuteVideo = () => {

    //     const { player } = this.state;

    //     player.unMute();
    //     this.setState({
    //         showButtons: false,
    //         giveMeConfetti:true
    //     });
    // }

    stopPlaying = () => {
        this.setState({ gameStatus: 'gameOver' });
    }
    
        restartYoutube = () => {
            this.setState({
                gameStatus: 'playing',
            });
        }
        // renderPlayer = () => {
        //     const { data } = this.state;
        //     return data.map( (item, index) =>
        //        <YTPlayer
        //            key={index}
        //            type={item.videoId}
        //            data={data}
        //        />
        //     );
        //    }
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
            const { videoId } = this.props;

            const { giveMeConfetti, loadingDisplayClass, playerDisplayClass, gameStatus} = this.state;
    
    
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
                    {/* <div>
                            {giveMeConfetti &&
                                        <Confetti
                                        width={window.innerWidth}
                                        height={window.innerHeight}
                                        recycle={false}
                                        gravity={0.6}
                                        />}
                            <QuizYT
                                questions={questions}
                                stopPlaying={stopPlaying}
                                showConfetti={this.showConfetti}
                            />
                    </div>
                        } */}
                        </div>
                )}


            if (gameStatus === 'gameOver') {
                return (
                    <div>
                         <GameEnded currentGame="youtube" />
                    </div>
                )
            }
          }
          }

export default YoutubeRoundTwo;
