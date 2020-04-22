import React from 'react';
import './Rounds.css';
import '../../App.css';
import '../Home/Home.css';
import { Link } from 'react-router-dom';

class Rounds extends React.Component {

  state = {

    ronda1 : "Eso es ronda 1",
    ronda2 : "Eso es ronda 2",
    page: "hideGame",
    spotify: false,
    youtube: false,
    instagram: false,
    

  }

  startSpotify = () => {
  
    let spotStart = true;
    let start = "screen";

    this.setState({
      spotify: spotStart,
      page: start
    })

  }

  startYoutube = () => {
  
    let youStart = true;
    let start = "screen";

    this.setState({
      youtube: youStart,
      page: start
    })

  }

  startInsta = () => {
  
    let instaStart = true;
    let start = "screen";

    this.setState({
      instagram: instaStart,
      page: start
    })
  }



  render (props) {
    return( 

    <div>
     
     <div className={this.state.page}>
       
      <p className="playWith title">{this.state.ronda1}</p>
      <Link className={this.state.youtube || this.state.instagram  ? "hideGame" : 'title'}  to="spotifyroundone">start</Link>
      <Link className={this.state.spotify || this.state.instagram ?  "hideGame" : 'title'}  to="youtuberoundone">start</Link>
      <Link className={this.state.spotify || this.state.youtube ?  "hideGame" : 'title'}   to="instagramroundone">start</Link>
       
    </div>
       
       
          <div className="btns">
            <button  onClick={this.startSpotify}>{this.props.languageSpotify}</button>
            <button  onClick={this.startYoutube}>{this.props.languageYoutube}</button>
            <button  onClick={this.startInsta} >{this.props.languageInstagram}</button>
            <button >  <a className="title" href="https://playwith.es">{this.props.languageWorld}</a></button>
                      
            </div>
   </div>
    )
  }
}

export default Rounds;