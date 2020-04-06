import React, {Component}from 'react';
import YTPlayer from '../YTPlayer/YTPlayer';
import '../YTGame/YTGame.css';
import getPlayListItems from '../Api/Api'
import Shuffle from '../../Utils/Shuffle'


  console.log (getPlayListItems())

class YTGame extends Component {
state ={
  data: {},
  oneVideoID:'',
  randomVideoId:'',
  playlistItemsArr: [],
  currentSongTitle:'',
  fourNonShuffledSongsTitles:[]
}
      
componentDidMount() {
  // getting from the pending promise the data
  let promise = getPlayListItems();
  promise.then((data) => {
    const modifiedData = getPlayListItems(data);
    // save the data into the state
    this.setState ({
      data: modifiedData,
  })
  console.log(data)
    const arrayPlaylist=[];
    //Recover the videoIDs from the data(api) and push in an array
     data.items.map((element)=>{
      //here be the if statement
        arrayPlaylist.push(element.snippet.resourceId.videoId)
      return arrayPlaylist
    })
    console.log(arrayPlaylist)
    // create the random from one videoid
  const randomVideoId = arrayPlaylist[Math.floor(Math.random()*arrayPlaylist.length)]
  this.setState({randomVideoId:randomVideoId,
  // currentSongTitle:
  })
  console.log(randomVideoId)
  // console.log(currentSongTitle)

  //create the array with the title of the songs for the button shuffle(tu put in other buttons)
   const arraySongTitles=[];
   data.items.map((element)=>{
     arraySongTitles.push(element.snippet.title)
       return arraySongTitles
     })
          console.log(arraySongTitles)
          //shuffle function that reorganize the order of the song title
const suffledArraySongTitles =  Shuffle(arraySongTitles)
const fourNonShuffledSongsTitles = suffledArraySongTitles.slice(0, 3); // actually 3
 console.log(fourNonShuffledSongsTitles)

  this.setState({
    fourNonShuffledSongsTitles:fourNonShuffledSongsTitles
  })
})
 
}


render(){
  return (
    <div className='yt-all'>
    <div className='cover-title'><span className='instuctionsYT'>CLICK ON THE RIGHT ANSWEAR!</span>
    </div>


    <div className="yt-player">
      <YTPlayer det={this.state.fourNonShuffledSongsTitles} videoId= {this.state.randomVideoId}/> 
    
      
    </div>
    </div>
  )
}
}

export default YTGame