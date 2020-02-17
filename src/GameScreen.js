import React, { Component } from "react";
import PropTypes from "prop-types";

import BottomPanel from "./components/BottomPanel/BottomPanel";
import ChatCommandsPanel from "./components/ChatCommandsPanel/ChatCommandsPanel";
import Header from "./components/Utils/Header";
import MiddlePanel from "./MiddlePanel";
import EventModal from "./components/EventModal/EventModal";
import BestiaryPanel from "./components/BestiaryPanel/BestiaryPanel";
import TownsHistoryPanel from "./components/TownsHistoryPanel/TownsHistoryPanel";
import { connect } from "react-redux";

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
      hydrateMerchants,
      isGameMaster,
      merchants,
      quests,
      selectAnotherCharacter,
      signOut,
      stories,
      storyCharacters,
      toggleMusic,
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
          bestiaryTitle={isOnBestiary ? "Return to map" : "Bestiary"}
          chatHelpTitle={onChatHelp ? "Return to map" : "Access chat help"}
          doSetState={doSetState}
          eventTitle={
            isEventHidden ? "Toggle event (Is hidden)" : "Toggle event"
          }
          merchantTitle={isOnMerchantList ? "Return to map" : "Merchants list"}
          hydrateMerchants={hydrateMerchants}
          selectAnotherCharacter={selectAnotherCharacter}
          signOut={signOut}
          title={stories[currentStory].name}
          toggleBestiary={this.toggleBestiary}
          toggleMerchantList={this.toggleMerchantList}
          toggleMusic={toggleMusic}
          toggleEvent={this.toggleEvent}
        />
        {this.canReadEvent() && (
          <EventModal
            doSetState={doSetState}
            storyCharacters={storyCharacters}
            triggerError={triggerError}
          />
        )}
        {isOnBestiary && bestiary ? (
          <BestiaryPanel bestiary={bestiary} doSetState={doSetState} />
        ) : isOnMerchantList &&
          towns &&
          towns.length > 0 &&
          merchants &&
          merchants.length > 0 ? (
          <TownsHistoryPanel
            merchants={merchants}
            quests={quests}
            towns={towns}
          />
        ) : onChatHelp ? (
          <ChatCommandsPanel />
        ) : (
          <MiddlePanel
            doSetState={doSetState}
            merchants={merchants}
            quests={quests}
            storyCharacters={storyCharacters}
            towns={towns}
            triggerError={triggerError}
            {...rest}
          />
        )}
        <BottomPanel />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  isGameMaster: store.appState.isGameMaster,
  currentStory: store.appState.currentStory,
  stories: store.appState.stories,
  uid: store.userInfos.uid,
});

GameScreen.propTypes = {
  bestiary: PropTypes.array.isRequired,
  character: PropTypes.object.isRequired,
  currentEvent: PropTypes.number.isRequired,
  doSetState: PropTypes.func.isRequired,
  hydrateMerchants: PropTypes.func.isRequired,
  merchants: PropTypes.array.isRequired,
  quests: PropTypes.array.isRequired,
  selectAnotherCharacter: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  storyCharacters: PropTypes.array.isRequired,
  toggleMusic: PropTypes.func.isRequired,
  towns: PropTypes.array.isRequired,
  triggerError: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(GameScreen);
