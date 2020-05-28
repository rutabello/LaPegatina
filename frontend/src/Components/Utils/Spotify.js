/* eslint-disable consistent-return */
// !!! IMPORTANT: No push to github as long as the clientId is visible in the files!
// import { TOKEN } from './token'
const clientId = '3eb5731fa4ad44c3b1ac5b8b69c2cf5d';

let accessToken;


const Spotify = {
	getaccessToken() {
		if (accessToken) {
			return accessToken;
		}

		const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
		const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
		const redirectUri = window.location.href;

		if (accessTokenMatch && expiresInMatch) {
			// eslint-disable-next-line prefer-destructuring
			accessToken = accessTokenMatch[1];

			const expiresIn = Number(expiresInMatch[1]);
			window.setTimeout(() => {
				accessToken = '';
			}, expiresIn * 1000);
			window.history.pushState('Access Token', null, '/');
			// This clears the parameters, allowing me to grab a new access token when it expires.
			return accessToken;
		}

		const accessUrl =
			`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token` +
			`&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
		window.location = accessUrl;
		return false;
	},

	getPlaylist(list) {
		const ID = list;
		const accessToken = Spotify.getaccessToken();
		const headers = { Authorization: `Bearer ${accessToken}` };

		return fetch(`https://api.spotify.com/v1/playlists/${ID}`, { headers }).then((response) => response.json());
	},

	savePlaylist(name, trackUris) {
		if (!name || !trackUris.length) {
			return;
		}

		const accessToken = Spotify.getaccessToken();
		const headers = { Authorization: `Bearer ${accessToken}` };
		let userId;

		return fetch('https://api.spotify.com/v1/me', { headers })
			.then((response) => response.json())
			.then((jsonResponse) => {
				userId = jsonResponse.id;
				return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
					headers,
					method: 'POST',
					body: JSON.stringify({ name })
				})
					.then((response) => response.json())
					.then((jsonResponse) => {
						const playlistId = jsonResponse.id;
						return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
							headers,
							method: 'POST',
							body: JSON.stringify({ uris: trackUris })
						});
					});
			});
	},

	//JAIME'S NEW CODE
	getLaPegatinaAlbums() {
		const laPegatinaID = '4xvB67czbtvemGVXGa81oK';

		// const ID = country;
		const accessToken = Spotify.getaccessToken();
		const headers = { Authorization: `Bearer ${accessToken}` };

		return fetch(`https://api.spotify.com/v1/artists/${laPegatinaID}/albums`, { headers })
			.then((response) => response.json())
			.then((responseJSON) => {
				//Keep the informaton that we need of the JSON in a variable. We only need .items
				let albumsArray = responseJSON.items;

				//Delete the singles from the list. We only want albums
				albumsArray = albumsArray.filter((albumObject) => {
					return albumObject.album_type === 'album';
				});

				//Array we are using to check if the names of the albums are repeated or not
				const namesArray = [];

				//Array where we are keeping all the albums as objects after we filter them to delete the repeated ones
				const filteredArray = [];

				//Check if the album names are not repeated. If they are not, then push the whole object album to filteredArray
				albumsArray.forEach((albumObject) => {
					if (!namesArray.includes(albumObject.name)) {
						namesArray.push(albumObject.name);
						filteredArray.push(albumObject);
					}
				});

				//Return the array of album objects
				return filteredArray;
			});
	},

	getSongsFromAlbum(albumID) {
		// GET https://api.spotify.com/v1/albums/{id}/tracks

		const accessToken = Spotify.getaccessToken();
		const headers = { Authorization: `Bearer ${accessToken}` };

		return fetch(`https://api.spotify.com/v1/albums/${albumID}/tracks?limit=50`, { headers }).then((response) =>
			response.json()
		);
	},

	getAlbumsImages(albumID) {
		// GET https://api.spotify.com/v1/albums/{id}/tracks

		const accessToken = Spotify.getaccessToken();
		const headers = { Authorization: `Bearer ${accessToken}` };

		return fetch(`https://api.spotify.com/v1/albums/${albumID}`, { headers }).then((response) => response.json());
	},

	getAlbumID(albumIDInt) {

        let albumID;

		switch (albumIDInt) {
			case 'Un secreto a voces':
				albumID = '0KHcK2Qehfh1imPj5NJXZz';
				break;
			case 'Ahora o nunca':
				albumID = '1gVTdZJaemKysGPHgMQfvD';
				break;
			case 'La Gran Pegatina Live 2016':
				albumID = '3yAo1PKKqDKK3JzaZNAIVU';
				break;
			case 'Revulsiu':
				albumID = '1QhYAMuClrXwodJbdWr9kb';
				break;
			case 'Eureka!':
				albumID = '6wTQ7zBcv3hwG3jSvBb6nI';
				break;
			case 'Xapomelön':
				albumID = '5YGUW9OJPCoT3bUySE50X7';
				break;
			case 'Via Mandarina':
				albumID = '17xrJ6CwY9OEtof17QV9OB';
				break;
			case 'Al Carrer!':
				albumID = '4GDvxuvYI9ZrnBOiE8of32';
				break;
        }

        return albumID;
	}

	// getAlbumID
};



export default Spotify;
