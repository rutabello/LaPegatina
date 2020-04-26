import React from 'react';
import '../../../App.css';
import '../Spotify.css';
import Sound from 'react-sound';
import Button from '../Button/Button';
import Shuffle from '../../Utils/Shuffle';
import Spotify from '../../Utils/Spotify';
import PlayerCountdown from '../PlayerCountdown/PlayerCountdown';
// import ShareTheGame from '../../ShareTheGame/ShareTheGame';
import ListenedSongs from '../ListenedSongs/ListenedSongs';
import texts from '../../../texts.json';
import SocialMedia from '../../SocialMedia/SocialMedia';


class SpotifyRoundOne extends React.Component {

  // We have the object coming from the API call, here
  spotifyObject = {};

  // This array contains the songs coming from the spotifyObject that DO ave a preview_url
  spotifyFilteredObjArr = [];

  // Here the actual game mechanics start
  chosenSong = '';

  coincidence = false;

  answerCountShow= false;

  // All the songs that the user guessed wrong are pushed into this array
  unknownSongs= [];

  NUMBER_OF_SONGS_TO_PLAY_WITH = 3

  // OFFICIAL_NUMBER_OF_SONGS_TO_PLAY_WITH = this.NUMBER_OF_SONGS_TO_PLAY_WITH - 1

  state = {

      songNames: [],
      currentSong: {
          preview_url: '',
          name: '',
          uri: '',
      },

      hideResults: true,
      correctAnswers: 0,
      score: 0,
      songUrl: '',
      playerState: Sound.status.PLAYING,
      playing: false,
      playlistID: '37i9dQZF1DZ06evO2EUrsw',
      currentAttempt: 0,
  }

  // API call to get the playlist data.
  async componentDidMount() {

      const { playlistID } = this.state;

      this.spotifyObject = await Spotify.getPlaylist(playlistID);
      this.filterRightSongsFromSpotifyObject();
      this.setNewRandomSong();
  }

