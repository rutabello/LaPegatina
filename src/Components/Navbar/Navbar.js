import React from 'react';
import {Link} from 'react-router-dom';

import texts from '../../texts.json';
import './Navbar.css';

import homebtn from '../../Pictures/home45.png';
import catalan from '../../Pictures/bandera_catalan_small.png'
import spanish from '../../Pictures/bandera_spanish_small.png';
import english from '../../Pictures/bandera_english_small.png';
import french from '../../Pictures/bandera_french_small.png';

const languagesAvailable = [
  {language: 'catalan', flag: catalan},
  {language: 'spanish', flag: spanish},
  {language: 'english', flag: english},
  {language: 'french', flag: french}
]


class Navbar extends React.Component {

  state = {
    selectedLanguage: 'spanish',
    selectedFlag: spanish
  }

  setLanguage = (lang, flag) => {
    
    this.setState ({
      selectedLanguage: lang,
      selectedFlag: flag,
    })

    // Notify the parent that the language has been updated
    this.props.onChangeLanguage(lang);
  }

  render() {
    const { selectedLanguage, selectedFlag } = this.state;

    return (
      <nav id="topnavbar">
        <div>
          <Link className="backToStart" to="/">
            <img src={homebtn} alt="home button" />
          </Link> 
        </div>

        <div className="language-dropdown">
          <button className="dropbtn">
            <img src={selectedFlag} alt="language flag"/>
            {texts[selectedLanguage].languageButton}
          </button>
  
          <div className="dropdown-content">
            {languagesAvailable.map((lang) => (
              <img
                key={lang.flag}
                src={lang.flag}
                onClick={() => this.setLanguage(lang.language, lang.flag)}
                alt={lang.language}
              />)
            )}
          </div>
        </div>
      </nav> 
    )
  }
}

export default Navbar;
