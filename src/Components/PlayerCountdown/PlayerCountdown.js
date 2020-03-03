import React, {Component} from 'react';
import Sound from 'react-sound';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import './PlayerCountdown.css'
const SONG_TIMER_DURATION = 10;



class PlayerCountdown extends Component {

  // Properties
  state = {
    playStatus: Sound.status.STOPPED,
    isPlaying: false,
    playClicked: false,
    uniqueKey: Date.now()
  }


  exampleRef = React.createRef(); // Create the ref
  countdownIsDisplayed = false

 

  // Methods
  playMusicStartTimer = () => {

    this.countdownIsDisplayed = true;

    this.props.showAnswerCount(); //This makes the answer counter appear only when you've started playing the game and not before

    this.props.setNewRandomSong();

    this.setState({
      uniqueKey: Date.now(), //This makes the countdown start counting when the new state is set (on play clicked) instead of when the page is loaded
      playStatus: Sound.status.PLAYING,
      isPlaying: true,
      playClicked: true //This makes the 'play' button disappear once you click on it
    })

    setTimeout(() => {

      this.stopMusic()

      this.props.coincidence()

    }, SONG_TIMER_DURATION * 1000);
  }

  renderTime = value => {
    if (value === 0) {
      return <button className="next-button" onClick={this.playMusicStartTimer}>>></button>;
    }

    return (
      <div className="timer">
        <div className="value">{value}</div>
        <div className="text">seconds</div>
      </div>
    );
  }

  stopMusic = () => {

    this.setState({
      playStatus: Sound.status.STOPPED
    })
  }


  // Render
  render () {
    return (
      <div>

        {
          this.state.playClicked
            ? null
            : <button id="play-button" onClick={this.playMusicStartTimer}>Play</button>
        }

        <Sound 
          url={this.props.songURL}
          playStatus={this.state.playStatus}
          autoLoad
        />

        <div className={this.countdownIsDisplayed? "show" : "hide"}>
          <CountdownCircleTimer
            key={this.state.uniqueKey}
            isPlaying={this.state.isPlaying}
            durationSeconds={SONG_TIMER_DURATION}
            colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
            renderTime={this.renderTime}
            size={120}
          />
        </div>
      </div>
    )
  }
};

export default PlayerCountdown;



// Circle Countdown Info https://www.npmjs.com/package/react-countdown-circle-timer

// Number Countdown Info https://www.npmjs.com/package/react-countdown-now

// React Sound Info https://www.npmjs.com/package/react-sound