//!!! IMPORTANT: No push to github as long as the clientId is visible in the files!
// import { TOKEN } from './token'
const clientId = "";
// const redirectUri = 'http://playwith.es'; 
const redirectUri = 'http://localhost:3000/game';
let accessToken;


const Spotify = {


  getaccessToken () {
    if (accessToken){
      return accessToken ;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      // This clears the parameters, allowing me to grab a new access token when it expires.
      window.history.pushState('Access Token', null, '/'); 
      return accessToken ;
    
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  getPlaylist(list) {
    let ID = list;
    const accessToken = Spotify.getaccessToken();                   
    const headers = { Authorization: `Bearer ${accessToken}` };

    return fetch(`https://api.spotify.com/v1/playlists/${ID}`, {headers: headers})
    .then(response => {
      return response.json();
    });
  },


  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }

    const accessToken = Spotify.getaccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    return fetch('https://api.spotify.com/v1/me', {headers: headers}
    ).then(response => response.json()
    ).then(jsonResponse => {
      userId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: name})
      }).then(response => response.json()
      ).then(jsonResponse => {
        const playlistId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackUris})
        });
      });
    });
  }
}
 
// This way you can access the returned object. "collaborative" is just the first property that appears,
// probably nothing we will actually use, just as an example of how to access it.
// const play = Spotify.getPlaylist().then((value) => {console.log(value.collaborative)});

export default Spotify;