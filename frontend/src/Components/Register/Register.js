/* eslint-disable max-len */
import React, { Component } from 'react';
//import './Register.css';
import '../Rounds/Rounds.css';
import { Link } from 'react-router-dom';
import { MyContext } from '../../context/MyProvider';
import '../Home/Home.css';
import '../Register/Register.css';
import Spotify from '../Utils/Spotify';

class Register extends Component {
	state = {
		link: 'hide',
		albums: [],
		selectedAlbum: ''
	};

	showLink = () => {
		this.setState({
			// link: 'showIt',
			link: 'screen'
		});
	};

	async getSpotifyAlbums() {
		const unSecretoAVoces = await Spotify.getAlbumsImages('0KHcK2Qehfh1imPj5NJXZz');

		//Ahora o nunca
		const ahoraONunca = await Spotify.getAlbumsImages('1gVTdZJaemKysGPHgMQfvD');

		//La Gran Pegatina Live 2016
		const laPegatinaLive2016 = await Spotify.getAlbumsImages('3yAo1PKKqDKK3JzaZNAIVU');

		//Revulsiu
		const revulsiu = await Spotify.getAlbumsImages('1QhYAMuClrXwodJbdWr9kb');

		//Eureka!
		const eureka = await Spotify.getAlbumsImages('6wTQ7zBcv3hwG3jSvBb6nI');

		//Xapomelon
		const xapomelon = await Spotify.getAlbumsImages('5YGUW9OJPCoT3bUySE50X7');

		//Via Mandarina
		const viaMandarina = await Spotify.getAlbumsImages('17xrJ6CwY9OEtof17QV9OB');

		//Al carrer
		const alCarrer = await Spotify.getAlbumsImages('4GDvxuvYI9ZrnBOiE8of32');

		this.setState({
			albums: [
				unSecretoAVoces,
				ahoraONunca,
				laPegatinaLive2016,
				revulsiu,
				eureka,
				xapomelon,
				viaMandarina,
				alCarrer
			]
		});
	}



	render() {
		const { currentGame, score } = this.props;

		const { link } = this.state;

		if (currentGame === 'spotify') {
			this.getSpotifyAlbums();
			return (
				<MyContext.Consumer>
					{(context) => (
						<div>
							<div className={link}>
								<div className="screenDiv">
									<div className="screenDiv__firstDiv">
										<h1 className="round2Title">Ronda 2</h1>
										<h2>Choose the album you want to play with!</h2>
										<Link to={{ pathname: '/spotifyRoundTwo', state: { selectedAlbum: this.state.selectedAlbum } }}>
											<button
												className="button1"
												type="button"
												onClick={() => context.addPoints(score)}
											>
												Start
											</button>
										</Link>
									</div>
									<div className="allAlbumsDiv">
										{this.state.albums.map((albumObject) => {
											return (
												<button className="buttonAlbum" onClick={(event)=>this.setState({selectedAlbum: event.target.alt})}>
													<img src={albumObject.images[0].url} alt={albumObject.name} className="blackBorder" />
												</button>
											);
										})}
									</div>
								</div>
							</div>
							<button type="button" onClick={this.showLink}>
								Suma puntos y sigue jugando
							</button>
						</div>
					)}
				</MyContext.Consumer>
			);
		}

		if (currentGame === 'spotify1') {
			return (
				<MyContext.Consumer>
					{(context) => (
						<div>
							<div className={link}>
								<h1 className="playWith title">Ronda 1</h1>
								<Link to="spotifyroundone">
									<button className="button1" type="button" onClick={() => context.addPoints(score)}>
										Start
									</button>
								</Link>
							</div>
							<button type="button" onClick={this.showLink}>
								Juega con Música
							</button>
						</div>
					)}
				</MyContext.Consumer>
			);
		}

		if (currentGame === 'youtube') {
			return (
				<MyContext.Consumer>
					{(context) => (
						<div>
							<div className={link}>
								<h1 className="playWith">Ronda 2</h1>
								<p>Instrucciones</p>
								<Link to="youtuberoundone">
									<button className="button1" type="button" onClick={() => context.addPoints(score)}>
										Start
									</button>
								</Link>
							</div>
							<button type="button" onClick={this.showLink}>
								Juega una segunda ronda
							</button>
						</div>
					)}
				</MyContext.Consumer>
			);
		}

		if (currentGame === 'youtube1') {
			return (
				<MyContext.Consumer>
					{(context) => (
						<div>
							<div className={link}>
								<h1 className="playWith">Ronda 1</h1>
								<p>Instrucciones</p>
								<Link to="youtuberoundone">
									<button className="button1" type="button" onClick={() => context.addPoints(score)}>
										Start
									</button>
								</Link>
							</div>
							<button type="button" onClick={this.showLink}>
								Juega con Videos
							</button>
						</div>
					)}
				</MyContext.Consumer>
			);
		}

		if (currentGame === 'instagram') {
			return (
				<MyContext.Consumer>
					{(context) => (
						<div>
							<div className={link}>
								<h1 className="playWith">Ronda 2</h1>
								<Link to="instagramroundtwo">
									<button className="button1" type="button" onClick={() => context.addPoints(score)}>
										Start
									</button>
								</Link>
							</div>
							<button type="button" onClick={this.showLink}>
								Juega una segunda Ronda
							</button>
						</div>
					)}
				</MyContext.Consumer>
			);
		}

		if (currentGame === 'instagram1') {
			return (
				<MyContext.Consumer>
					{(context) => (
						<div>
							<div className={link}>
								<h1 className="playWith">Ronda 1</h1>
								<Link to="instagramroundone">
									<button className="button1" type="button" onClick={() => context.addPoints(score)}>
										Start
									</button>
								</Link>
							</div>
							<button type="button" onClick={this.showLink}>
								Juega con Fotos
							</button>
						</div>
					)}
				</MyContext.Consumer>
			);
		}
		return null;
	}
}

export default Register;
