// !!! IMPORTANT: No push to github as long as the clientId is visible in the files!
// import { TOKEN } from './token'
const clientId = '5a36a3d1f9bc4712b321e760813bb8f6';

let accessToken;
// for connection with the map: connect playlist id to the markers and save it in a const to insert it later in the
// getplaylist() method.

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
            window.setTimeout(() => { accessToken = ''; }, expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            // This clears the parameters, allowing me to grab a new access token when it expires.
            return accessToken;
        }

        const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token`
            + `&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
        window.location = accessUrl;
        return false;
    },

    getPlaylist(country) {
        const ID = country;
        const accessToken = Spotify.getaccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };

        return fetch(`https://api.spotify.com/v1/playlists/${ID}`, { headers })
            .then((response) => (response.json()
            ));
    },

    changeID() {
        const country = '6HiZDoQlmYliE3RhFm4Fek';
        this.setState({
            playlistID: country,
        });
    },
};

// This way you can access the returned object. "collaborative" is just the first property that appears,
// probably nothing we will actually use, just as an example of how to access it.
// const play = Spotify.getPlaylist().then((value) => {console.log(value.collaborative)});

export default Spotify;
