import React from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
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
// import Countries from '../Utils/Countries';


class Map extends React.Component {

  spotifyObject = {}
  spotifyFilteredObjArr = []
  display = ""
  chosenSong = ""
  coincidence = false
  answerCountShow= false
  unknownSongs= []

  state = {

    beforeGame: '',
    startGame: "Great, you chose ",
    game: "hideGame",
    gameStart: "showGame",
    map: "map",
    showMap: true,
  
    songNames:[],
    currentSong: {
        preview_url: "",
        name: "",
    },
    clave: "37i9dQZF1DX7YCknf2jT6s",
    german: "37i9dQZEVXbJiZcmkrIHGU",
    spain: "37i9dQZEVXbNFJfN1Vw8d9",
    uk: "153yGNYdzvyCZxzDnIzNUx",
    italy: "44SmkW2zYTkTxVXBTZU7In",
    france: "23psvx6vUY6pmJHxE5yagM",
    sweden: "0cv343uhXAtvjJP4Gnowuj",
    romania: "37i9dQZEVXbNZbJ6TZelCq",
    russia: "1YWZENg7270nSPEm5i0mSk",
    moldavia: "4JuhvFePRTzgFA2J1zhRJg",
    turkey: "0rkeWiJ7L3BRuXDWqmgZSZ",
    australia: "6m3jFNfRNxNnrIhOuV7I0D",
    india: "37i9dQZEVXbLZ52XmnySJg",
    congo: "6OrCOUcHTeJeg0NQRlEVMK",
    usa: "37i9dQZF1DXbITWG1ZJKYt",
    peru: "1U8CDNWLUL65u9g77sKCys",
    ecuador: "5XqV4c48IyUfwNYo2XAWxK",
    argentina: "37i9dQZEVXbMMy2roB9myp",
    brasil: "37i9dQZEVXbMXbN3EUUhlg",
    catalunya: "2uh5yoMISpxTTPyes2mEPg",
    portugal: "6FD2g7R1tezpU8QnhJ3FsX",
    austria: "7r36EDSbzLnsGHtjV2qkcf",
    china: "0n9pUnDvJEIavvDfGnJqJl",
    czech: "37i9dQZEVXbIP3c3fqVrJY",
    palikir: "37i9dQZF1DZ06evO2EUrsw",


    

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
      })


      // return this.spotifyObject.tracks.items.filter(item => item.track.name === songName)[0].preview_url This does the same as getSongUrl but with much less lines
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
      clave: newList
    })
  }

  render() {
    return (
      <section>
        <h2 className={this.state.showMap === true ? "map-title" : "hide"}>Choose a country!</h2>
        <div className="map">            
          <div className={this.state.showMap === true ? "show" : "hide"}>
            <LeafletMap 
              center={[50, 10]}
              zoom={4}
              maxZoom={10}
              attributionControl={true}
              zoomControl={true}
              doubleClickZoom={true}
              scrollWheelZoom={true}
              dragging={true}
              animate={true}
              easeLinearity={0.35}
            >
              <TileLayer
                url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
              />
              
              <Marker position={[50, 10]}>
                <Popup>
                  <p id="Germany!" className="37i9dQZEVXbJiZcmkrIHGU" onClick={this.show} >Get to know Germany's top 50!</p> 
                </Popup>
              </Marker>

              <Marker position={[42, 13]}>
                <Popup>
                  <p id="Italy!" className="44SmkW2zYTkTxVXBTZU7In" onClick={this.show}>Get to know Italy's top 50!</p> 
                </Popup>
              </Marker>

              <Marker position={[46, 2 ]}>
                <Popup>
                  <p id="France!" className="23psvx6vUY6pmJHxE5yagM" onClick={this.show}>Get to know France's top 50!</p> 
                </Popup>
              </Marker>

              <Marker position={[40, -3 ]}>
                <Popup>
                  <p id="Spain!" className="37i9dQZEVXbNFJfN1Vw8d9" onClick={this.show}>Get to know Spain's top 50!</p> 
                </Popup>
              </Marker>

              <Marker position={[53, -3 ]}>
                <Popup>
                  <p id="UK!" className="153yGNYdzvyCZxzDnIzNUx" onClick={this.show}>Get to know Britan top 50!</p> 
                </Popup>
              </Marker>           
            
              <Marker position={[60, 17 ]}>
                <Popup>
                  <p id="Sweden!" className="0cv343uhXAtvjJP4Gnowuj" onClick={this.show}>Get to know Swedens top 50!</p> 
                </Popup>
              </Marker>

              <Marker position={[46, 25 ]}>
                <Popup>
                  <p id="Romania!" className="37i9dQZEVXbNZbJ6TZelCq" onClick={this.show}>Get to know Romanias top 50!</p> 
                </Popup>
              </Marker>

              <Marker position={[61.5, 105.3 ]}>
                <Popup>
                  <p id="Russia!" className="1YWZENg7270nSPEm5i0mSk" onClick={this.show}>Get to know Russias top 50!</p> 
                </Popup>
              </Marker>

              <Marker position={[47, 29]}>
                <Popup>
                  <p id="Moldavia!" className="4JuhvFePRTzgFA2J1zhRJg" onClick={this.show}>Get to know Moldavias top 50!</p> 
                </Popup>
              </Marker>

              <Marker position={[39, 35]}>
                <Popup>
                  <p id="Turkey!" className="0rkeWiJ7L3BRuXDWqmgZSZ" onClick={this.show}>Get to know Turkeys top 50!</p> 
                </Popup>
              </Marker>

              <Marker position={[-25, 134]}>
                <Popup>
                  <p id="Australia!" className="6m3jFNfRNxNnrIhOuV7I0D" onClick={this.show}>Get to know Australias top 50!</p> 
                </Popup>
              </Marker>

              <Marker position={[21, 79]}>
                <Popup>
                  <p id="India!" className="37i9dQZEVXbLZ52XmnySJg" onClick={this.show}>Get to know Indias top 50!</p> 
                </Popup>
              </Marker>

              <Marker position={[-1.5, 22]}>
                <Popup>
                  <p id="Congo!" className="6OrCOUcHTeJeg0NQRlEVMK" onClick={this.show}>Get to know Congos top 50!</p> 
                </Popup>
              </Marker>

              <Marker position={[37, -96]}>
                <Popup>
                  <p id="USA!" className="37i9dQZF1DXbITWG1ZJKYt" onClick={this.show}>Get to know USAs top 50!</p> 
                </Popup>
              </Marker>

              <Marker position={[-9, -75]}>
                <Popup>
                  <p id="Peru!" className="1U8CDNWLUL65u9g77sKCys" onClick={this.show}>Get to know Perus top 50!</p> 
                </Popup>
              </Marker>

              <Marker position={[-1.83, -78.2]}>
                <Popup>
                  <p id="Ecuador!" className="5XqV4c48IyUfwNYo2XAWxKs" onClick={this.show}>Get to know Ecuador's top 50!</p> 
                </Popup>
              </Marker>              
                          
              <Marker position={[-38, -64]}>
                <Popup>
                  <p id="Argentinia!" className="37i9dQZEVXbMMy2roB9myp" onClick={this.show}>Get to know Argentinias top 50!</p> 
                </Popup>
              </Marker>                    
                            
              <Marker position={[-14, -52]}>
                <Popup>
                  <p id="Brasil!" className="37i9dQZEVXbMXbN3EUUhlg" onClick={this.show}>Get to know Brasils top 50!</p> 
                </Popup>
              </Marker>

              <Marker position={[41, 0.5]}>
                <Popup>
                  <p id="Catalunya!" className="2uh5yoMISpxTTPyes2mEPg" onClick={this.show}>Get to know Catalunyas top 50!</p> 
                </Popup>
              </Marker>
              
              <Marker position={[39, -8]}>
                <Popup>
                  <p id="Portugal!" className="6FD2g7R1tezpU8QnhJ3FsX" onClick={this.show}>Get to know Portugals top 50!</p> 
                </Popup>
              </Marker>
              
              <Marker position={[47.5, 14.5]}>
                <Popup>
                  <p id="Austria!" className="7r36EDSbzLnsGHtjV2qkcf" onClick={this.show}>Get to know Austrias top 50!</p> 
                </Popup>
              </Marker>
                                  
              <Marker position={[36, 104]}>
                <Popup>
                  <p id="China!" className="0n9pUnDvJEIavvDfGnJqJl" onClick={this.show}>Get to know Chinas top 50!</p> 
                </Popup>
              </Marker>
            
              <Marker position={[50, 15.4]}>
                <Popup>
                  <p id="Czech Republic!" className="37i9dQZEVXbIP3c3fqVrJY" onClick={this.show}>Get to know Czech Republics top 50!</p> 
                </Popup>
              </Marker>

              <Marker position={[6.917222, 158.158889]}>
                <Popup>
                  <p id="Palikir!" className="37i9dQZF1DZ06evO2EUrsw" onClick={this.show}>Get to know Palikirs top 50!</p> 
                </Popup>
              </Marker>
            </LeafletMap>
          </div>
        <div className={this.state.game}> 
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
            <div className="instruct">
              <p class={this.answerCountShow ? "show" : "hide"}>Right answers: {this.state.correctAnswers}  out of {this.state.total}</p>
            </div>
            <div class={this.unknownSongs.length > 0 ? "show" : "hide"}>
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
          </div>
          <h3><Link className="link" to="/">Out the door!</Link></h3>   
          <h2 className="instruct" id="youchoose" >{this.state.beforeGame}</h2>
            { /* <h3 className={this.state.showMap == true ? "hide" : "show"} id="btn-game" >Show me the map again!</h3> */}
              <h3><Link className="link" to="/">Out the door!</Link></h3>   
      </section>
    );
  }
}

export default Map;


