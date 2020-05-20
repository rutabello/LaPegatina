import React, { Component } from 'react';
import YouTube from 'react-youtube';
import Button from '../Button/Button_YT';
import Shuffle from '../../Utils/Shuffle';
import './YTPlayer.css';
import QuizYT from '../QuizYT/QuizYT';
import texts from '../../../texts.json';
import Confetti from 'react-confetti';
import Loading from '../../Utils/Loading/Loading';

// import YTCountdown from '../YTCountdown/YTCountdown';
// let info=props.info
// // console.log(props.det)
// console.log(info)
class YTPlayer extends Component {
    state = {
        player: '',
        title: '',
        fourShuffledSongsTitles: [],
        showButtons: true,
        giveMeConfetti: false,
        loadingDisplayClass: 'show',
        playerDisplayClass: 'hide'
        // done: false,
    }

    // access to player in all event handlers via event.target
    VideoOnReady = (event) => {
    console.log(event.target)
    // plays the video at 10s, in case the video has the name of the song at the start
    const { title, det } = this.props;


    this.setState({
        // title:event.target.playerInfo.videoData.title,
        // videoUrl: event.target.playerInfo.videoUrl,
        // passing the title props to be written the same way
        title,
        loadingDisplayClass: 'hide',
        playerDisplayClass: 'show'
    });

    // store the array with 3 random titles in a const

    const threeTitlesArr = det;

    // push inside the name of the title that is playing now

    threeTitlesArr.push(title);
    // suffle all titles
    const fourShuffledSongsTitles = Shuffle(threeTitlesArr);
    // keep the new array , where is included the title of the playing song in the state

    this.setState({
        fourShuffledSongsTitles,
    });
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

        const { stopPlaying } = this.props;

        stopPlaying();
    }
    // video can't be paused, it automaticlly plays the video
    VideoOnPause =(event)=>{
        const { player } = this.state;

        player.playVideo();

    }

    // the video unmute when the answer is right and the button disappear
    unmuteVideo = () => {

        const { player } = this.state;

        player.unMute();
        this.setState({
            showButtons: false,
            giveMeConfetti:true
        });
    }


    render() {
        const opts = {
            height: '450',
            width: '900',

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

        const { videoId, questions, stopPlaying, language } = this.props;

        const { showButtons, fourShuffledSongsTitles, title, giveMeConfetti, loadingDisplayClass, playerDisplayClass } = this.state;

        //

            return (
                <div className="video-and-questions">
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
                    <div className='buttons-yt-pregunta'>
                    {showButtons
                        ? (
                            <div className={`${playerDisplayClass}`}>
                                <h4 className="quiz-text">{texts[language].youtubeQuestion}</h4>
                                <div className="btn-4-YT">
                                    {giveMeConfetti &&
                                        <Confetti
                                        width={window.innerWidth}
                                        height={window.innerHeight}
                                        recycle={false}
                                        gravity={0.6}
                                        />}
                                    {fourShuffledSongsTitles.map((songTitle) => (

                                        <Button
                                            unmute={this.unmuteVideo}
                                            key={songTitle}
                                            displayedSong={songTitle}
                                            currentSong={title}
                                            showConfetti={this.showConfetti}
                                        />
                                    ))}
                                </div>
                                </div>
                        )
                        //  /* : <YTCountdown questions={this.props.questions} stopPlaying={this.props.stopPlaying}/> } */}
                        : (
                            <div>
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
                        )}
                    </div>

                </div>
            );
        // }
    }
}


export default YTPlayer;
