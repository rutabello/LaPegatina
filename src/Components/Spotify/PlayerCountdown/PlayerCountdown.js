import React, { Component } from 'react';
import Sound from 'react-sound';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import './PlayerCountdown.css';
import texts from '../../../texts.json';

const SONG_TIMER_DURATION = 13;

class PlayerCountdown extends Component {

  // Properties
  state = {
      playStatus: Sound.status.STOPPED,
      isPlaying: false,
      uniqueKey: Date.now(),
  }

  countdownIsDisplayed = false

  // Methods

  componentDidMount() {
      this.playMusicStartTimer();
  }

  playMusicStartTimer = () => {

      const { showAnswerCount, setNewRandomSong, coincidence } = this.props;

      this.countdownIsDisplayed = true;

      // This makes the answer counter appear only when you've started playing the game and not before
      showAnswerCount();

      setNewRandomSong();

      this.setState({
      // This makes the countdown start counting when the new state is set (on play clicked) instead of when
      // the page is loaded
          uniqueKey: Date.now(),
          playStatus: Sound.status.PLAYING,
          isPlaying: true,
      // This makes the 'play' button disappear once you click on it
      });

      // sets the length and specifics of the timer

      setTimeout(() => {

          this.stopMusic();

          coincidence();

      }, SONG_TIMER_DURATION * 1000);
  }

  renderTime = (value) => {

      const { language } = this.props;

      if (value === 0) {
          return <button type="button" className="next-button" onClick={this.playMusicStartTimer}>{texts[language].newSong}</button>;
      }

      return (
          <div className="timer">
              <div className="value">{value}</div>
              {/* <div className="text">{texts[this.props.language].secondsText}</div> */}
          </div>
      );
  }

  stopMusic = () => {

      this.setState({
          playStatus: Sound.status.STOPPED,
      });
  }


  render() {

      const { songURL } = this.props;

      const { playStatus, uniqueKey, isPlaying } = this.state;

      return (
          <div>
              <Sound
                  url={songURL}
                  playStatus={playStatus}
                  autoLoad
              />

              <div className={this.countdownIsDisplayed ? 'show' : 'hide'}>
                  <CountdownCircleTimer
                      key={uniqueKey}
                      isPlaying={isPlaying}
                      durationSeconds={SONG_TIMER_DURATION}
                      colors={[['#004777', 0.33], ['#F7B801', 0.33], ['#A30000']]}
                      renderTime={this.renderTime}
                      size={90}
                  />
              </div>
          </div>
      );
  }
}

export default PlayerCountdown;

// Put the information below in a README.md file later!

// Circle Countdown Info https://www.npmjs.com/package/react-countdown-circle-timer

// Number Countdown Info https://www.npmjs.com/package/react-countdown-now

// React Sound Info https://www.npmjs.com/package/react-sound
