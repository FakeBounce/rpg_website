import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { heightHeader } from './StyleConstants';

const styledSignOut = {
  display: 'block',
  position: 'relative',
  width: 150,
  height: 20,
};

const styledBoxHeader = {
  width: '100%',
  height: '20px',
  marginBottom: '5px',
  textAlign: 'center',
  fontSize: '36px',
  paddingTop: '25px',
  color: 'white',
};

const styledHeaderRight = {
  height: heightHeader,
  position: 'absolute',
  right: 0,
  top: 0,
};

const styledHeader = {
  borderBottom: '1px solid black',
  width: '100%',
  height: `${heightHeader}px`,
  backgroundImage: `url(./common/dravos_header.jpg)`,
  backgroundSize: 'cover',
};

const styledSound = {
  marginLeft: '5px',
  width: '10px',
  height: '10px',
};

class Header extends Component {
  render() {
    const {
      title,
      signOut,
      accessChatHelp,
      chatHelpTitle,
      selectAnotherCharacter,
      toggleMusic,
      musicMute,
      isGameMaster,
      togglePlayerView,
    } = this.props;

    return (
      <div style={styledHeader}>
        <div style={styledBoxHeader}>{title}</div>
        <div style={styledHeaderRight}>
          <button style={styledSignOut} onClick={signOut}>
            Sign Out
          </button>
          <button style={styledSignOut} onClick={selectAnotherCharacter}>
            Select another character
          </button>
          <button style={styledSignOut} onClick={accessChatHelp}>
            {chatHelpTitle}
          </button>
          <button style={styledSignOut} onClick={toggleMusic}>
            Toggle music
            <img
              src={
                musicMute
                  ? './common/soundMuted.png'
                  : './common/soundUnmuted.png'
              }
              style={styledSound}
              alt="sound muted or not"
            />
          </button>
          {isGameMaster && (
            <button style={styledSignOut} onClick={togglePlayerView}>
              Toggle Player View
            </button>
          )}
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  chatHelpTitle: PropTypes.string.isRequired,
  signOut: PropTypes.func.isRequired,
  accessChatHelp: PropTypes.func.isRequired,
  selectAnotherCharacter: PropTypes.func.isRequired,
  toggleMusic: PropTypes.func.isRequired,
  togglePlayerView: PropTypes.func.isRequired,
  musicMute: PropTypes.bool.isRequired,
  isGameMaster: PropTypes.bool.isRequired,
};

export default Header;
