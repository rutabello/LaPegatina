import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SpotifyRoundOne from './Components/Spotify/SpotifyRoundOne/SpotifyRoundOne';
import SpotifyRoundTwo from './Components/Spotify/SpotifyRoundTwo/SpotifyRoundTwo';
import Home from './Components/Home/Home';
import InstagramRoundTwo from './Components/Instagram/InstagramRoundTwo/InstagramRoundTwo';
import InstagramRoundOne from './Components/Instagram/InstagramRoundOne/InstagramRoundOne';
import SocialMedia from './Components/SocialMedia/SocialMedia';
import Team from './Components/Team/Team';
import Navbar from './Components/Navbar/Navbar';
import YoutubeRoundOne from './Components/Youtube/YoutubeRoundOne/YoutubeRoundOne';
import YoutubeRoundTwo from './Components/Youtube/YoutubeRoundTwo/YoutubeRoundTwo';
// import ListenedSongs from './Components/Spotify/ListenedSongs/ListenedSongs';
import User from './Components/Register/User/User';
import MyProvider, { MyContext } from './context/MyProvider';
import MembersAccounts from './Components/Instagram/InstagramRoundTwo/MembersAccounts';
import './App.css';


class App extends React.Component {

  state = {
      selectedLanguage: 'spanish',
  }

setLanguage = (lang) => {
    this.setState({
        selectedLanguage: lang,
    });
}

render() {

    const { selectedLanguage } = this.state;

    return (
        <MyProvider>
            <MyContext.Consumer>
                {(context) => (

                    <div>
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={(props) => (
                                    <div>
                                        <Navbar language={context.state.language} pagein="home" onChangeLanguage={this.setLanguage} />
                                        <Home language={selectedLanguage} {...props} />
                                        <div className="social-media-follow-buttons">
                                            <SocialMedia language={selectedLanguage} {...props} />
                                        </div>
                                    </div>
                                )}
                            />

                            <Route
                                path="/spotifyroundone"
                                render={(props) => (
                                    <div>
                                        <Navbar pagein="game" />
                                        <SpotifyRoundOne language={selectedLanguage} {...props} />
                                    </div>
                                )}
                            />

                            <Route
                                path="/spotifyroundtwo"
                                render={(props) => (
                                    <div>
                                        <Navbar pagein="game" />
                                        <SpotifyRoundTwo language={selectedLanguage} {...props} />
                                    </div>
                                )}
                            />

                            {/* <Route
        path="/listenedsongs"
        render={(props) => (
            <div>
                <Navbar onChangeLanguage={this.setLanguage} />
                <ListenedSongs language={selectedLanguage} {...props} />
            </div>
        )}
    /> */}

                            <Route
                                path="/team"
                                render={(props) => (
                                    <div>
                                        <Navbar />
                                        <Team language={selectedLanguage} {...props} />
                                    </div>
                                )}
                            />

                            <Route
                                path="/instagramroundone"
                                render={(props) => (
                                    <div>
                                        <Navbar pagein="game" />
                                        <InstagramRoundOne language={selectedLanguage} {...props} />
                                    </div>
                                )}
                            />

                            <Route
                                path="/instagramroundtwo"
                                render={(props) => (
                                    <div>
                                        <Navbar pagein="game" />
                                        <InstagramRoundTwo language={selectedLanguage} {...props} />
                                    </div>
                                )}
                            />

                            <Route
                                path="/youtuberoundone"
                                render={(props) => (
                                    <div>
                                        <Navbar pagein="game" />
                                        <YoutubeRoundOne language={selectedLanguage} {...props} />
                                    </div>
                                )}
                            />

                            <Route
                                path="/youtuberoundtwo"
                                render={(props) => (
                                    <div>
                                        <Navbar pagein="game" />
                                        <YoutubeRoundTwo language={selectedLanguage} {...props} />
                                    </div>
                                )}
                            />

                            <Route
                                path="/members"
                                render={(props) => (
                                    <div>
                                        <Navbar />
                                        <MembersAccounts language={selectedLanguage} {...props} />
                                    </div>
                                )}
                            />

                            <Route
                                path="/user"
                                render={(props) => (
                                    <div>
                                        <Navbar />
                                        <User language={selectedLanguage} {...props} />
                                    </div>
                                )}
                            />
                        </Switch>
                    </div>

                )}


            </MyContext.Consumer>
        </MyProvider>
    );
}
}

export default App;
