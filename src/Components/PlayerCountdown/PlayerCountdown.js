import React, {Component} from 'react';
import Sound from 'react-sound';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import './PlayerCountdown.css';

const SONG_TIMER_DURATION = 10;

class PlayerCountdown extends Component {

  // Properties
  state = {
    playStatus: Sound.status.STOPPED,
    isPlaying: false,
    playClicked: false,
    uniqueKey: Date.now()
  }

  countdownIsDisplayed = false

  // Methods
  playMusicStartTimer = () => {

    this.countdownIsDisplayed = true;

    //This makes the answer counter appear only when you've started playing the game and not before
    this.props.showAnswerCount(); 

    this.props.setNewRandomSong();

    this.setState({
      //This makes the countdown start counting when the new state is set (on play clicked) instead of when 
       //the page is loaded
      uniqueKey: Date.now(), 
     
      playStatus: Sound.status.PLAYING,
      isPlaying: true,
      //This makes the 'play' button disappear once you click on it
      playClicked: true 
    })

    //sets the length and specifics of the timer

    setTimeout(() => {

      this.stopMusic()

      this.props.coincidence()

    }, SONG_TIMER_DURATION * 1000);
  }

  renderTime = value => {
    if (value === 0) {
      return <button className="next-button" onClick={this.playMusicStartTimer}>Otra!</button>;
    }

    return (
      <div className="timer">
        <div className="value">{value}</div>
        <div className="text">segundos</div>
      </div>
    );
  }

  stopMusic = () => {

    this.setState({
      playStatus: Sound.status.STOPPED
    })
  }

  componentDidMount() {
    this.playMusicStartTimer();
  }

  render () {
    return (
      <div>
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

//Put the information below in a README.md file later!

// Circle Countdown Info https://www.npmjs.com/package/react-countdown-circle-timer

// Number Countdown Info https://www.npmjs.com/package/react-countdown-now

// React Sound Info https://www.npmjs.com/package/react-sound