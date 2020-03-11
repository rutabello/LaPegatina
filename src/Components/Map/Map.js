import React from 'react'
import {Link} from 'react-router-dom';
import '../../App.css';
import '../Quiz/Quiz.css'
import './Map.css';
import '../Home/Button.css'
import './../MistakesList.css';
import Button from '../Buttons/Button';
import Shuffle from '../Utils/Shuffle';
import Spotify from '../Utils/Spotify';
import PlayerCountdown from '../PlayerCountdown/PlayerCountdown';
import Sound from 'react-sound';


class Map extends React.Component {

  spotifyObject = {} // We have the object coming from the API call, here
  spotifyFilteredObjArr = [] //This array contains the songs coming from the spotifyObject that DO ave a preview_url
  display = ""
  chosenSong = ""
  coincidence = false
  answerCountShow= false
  unknownSongs= [] //All the songs that the user guessed wrong are pushed into this array

  state = {

    beforeGame: '',
    startGame: "Great, you chose ",
    game: "hideGame",
    gameStart: "showGame",
    map: "map",
    showMap: true,
    buttonClass: "hide",
  
    songNames:[],
    currentSong: {
        preview_url: "",
        name: "",
    },  

    hideResults: true,
    correctAnswers: 0,
    total: 0,
    songUrl: "",
    playerState: Sound.status.PLAYING,
    playing: false,
    replayingSong: "",

    clave: "37i9dQZF1DZ06evO2EUrsw",
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
    var randomSong = this.spotifyFilteredObjArr[Math.floor(Math.random()*this.spotifyFilteredObjArr.length)].track;

    this.setState({
      currentSong: {
        preview_url: randomSong.preview_url,
        name: randomSong.name
      },
      songNames: this.getSongsToDisplay(randomSong.name),
      hideResults: true,
      total: this.state.total +1,
      playerState: Sound.status.STOPPED
    });
  }
  
  writeChosenSong = (songName) => {
    this.chosenSong = songName;
  }
  
  checkCoincidence = () => {  
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
    
      var allTracksArr = this.spotifyFilteredObjArr.map((item) => { //allTracksArr is an array made of tracks (each one, in an object, and as much tracks as songs are in the playlist)
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
      }) // return this.spotifyObject.tracks.items.filter(item => item.track.name === songName)[0].preview_url This does the same as getSongUrl but with much less lines
  }
  
  stopMusic = () => {
    this.setState({
      playerState: Sound.status.STOPPED,
      playing: false
    })
  }
  
  filterRightSongsFromSpotifyObject = (spotifyObject) => {
    this.spotifyFilteredObjArr = this.spotifyObject.tracks.items.filter(function (item) {
    return item.track.preview_url !== null})
  }
  
  setPlayingToFalse = () => {
      this.setState({
          playing: false
      })
  }
  
  async componentDidMount() {      
    this.spotifyObject = await Spotify.getPlaylist(this.state.clave);
    this.filterRightSongsFromSpotifyObject()
  }
            
  componentDidUpdate  = async  (prevProps, prevState) => {
    if (prevState.clave !== this.state.clave) {
        
      this.spotifyObject = await Spotify.getPlaylist(this.state.clave)
      this.filterRightSongsFromSpotifyObject();
    }
  }

            
  show = (event) => {
    let discover = this.state.gameStart;
    let disguise = false;
    let start = this.state.startGame + event.target.id;
    let newList = event.target.className; 

    this.setState({
      game: discover,
      showMap: disguise,
      beforeGame: start,
      clave: newList,
      buttonClass: "show",
    })
  }

  showMapHideButton = () => {
    this.setState ({
      showMap: true,
      buttonClass: "hide",
      beforeGame: '',
      game: "hideGame", 
    })
    
  }

  render() {
    return (
      <section>
        <div className="show"> 
          <div className="QuestionAndAnswers">
            <div className="Countdown">
              <PlayerCountdown
                onMusicPlays={this.chooseSongs}
                setNewRandomSong={this.setNewRandomSong}
                songURL={this.state.currentSong.preview_url} 
                coincidence={this.checkCoincidence}
                showAnswerCount={this.showAnswerCount}
              />
            </div>
            <div className={"FourButtons " + (this.state.hideResults ? 'forceGrayColor' : "")} >
              {this.state.songNames.map((songName) => {
                return (
                  <Button 
                    key={songName} 
                    printedSong={songName} 
                    onClick={() => this.writeChosenSong(songName)}//We write it like this so the function writeChoosenSong isn't executed when the button is rendered but when the button is clicked. Different than what we're doing some lines above in the onMusicPlays, setNewRandomSong or songURL
                    currentSong={this.state.currentSong.name}
                  />
                )
              })}
            </div>
            <div id="counter" className="instruct">
              <p className={this.answerCountShow ? "show" : "hide"}>Right answers: {this.state.correctAnswers}  out of {this.state.total}</p>
            </div>
            <div className={this.unknownSongs.length > 0 ? "show" : "hide"}>
                <h4 className="instruct">Learn from your mistakes</h4>
                <ul id="mistakes" className="instruct">  
                  {this.unknownSongs.map((song) => {
                    return (
                      <div className="list">
                        <li className="mistake">{song} 
                          <button className="repeat-button" onClick={this.state.playing ? () => this.stopMusic() : () => this.getSongUrl(song)}>
                            {this.state.playing ? "Pause" : "Listen again"} 
                          </button> {/* We write it with an arrow function instead of a 'normal' function so we can avoid an infinite loop when setting the state */}
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
          </div>
          </div>
          <h2 className="instruct" id="youchoose">{this.state.beforeGame}</h2>
          <h3><Link className="link" to="/">Out the door!</Link></h3>   
          <h2 className="instruct" id="youchoose" >{this.state.beforeGame}</h2>
          <div id="backtomap">
            <button className={this.state.buttonClass} onClick={() => this.showMapHideButton()}>Show me the map again!</button>
          </div>
      </section>
    );
  }
}

export default Map;


