import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { heightHeader } from './StyleConstants';
import Camera from '../Camera';
import ButtonLarge from './ButtonLarge';

const styledSignOut = {
  display: 'block',
  position: 'relative',
};

const styledToggling = {
  position: 'absolute',
  top: 50,
  right: 167,
};

const styledToggleEvent = {
  position: 'absolute',
  top: 75,
  right: 167,
};

const styledTogglingAbsolute = {
  position: 'absolute',
  top: 0,
  right: 167,
};

const styledBoxHeader = {
  width: '75%',
  height: '20px',
  marginBottom: '5px',
  textAlign: 'center',
  fontSize: '36px',
  paddingTop: '25px',
  color: 'white',
  marginLeft: '25%',
};

const styledHeaderRight = {
  height: heightHeader,
  position: 'absolute',
  right: 0,
  top: 0,
};

const styledHeaderLeft = {
  height: heightHeader,
  position: 'absolute',
  left: 0,
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
      accessChatHelp,
      bestiaryTitle,
      chatHelpTitle,
      isEventHidden,
      isGameMaster,
      musicMute,
      selectAnotherCharacter,
      signOut,
      title,
      toggleBestiary,
      toggleEvent,
      toggleMusic,
      togglePlayerView,
      uid,
    } = this.props;

    return (
      <div style={styledHeader}>
        <div style={styledHeaderLeft}>
          <Camera uid={uid} />
        </div>
        <div style={styledBoxHeader}>{title}</div>
        <div style={styledHeaderRight}>
          <ButtonLarge style={styledTogglingAbsolute} onClick={toggleBestiary}>
            {bestiaryTitle}
          </ButtonLarge>
          <ButtonLarge style={styledSignOut} onClick={signOut}>
            Sign Out
          </ButtonLarge>
          <ButtonLarge style={styledSignOut} onClick={selectAnotherCharacter}>
            Select another character
          </ButtonLarge>
          <ButtonLarge style={styledSignOut} onClick={accessChatHelp}>
            {chatHelpTitle}
          </ButtonLarge>
          <ButtonLarge style={styledSignOut} onClick={toggleMusic}>
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
          </ButtonLarge>
        </div>
        {isGameMaster && (
          <ButtonLarge style={styledToggling} onClick={togglePlayerView}>
            Toggle Player View
          </ButtonLarge>
        )}
        {isGameMaster && (
          <ButtonLarge onClick={toggleEvent} style={styledToggleEvent}>
            Toggle event {isEventHidden ? '(Is hidden)' : ''}
          </ButtonLarge>
        )}
      </div>
    );
  }
}

Header.propTypes = {
  accessChatHelp: PropTypes.func.isRequired,
  bestiaryTitle: PropTypes.string.isRequired,
  chatHelpTitle: PropTypes.string.isRequired,
  isEventHidden: PropTypes.bool.isRequired,
  isGameMaster: PropTypes.bool.isRequired,
  musicMute: PropTypes.bool.isRequired,
  selectAnotherCharacter: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  toggleBestiary: PropTypes.func.isRequired,
  toggleEvent: PropTypes.func.isRequired,
  toggleMusic: PropTypes.func.isRequired,
  togglePlayerView: PropTypes.func.isRequired,
  uid: PropTypes.bool.isRequired,
};

export default Header;
