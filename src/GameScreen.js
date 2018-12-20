import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BottomPanel from './BottomPanel/BottomPanel';
import ChatCommandsPanel from './ChatCommandsPanel/ChatCommandsPanel';
import Header from './Utils/Header';
import MiddlePanel from './MiddlePanel';
import EventModal from './EventModal/EventModal';
import BestiaryPanel from './BestiaryPanel/BestiaryPanel';
import TownsHistoryPanel from './TownsHistoryPanel/TownsHistoryPanel';

class GameScreen extends Component {
  state = {
    isEventHidden: false,
    isOnBestiary: false,
    onChatHelp: false,
    isOnMerchantList: false,
  };

  canReadEvent = () => {
    const { eventHistory, currentEvent, uid, isGameMaster } = this.props;
    const { isEventHidden } = this.state;
    if (currentEvent > -1) {
      if (eventHistory[currentEvent]) {
        if (eventHistory[currentEvent].isActive) {
          if (isGameMaster && !isEventHidden) {
            return true;
          }
          if (eventHistory[currentEvent].viewers) {
            let isAViewer = false;
            eventHistory[currentEvent].viewers.map(v => {
              if (v === uid) {
                isAViewer = true;
              }
              return null;
            });
            return isAViewer;
          } else if (!isEventHidden) {
            return true;
          }
        }
      }
    }
    return false;
  };

  toggleEvent = () => {
    this.setState(state => ({
      ...state,
      isEventHidden: !state.isEventHidden,
    }));
  };

  toggleBestiary = () => {
    this.setState(state => ({
      ...state,
      isOnBestiary: !state.isOnBestiary,
      onChatHelp: false,
      isOnMerchantList: false,
    }));
  };

  toggleMerchantList = () => {
    this.setState(state => ({
      ...state,
      isOnMerchantList: !state.isOnMerchantList,
      onChatHelp: false,
      isOnBestiary: false,
    }));
  };

  accessChatHelp = () => {
    this.setState(state => ({
      ...state,
      onChatHelp: !state.onChatHelp,
      isOnBestiary: false,
      isOnMerchantList: false,
    }));
  };

  render() {
    const {
      character,
      currentEvent,
      currentStory,
      doSetState,
      eventHistory,
      gameMaster,
      hydrateMerchants,
      isGameMaster,
      musicMute,
      merchants,
      pseudo,
      selectAnotherCharacter,
      signOut,
      stories,
      storyCharacters,
      toggleMusic,
      togglePlayerView,
      triggerError,
      uid,
      bestiary,
      towns,
      ...rest
    } = this.props;

    const {
      isEventHidden,
      isOnBestiary,
      isOnMerchantList,
      onChatHelp,
    } = this.state;

    return (
      <div>
        <Header
          accessChatHelp={this.accessChatHelp}
          chatHelpTitle={onChatHelp ? 'Return to map' : 'Access chat help'}
          bestiaryTitle={isOnBestiary ? 'Return to map' : 'Bestiary'}
          eventTitle={
            isEventHidden ? 'Toggle event (Is hidden)' : 'Toggle event'
          }
          merchantTitle={isOnMerchantList ? 'Return to map' : 'Merchants list'}
          hydrateMerchants={hydrateMerchants}
          isGameMaster={isGameMaster}
          musicMute={musicMute}
          selectAnotherCharacter={selectAnotherCharacter}
          signOut={signOut}
          title={stories[currentStory].name}
          toggleBestiary={this.toggleBestiary}
          toggleMerchantList={this.toggleMerchantList}
          toggleMusic={toggleMusic}
          togglePlayerView={togglePlayerView}
          toggleEvent={this.toggleEvent}
          uid={uid}
        />
        {this.canReadEvent() && (
          <EventModal
            character={character}
            currentEvent={currentEvent}
            currentStory={currentStory}
            doSetState={doSetState}
            eventHistory={eventHistory}
            gameMaster={gameMaster}
            isGameMaster={isGameMaster}
            pseudo={pseudo}
            storyCharacters={storyCharacters}
            triggerError={triggerError}
            uid={uid}
          />
        )}
        {isOnBestiary ? (
          <BestiaryPanel
            isGameMaster={isGameMaster}
            uid={uid}
            bestiary={bestiary}
            doSetState={doSetState}
            currentStory={currentStory}
          />
        ) : isOnMerchantList && towns.length > 0 && merchants.length > 0 ? (
          <TownsHistoryPanel
            merchants={merchants}
            towns={towns}
            character={character}
          />
        ) : onChatHelp ? (
          <ChatCommandsPanel />
        ) : (
          <MiddlePanel
            character={character}
            currentStory={currentStory}
            doSetState={doSetState}
            eventHistory={eventHistory}
            gameMaster={gameMaster}
            isGameMaster={isGameMaster}
            merchants={merchants}
            pseudo={pseudo}
            stories={stories}
            storyCharacters={storyCharacters}
            towns={towns}
            triggerError={triggerError}
            uid={uid}
            {...rest}
          />
        )}
        <BottomPanel />
      </div>
    );
  }
}

GameScreen.propTypes = {
  bestiary: PropTypes.array.isRequired,
  character: PropTypes.object.isRequired,
  currentEvent: PropTypes.number.isRequired,
  currentStory: PropTypes.number.isRequired,
  doSetState: PropTypes.func.isRequired,
  eventHistory: PropTypes.array.isRequired,
  gameMaster: PropTypes.string.isRequired,
  hydrateMerchants: PropTypes.func.isRequired,
  isGameMaster: PropTypes.bool.isRequired,
  merchants: PropTypes.array.isRequired,
  musicMute: PropTypes.bool.isRequired,
  pseudo: PropTypes.string.isRequired,
  selectAnotherCharacter: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  stories: PropTypes.array.isRequired,
  storyCharacters: PropTypes.array.isRequired,
  toggleMusic: PropTypes.func.isRequired,
  togglePlayerView: PropTypes.func.isRequired,
  towns: PropTypes.array.isRequired,
  triggerError: PropTypes.func.isRequired,
  uid: PropTypes.string.isRequired,
};

export default GameScreen;
