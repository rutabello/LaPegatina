import React, {Component} from 'react';
import Sound from 'react-sound';
import {Link} from 'react-router-dom';

import '../../App.css'
import './MistakesList.css';
import './Quiz.css'
import Button from '../Buttons/Button';
import PlayerCountdown from '../PlayerCountdown/PlayerCountdown';
import Shuffle from '../Utils/Shuffle';
import Spotify from '../Utils/Spotify';


class Quiz extends Component {

    spotifyObject = {}
    display = ""
    chosenSong = ""
    coincidence = false
    answerCountShow= false
    unknownSongs= []
    

    state = {
        songNames:[],
        currentSong: {
            preview_url: "",
            name: "",
          
        },
  
        clave: "37i9dQZEVXbMDoHDwVN2tF",
        german: "6HiZDoQlmYliE3RhFm4Fek",
        world: "37i9dQZEVXbMDoHDwVN2tF",

        hideResults: true,
        correctAnswers: 0,
        total: 0,
        songUrl: "",
        playerState: Sound.status.PLAYING,
        playing: false,
        replayingSong: ""
    }

    /**
     * This fn returns an array with 4 song names randomly including the current song 
     * @param {string} currentSong - name of the current song playing
     * @returns {array} songsToDisplay
     */
    getSongsToDisplay = (currentSongName) => {

        var allSongsArr = this.spotifyObject.tracks.items.map(function (item){
            return item.track.name
        });
        
        var filteredSongsArr = allSongsArr.filter(function (song) {
            return song !== currentSongName
        });
    
        var shuffledFilterSongsArr = Shuffle(filteredSongsArr);
    
        var fourNonShuffledSongsArr = shuffledFilterSongsArr.slice(0, 3); // actually 3
        fourNonShuffledSongsArr.push(currentSongName); // now 4
        
        var fourShuffledSongsArr = Shuffle(fourNonShuffledSongsArr)
        

        return fourShuffledSongsArr;
    }

    chooseSongs = () => {

        this.setState({
            songNames: this.getSongsToDisplay(this.state.currentSong.name)
        })
    }

    setNewRandomSong = () => {
        
        var randomSong = this.spotifyObject.tracks.items[Math.floor(Math.random()*this.spotifyObject.tracks.items.length)].track;

        this.setState({
            currentSong: {
                preview_url: randomSong.preview_url,
                name: randomSong.name
            },
            songNames: this.getSongsToDisplay(randomSong.name),
            hideResults: true, //I don't think thingthis line is needed since it's not changing any
            total: this.state.total +1,
            playerState: Sound.status.STOPPED
        });
    }

    writeChosenSong = (songName) => {
        this.chosenSong = songName;
    }

    checkCoincidence = () => {  //Checks if the user has chosen the right song or not
        
        this.coincidence = this.state.currentSong.name === this.chosenSong

        if (this.coincidence !== true) { 
            this.unknownSongs.push(this.state.currentSong.name)
        }
    
        this.setState({
            hideResults: false,
            correctAnswers: this.coincidence ? (this.state.correctAnswers +1) : this.state.correctAnswers
        })
    }

    showAnswerCount = () => {
        this.answerCountShow= true
    }


    getSongUrl = (songName) => {
        
        var allTracksArr = this.spotifyObject.tracks.items.map((item) => { //allTracksArr is an array made of tracks (each one, in an object, and as much tracks as songs are in the playlist)
            return item.track
        })

        var oneTrackArr = allTracksArr.filter((track) => {  //trackArr is an array with an only index which is an object with 2 properties: name and preview_url
            return track.name === songName //Returns an array with the (only) object that fulfills this condition
        })

        var songUrl = oneTrackArr[0].preview_url

        this.setState({
            songUrl: songUrl,
            playerState: Sound.status.PLAYING,
            playing: true,
            replayingSong: songName
        })


        // return this.spotifyObject.tracks.items.filter(item => item.track.name === songName)[0].preview_url This does the same as getSongUrl but with much less lines
    }

    stopMusic = () => {
        this.setState({
            playerState: Sound.status.STOPPED,
            playing: false
        })
    }


    async componentDidMount() {
        this.spotifyObject = await Spotify.getPlaylist(this.state.clave);
    }


    render () {
        
        return (
            <div className="QuestionAndAnswers">

                <div className="countdown">
                    <PlayerCountdown
                        onMusicPlays={this.chooseSongs}
                        setNewRandomSong={this.setNewRandomSong}
                        songURL={this.state.currentSong.preview_url} 
                        coincidence={this.checkCoincidence}
                        showAnswerCount={this.showAnswerCount}
                    />
                </div>

                <div className={"fourButtons " + (this.state.hideResults ? 'forceGrayColor' : "")} >
                    {this.state.songNames.map((songName) => {
                        return (
                            <Button 
                                key={songName} 
                                printedSong={songName} 
                                onClick={() => this.writeChosenSong(songName)}//We write it like this so the function writeChoosenSong isn't executed when the button is rendered but when the button is clicked. Different than what we're doing some lines above in the onMusicPlays, setNewRandomSong or songURL
                                currentSong={this.state.currentSong.name}
                            />
                        )
                    })
                    }
                </div>
                <div>
                    <p className={this.answerCountShow ? "show" : "hide"}>Right answers: {this.state.correctAnswers}  out of {this.state.total}</p>
                </div>
                <div className={this.unknownSongs.length > 0 ? "show" : "hide"}>
                    <h4 id="mis-title">Learn from your mistakes</h4>
                    <ul id="mistakes">
                        {this.unknownSongs.map((song) => {
                            return (
                                <div className="list">
                                    <li className="mistake">{song} 
                                        <button className="repeat-button" onClick={this.state.playing ? () => this.stopMusic() : () => this.getSongUrl(song)}>
                                            {this.state.playing ? "Pause" : "Listen again"} 
                                        </button>
                                        {/* We write it with an arrow function instead of a 'normal' function so we can avoid an infinite loop when setting the state */}
                                        {/* Still need to figure out how to start playing a new song if the user doesn't pause the old song before */}
                                    </li>
                                </div>
                            )
                        })}
                    </ul>
                    <Sound 
                        url={this.state.songUrl}
                        playStatus={this.state.playerState}
                        autoLoad
                    />
                  
                </div>
                <h3><Link to="/">Out the door</Link></h3>
                    <h3 className="hideGame"><Link to="quiz">Quiz</Link></h3>
                    <h3><Link to="map">Discover more places</Link></h3>
                    <button onClick={this.changeList}>Click</button>
            </div>
        )
    };
}


export default Quiz;