  /**
   * This fn returns an array with 4 song names randomly including the current song
   * @param {string} currentSong - name of the current song playing
   * @returns {array} songsToDisplay
  */
getSongsToDisplay = (currentSongName) => {

    const allSongsArr = this.spotifyObject.tracks.items.map((item) => item.track.name);

    const filteredSongsArr = allSongsArr.filter((song) => (song !== currentSongName));

    const shuffledFilterSongsArr = Shuffle(filteredSongsArr);

    const fourNonShuffledSongsArr = shuffledFilterSongsArr.slice(0, 3); // actually 3
    fourNonShuffledSongsArr.push(currentSongName); // now 4

    const fourShuffledSongsArr = Shuffle(fourNonShuffledSongsArr);

    return fourShuffledSongsArr;
}

chooseSongs = () => {

    const { currentSong } = this.state;

    this.setState({
        songNames: this.getSongsToDisplay(currentSong.name),
    });
}

setNewRandomSong = () => {

    const { currentAttempt } = this.state;

    if (this.spotifyFilteredObjArr.length === 0) {

        return;
    }

    if (currentAttempt >= this.NUMBER_OF_SONGS_TO_PLAY_WITH) {
        this.setState({
            currentAttempt: currentAttempt + 1,
        });

        return;
    }

    const randomSong = this.spotifyFilteredObjArr[Math.floor(Math.random() * this.spotifyFilteredObjArr.length)].track;

    this.spotifyFilteredObjArr = this.spotifyFilteredObjArr.filter((song) => song.track.id !== randomSong.id);

    this.setState({
        currentSong: {
            preview_url: randomSong.preview_url,
            name: randomSong.name,
            uri: randomSong.uri,
        },
        songNames: this.getSongsToDisplay(randomSong.name),
        hideResults: true,
        playerState: Sound.status.STOPPED,
        currentAttempt: currentAttempt + 1,
    });
}

writeChosenSong = (songName) => {
    this.chosenSong = songName;
}

checkCoincidence = () => {

    const { currentAttempt } = this.state;

    if (currentAttempt > this.NUMBER_OF_SONGS_TO_PLAY_WITH) {
        return;
    }

    const { currentSong, correctAnswers, score } = this.state;

    this.coincidence = currentSong.name === this.chosenSong;

    this.unknownSongs.push(currentSong);

    this.setState({
        hideResults: false,
        correctAnswers: this.coincidence ? (correctAnswers + 1) : correctAnswers,
        score: this.coincidence ? (score + 394) : score,
    });
}

showAnswerCount = () => {
    this.answerCountShow = true;
}

getSongUrl = (songName) => {

    // allTracksArr is an array made of tracks (each one, in an object,
    // and as much tracks as songs are in the playlist)
    const allTracksArr = this.spotifyFilteredObjArr.map((item) => item.track);

    // trackArr is an array with an only index which is an object with 2 properties: name and preview_url

    const oneTrackArr = allTracksArr.filter((track) => (track.name === songName));
    // Returns an array with the (only) object that fulfills this condition

    const songUrl = oneTrackArr[0].preview_url;

    this.setState({
        songUrl,
        playerState: Sound.status.PLAYING,
        playing: true,
        // return this.spotifyObject.tracks.items.filter(item => item.track.name === songName)[0].preview_url
        // This does the same as getSongUrl but with much less lines
    });
}

stopMusic = () => {
    this.setState({
        playerState: Sound.status.STOPPED,
        playing: false,
    });
}

filterRightSongsFromSpotifyObject = () => {
    this.spotifyFilteredObjArr = this.spotifyObject.tracks.items.filter((item) => item.track.preview_url !== null);
}

setPlayingToFalse = () => {
    this.setState({
        playing: false,
    });
}


render() {

    const { score, currentSong, hideResults, songNames, name, songUrl, playerState, playing, currentAttempt } = this.state;

    const { language } = this.props;

    return (
        <section>
            {/* <ShareTheGame score={score} /> */}
            {currentAttempt <= this.NUMBER_OF_SONGS_TO_PLAY_WITH
                ? (
                    <div className="show">
                        <div className="QuestionAndAnswers">
                            <div className="Countdown">
                                <PlayerCountdown
                                    language={language}
                                    onMusicPlays={this.chooseSongs}
                                    setNewRandomSong={this.setNewRandomSong}
                                    songURL={currentSong.preview_url}
                                    coincidence={this.checkCoincidence}
                                    showAnswerCount={this.showAnswerCount}
                                    currentAttempt={currentAttempt}
                                    totalAttempts={this.NUMBER_OF_SONGS_TO_PLAY_WITH}
                                />
                            </div>
                            <div className="spotify-game-question">
                                <p>{texts[language].spotifyRoundTwoQuestion}</p>
                            </div>
                            <div className={`FourButtons ${hideResults ? 'forceGrayColor' : ''}`}>
                                {songNames.map((songName) => (
                                    <Button
                                        key={songName}
                                        printedSong={songName}
                                        // We write it like this so the function writeChoosenSong isn't executed when the button is
                                        // rendered but when the button is clicked. Different than what we're doing some lines
                                        // above in the onMusicPlays, setNewRandomSong or songURL
                                        onClick={() => this.writeChosenSong(songName)}
                                        currentSong={currentSong.name}
                                    />
                                ))}
                            </div>
                            <div id="counter" className="instruct">
                                <p className={this.answerCountShow ? 'show' : 'hide'}>
                                    {/* {texts[language].attempts} */}
                                    {currentAttempt}
                                    {' / '}
                                    {/* {texts[language].outofText} */}
                                    {this.NUMBER_OF_SONGS_TO_PLAY_WITH}
                                </p>
                                <br />
                                {/* <p className={this.answerCountShow ? 'show' : 'hide'}>
                                    {texts[language].pointsText}
                                    {score}
                                </p> */}
                                <hr />
                            </div>
                        </div>
                    </div>
                )
                : (
                    <div>
                        <ListenedSongs
                            username={name}
                            unknownSongs={this.unknownSongs}
                            language={language}
                            url={songUrl}
                            playStatus={playerState}
                            onClick={playing}
                            score={score}
                            roundfrom="two"
                        />
                        <div className="social-media-follow-buttons">
                            <SocialMedia
                                language={language}
                            />
                        </div>
                    </div>
                )}
            {/* {name !== undefined
                ? <Link to='spotifyRoundTwo'>Go to Spotify round two</Link>
                : <Register />
            } */}
        </section>
    );
}
}

export default SpotifyRoundOne;
