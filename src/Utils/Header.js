import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { heightHeader } from './StyleConstants';
import Camera from '../Camera';
import ButtonLarge from './ButtonLarge';

const styledSignOut = {
  display: 'block',
  position: 'relative',
  width: 150,
};

const styledToggling = {
  position: 'absolute',
  top: 50,
  right: 150,
  width: 150,
};

const styledToggleEvent = {
  position: 'absolute',
  top: 75,
  right: 150,
  width: 150,
};

const styledHydrateEvent = {
  position: 'absolute',
  top: 100,
  right: 150,
  width: 150,
};

const styledTogglingAbsolute = {
  position: 'absolute',
  top: 100,
  right: 0,
  width: 150,
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
  width: 150,
};

const styledHeaderLeft = {
  height: heightHeader,
  position: 'absolute',
  left: 0,
  top: 0,
};

const styledHeader = {
  width: '100%',
  height: `${heightHeader}px`,
  backgroundImage: `url(./common/dravos_header.jpg)`,
  backgroundSize: 'cover',
  // backgroundColor: '#34495e',
};

const styledSound = {
  marginLeft: '5px',
  width: '10px',
  height: '10px',
};

class Header extends Component {
  state = {
    hasHydrated: false,
  };

  hasHydrated = () => {
    this.setState(state => ({
      ...state,
      hasHydrated: true,
    }));
    setTimeout(() => {
      this.setState(state => ({
        ...state,
        hasHydrated: false,
      }));
    }, 3000);
  };

  render() {
    const {
      accessChatHelp,
      bestiaryTitle,
      chatHelpTitle,
      eventTitle,
      hydrateMerchants,
      isGameMaster,
      merchantTitle,
      musicMute,
      selectAnotherCharacter,
      signOut,
      title,
      toggleBestiary,
      toggleMerchantList,
      toggleEvent,
      toggleMusic,
      togglePlayerView,
      uid,
    } = this.props;
    const { hasHydrated } = this.state;

    return (
      <div style={styledHeader}>
        <div style={styledHeaderLeft}>
          <Camera uid={uid} />
        </div>
        <div style={styledHeaderRight}>
          <ButtonLarge style={styledSignOut} onClick={signOut}>
            Sign Out
          </ButtonLarge>
          <ButtonLarge
            style={styledSignOut}
            onClick={
              //selectAnotherCharacter
              () => {}
            }
          >
            Select a character
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
          <ButtonLarge style={styledSignOut} onClick={accessChatHelp}>
            {chatHelpTitle}
          </ButtonLarge>
          <ButtonLarge style={styledTogglingAbsolute} onClick={toggleBestiary}>
            {bestiaryTitle}
          </ButtonLarge>
          <ButtonLarge style={styledSignOut} onClick={toggleMerchantList}>
            {merchantTitle}
          </ButtonLarge>
        </div>
        {isGameMaster && (
          <ButtonLarge style={styledToggling} onClick={togglePlayerView}>
            Toggle Player View
          </ButtonLarge>
        )}
        {isGameMaster && (
          <ButtonLarge onClick={toggleEvent} style={styledToggleEvent}>
            {eventTitle}
          </ButtonLarge>
        )}
        {isGameMaster && (
          <ButtonLarge
            onClick={() => {
              this.hasHydrated();
              hydrateMerchants();
            }}
            style={styledHydrateEvent}
          >
            Hydrate merchants
            {hasHydrated ? ' OK' : ''}
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
  eventTitle: PropTypes.string.isRequired,
  hydrateMerchants: PropTypes.func.isRequired,
  isGameMaster: PropTypes.bool.isRequired,
  merchantTitle: PropTypes.string.isRequired,
  musicMute: PropTypes.bool.isRequired,
  selectAnotherCharacter: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  toggleBestiary: PropTypes.func.isRequired,
  toggleEvent: PropTypes.func.isRequired,
  toggleMerchantList: PropTypes.func.isRequired,
  toggleMusic: PropTypes.func.isRequired,
  togglePlayerView: PropTypes.func.isRequired,
  uid: PropTypes.bool.isRequired,
};

export default Header;
