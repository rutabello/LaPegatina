import React, { Component } from 'react';
import YouTube from 'react-youtube';
import Button from '../Button/Button_YT';
import Shuffle from '../../Utils/Shuffle';
import '../YTPlayer/YTPlayer.css'

// console.log(props.det) 
class YTPlayer extends Component {
  state ={
    data : {},
    title: '',
    videoUrl: '',
    isMuted: true,
    fourShuffledSongsTitles:[],
    fourNonShuffledSongsTitles:[]
  }

  VideoOnReady=(event)=>{
    // let player = event.target;
    console.log (event.target)
    console.log (event.target.playerInfo)
    console.log (event.target.playerInfo.videoData.title)
    console.log(event.target.playerInfo.videoUrl)
    // access to player in all event handlers via event.target
    // event.target.playVideo();
    event.target.seekTo(20)//plays the video at 10s, in case the video has the name of the song at the start
    event.target.mute()
    //that prints in consolecthe name of the song
    // this.setState({
    //   data :{
    //     info: event.target.playerInfo.videoData.title, //stored the title into a const
    //     toString : () => {
    //       return 'data'
    //     } 
    //   }
    // })
  //  console.log(this.state.data)
    }
  //   this.sendButtonSelection = e => {
  //     this.setState({buttonSelection: e.target.value});
  //     console.log(e.target.value);
  // };
VideoOnPlay=(event)=>{
    // access to player in all event handlers via event.target
    // const player = event.target
    // const info= event.data
    // console.log(info)
    // alert(player)
    // player.seekTo(20)
    // alert(event.target.playerInfo.videoData.title)
    this.setState({
      title:event.target.playerInfo.videoData.title,
      videoUrl:event.target.playerInfo.videoUrl
  })
  // store the array with 3 random titels in a const
const threeTitlesArr= this.props.det    
console.log(threeTitlesArr)   
//push inside the name of the title that is playing now 
threeTitlesArr.push(this.state.title)
//suffle all titles
const fourShuffledSongsTitles=Shuffle(threeTitlesArr)
//keep the new array , where is included the title of the playing song in the state
this.setState({
 fourShuffledSongsTitles:fourShuffledSongsTitles
})
console.log(fourShuffledSongsTitles)
}

// getVideoUrl = (link) => {
//   return link 
//   ? 
//   <button href={link} target="_blank" >
//   <span >Pàgina oficial</span> 
//  </button>
//   : ""
// }
  // unmute=()=>{
  //   if (this.state.title ===this.displayedSong){
  //     alert('true')
  //     this.setState({
  //       isMuted:false
  //     })
  //   }

  // }

  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        modestbranding: 1,//not big yt branding
        controls: 0,//the control not displayed
        // mute: 1,// this mutes automaticly the video(in combination with the hidden control, the user can't unmute)
        loop:1,
        start: 20,//from where the video starts(at 20 s in case the title is at the beginning)
        // end: 90,
        rel: 0 //getting only related videos from the channel
      }
      
    };
    console.log(opts)
   
    const { videoId } = this.props;
    
    console.log ({videoId})
 
    return (
      <div>
      <div>  
      <YouTube
          videoId={videoId}
          opts={opts}
          onReady={this.VideoOnReady}
          onPlay={this.VideoOnPlay}
        /></div>
      
      <p>Hello {this.state.title}</p>
      {/* the button that redirect on the yt page */}
      <button className='btn-see-video' onClick={()=> window.open(this.state.videoUrl, "_blank")}>
      <span className= 'text-btn-see-video'>See full video on Youtube</span></button>
      {this.state.fourShuffledSongsTitles.map((songTitle) => {
                return (
                  <Button  
                 
                    displayedSong={songTitle}
                   
                    currentSong={this.state.title}
                  />)})}
      </div>
    );

  }
}


export default YTPlayer;
