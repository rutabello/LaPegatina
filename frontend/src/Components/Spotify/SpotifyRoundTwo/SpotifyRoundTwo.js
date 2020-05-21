/* eslint-disable no-console */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
import React from 'react';
import Confetti from 'react-confetti';
import '../../../App.css';
import '../Spotify.css';
import Sound from 'react-sound';
import Button from '../Button/Button';
import Shuffle from '../../Utils/Shuffle';
import Spotify from '../../Utils/Spotify';
import PlayerCountdown from '../PlayerCountdown/PlayerCountdown';
import GameEnded from '../../GameEnded/GameEnded';
import texts from '../../../texts.json';
import SocialMedia from '../../SocialMedia/SocialMedia';
import Navbar from '../../Navbar/Navbar';

class spotifyRoundTwo extends React.Component {
    // We have the object coming from the API call, here
    spotifyObject = {};

    // This array contains the songs coming from the spotifyObject that DO have a preview_url
    spotifyFilteredObjArr = [];

    // Here the actual game mechanics start
    chosenSong = '';

    coincidence = false;

    answerCountShow = false;

    // All the songs that the user guessed wrong are pushed into this array
    unknownSongs = [];

    NUMBER_OF_SONGS_TO_PLAY_WITH = 3;

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
        // albumID: '0KHcK2Qehfh1imPj5NJXZz',
        currentAttempt: 0,
        noTracks: true,
        playlistName: 'Mis favoritos',
        giveMeConfetti: false,
        selectedAlbum: this.props.location.state.selectedAlbum,
    };

    // API call to get the playlist data.
    async componentDidMount() {

        const { selectedAlbum } = this.state;

        const selectedAlbumID = await Spotify.getAlbumID(selectedAlbum);

        this.spotifyObject = await Spotify.getSongsFromAlbum(selectedAlbumID);
        await this.filterRightSongsFromSpotifyObject();
        this.setNewRandomSong();
    }

    /**
     * This fn returns an array with 4 song names randomly including the current song
    * @param {string} currentSong - name of the current song playing
    * @returns {array} songsToDisplay
    */

    getSongsToDisplay = (currentSongName) => {
        const allSongsArr = this.spotifyObject.items.map((item) => item.name);

        const filteredSongsArr = allSongsArr.filter((song) => song !== currentSongName);

        const shuffledFilterSongsArr = Shuffle(filteredSongsArr);

        const fourNonShuffledSongsArr = shuffledFilterSongsArr.slice(0, 3); // actually 3
        fourNonShuffledSongsArr.push(currentSongName); // now 4

        const fourShuffledSongsArr = Shuffle(fourNonShuffledSongsArr);

        return fourShuffledSongsArr;
    };

    setNewRandomSong = () => {
        const { currentAttempt } = this.state;

        // if (this.spotifyFilteredObjArr.length === 0) {

        //     return;
        // }

        if (currentAttempt >= this.NUMBER_OF_SONGS_TO_PLAY_WITH) {
            this.setState({
                currentAttempt: currentAttempt + 1,
            });

            return;
        }

        console.log('spotifyFilteredObjArr', this.spotifyFilteredObjArr);
        const randomNumber = Math.floor(Math.random() * this.spotifyFilteredObjArr.length);
        // const randomSong = this.spotifyFilteredObjArr[randomNumber];
        const randomSong = this.spotifyFilteredObjArr[randomNumber];
        let nextSong;
        if (this.spotifyFilteredObjArr[randomNumber + 1] === undefined) {
            nextSong = this.spotifyFilteredObjArr[0];
        } else {
            nextSong = this.spotifyFilteredObjArr[randomNumber + 1];
        }

        console.log('randomSong', randomSong);
        console.log('nextSong', nextSong);


        this.spotifyFilteredObjArr = this.spotifyFilteredObjArr.filter((song) => song.id !== randomSong.id);
        randomSong !== undefined
            && this.setState({
                currentSong: {
                    preview_url: randomSong.preview_url, // Aqui va el peview_url de la cancion que tiene que sonar
                    name: nextSong.name,
                    playingSong: randomSong.name,
                    uri: randomSong.uri,
                },
                songNames: this.getSongsToDisplay(nextSong.name), // Aqui va el nombre de la cancion respuesta correcta
                hideResults: true,
                playerState: Sound.status.STOPPED,
                currentAttempt: currentAttempt + 1,
                giveMeConfetti: false,
            });
    };

    writeChosenSong = (songName) => {
        this.chosenSong = songName;
    };

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
            correctAnswers: this.coincidence ? correctAnswers + 1 : correctAnswers,
            score: this.coincidence ? score + 167 : score,
        });

        this.coincidence && this.showConfetti();
    };

    // all the logic concerning a individual user playlist

    addTrack = (track) => {
        const { playlistTracks } = this.state;

        const songIndex = track.target.id;
        const selectedSong = this.unknownSongs[songIndex];

        const mySongs = [...playlistTracks];
        mySongs.push(selectedSong);

        this.setState({
            playlistTracks: mySongs,
            noTracks: false,
            // addedSong: true
        });
    };

    removeTrack = (track) => {
        const { playlistTracks } = this.state;

        const newTracks = [...playlistTracks];
        const index = track.target.id;

        newTracks.splice(index, 1);

        this.setState({
            playlistTracks: newTracks,
        });
    };

    updatePlaylistName = (name) => {
        const newName = name.target.value;

        this.setState({
            playlistName: newName,
        });
    };

    savePlaylist = () => {
        const { playlistTracks, playlistName } = this.state;

        const trackUris = playlistTracks.map((track) => track.uri);

        Spotify.savePlaylist(playlistName, trackUris).then(() => {
            this.setState({
                playlistName: 'Pegatinas Best',
                playlistTracks: [],
            });
        });
    };

    // "normal" game logic continues

    showAnswerCount = () => {
        this.answerCountShow = true;
    };

    getSongUrl = (songName) => {
        // allTracksArr is an array made of tracks (each one, in an object,
        // and as much tracks as songs are in the playlist)
        const allTracksArr = this.spotifyFilteredObjArr.map((item) => item.track);

        // trackArr is an array with an only index which is an object with 2 properties: name and preview_url

        const oneTrackArr = allTracksArr.filter((track) => track.name === songName);
        // Returns an array with the (only) object that fulfills this condition

        const songUrl = oneTrackArr[0].preview_url;

        this.setState({
            songUrl,
            playerState: Sound.status.PLAYING,
            playing: true,
            // return this.spotifyObject.tracks.items.filter(item => item.track.name === songName)[0].preview_url
            // This does the same as getSongUrl but with much less lines
        });
    };

    stopMusic = () => {
        this.setState({
            playerState: Sound.status.STOPPED,
            playing: false,
        });
    };

    filterRightSongsFromSpotifyObject = async () => {
        this.spotifyFilteredObjArr = await this.spotifyObject.items.filter((item) => item.preview_url !== null);
        console.log('desde el otro lado el spotifyFilteredObjArr', this.spotifyFilteredObjArr);
    };

    setPlayingToFalse = () => {
        this.setState({
            playing: false,
        });
    };

    showConfetti = () => {
        this.setState({
            giveMeConfetti: true,
        });
    };

    render() {
        const {
            giveMeConfetti,
            score,
            currentSong,
            hideResults,
            songNames,
            currentAttempt,
        } = this.state;

        console.log('paco', 'render again spotifyRound 2')

        const { language } = this.props;

        return (
            <section>
                {currentAttempt <= this.NUMBER_OF_SONGS_TO_PLAY_WITH ? (
                    <div className="show">
                        <div className="QuestionAndAnswers">
                            <div className="Countdown">
                                <PlayerCountdown
                                    language={language}
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
                                    <div>
                                        {// CONFETTI logic to show the confetti component, we only show the confetti component if (and only if) the confetti variable is true
                                        // CONFETTI check the confetti package and the demo related on their webpage to understand and play around with the props I used
                                            giveMeConfetti && (
                                                <Confetti
                                                    width={window.innerWidth}
                                                    height={window.innerHeight}
                                                    recycle={false}
                                                    gravity={0.6}
                                                />
                                            )
                                        }
                                        <Button
                                            key={songName}
                                            printedSong={songName}
                                            // We write it like this so the function writeChoosenSong isn't executed when the button is
                                            // rendered but when the button is clicked. Different than what we're doing some lines
                                            // above in the onMusicPlays, setNewRandomSong or songURL
                                            onClick={() => this.writeChosenSong(songName)}
                                            currentSong={currentSong.name}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div id="counter" className="instruct">
                                <p className={this.answerCountShow ? 'show' : 'hide'}>
                                    {`${currentAttempt} / ${this.NUMBER_OF_SONGS_TO_PLAY_WITH}`}
                                </p>
                                <br />
                                <hr />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <Navbar addedClass="fixTop" pagein="any" />
                        <GameEnded score={score} currentGame="spotify" language={language} />

                        <div className="social-media-follow-buttons">
                            <SocialMedia language={language} />
                        </div>
                    </div>
                )}
            </section>
        );
    }
}

export default spotifyRoundTwo;
