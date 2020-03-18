// !!! IMPORTANT: No push to github as long as the clientId is visible in the files!
const clientId = "5a36a3d1f9bc4712b321e760813bb8f6";

// const redirectUri = 'http://playwith.es'; 
const redirectUri = 'http://localhost:3000/game';

let accessToken = null;

const Spotify = {

  getAccessToken () {
    if (accessToken){
      // We already have a valid one
      return accessToken;
    }

    // Otherwise, let's fetch one
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/game'); // This clears the parameters, allowing me to grab a new access token when it expires.
      return accessToken
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  getPlaylist(ID) {
    const accessToken = Spotify.getAccessToken();                   
    const headers = { Authorization: `Bearer ${accessToken}` };

    return fetch(`https://api.spotify.com/v1/playlists/${ID}`, {headers: headers})
    .then(response => {
      return response.json();
    });
  }    
}
 
// This way you can access the returned object. "collaborative" is just the first property that appears,
// probably nothing we will actually use, just as an example of how to access it.
// const play = Spotify.getPlaylist().then((value) => {console.log(value.collaborative)});

export default Spotify;