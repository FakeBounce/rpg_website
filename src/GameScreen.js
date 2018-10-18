import React, { Component } from "react";
import PropTypes from "prop-types";

import BottomPanel from "./BottomPanel/BottomPanel";
import ChatCommandsPanel from "./ChatCommandsPanel/ChatCommandsPanel";
import Header from "./Utils/Header";
import MiddlePanel from "./MiddlePanel";
import EventPanel from "./EventPanel/EventPanel";

const styledToggleEvent = {
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: 100,
};

class GameScreen extends Component {
  state = {
    isEventHidden: false,
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
          } else {
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

  render() {
    const {
      musicMute,
      onChatHelp,
      toggleMusic,
      accessChatHelp,
      signOut,
      selectAnotherCharacter,
      stories,
      currentStory,
      togglePlayerView,
      isGameMaster,
      currentEvent,
      eventHistory,
      doSetState,
      storyCharacters,
      character,
      gameMaster,
      triggerError,
      uid,
      pseudo,
      ...rest
    } = this.props;

    const { isEventHidden } = this.state;

    return (
      <div>
        {isGameMaster && (
          <button onClick={this.toggleEvent} style={styledToggleEvent}>
            Toggle event {isEventHidden ? "(Is hidden)" : ""}
          </button>
        )}
        <Header
          title={stories[currentStory].name}
          selectAnotherCharacter={selectAnotherCharacter}
          signOut={signOut}
          accessChatHelp={accessChatHelp}
          toggleMusic={toggleMusic}
          chatHelpTitle={onChatHelp ? "Return to map" : "Access chat help"}
          musicMute={musicMute}
          isGameMaster={isGameMaster}
          togglePlayerView={togglePlayerView}
        />
        {this.canReadEvent() && (
          <EventPanel
            currentStory={currentStory}
            isGameMaster={isGameMaster}
            currentEvent={currentEvent}
            eventHistory={eventHistory}
            storyCharacters={storyCharacters}
            uid={uid}
            pseudo={pseudo}
            doSetState={doSetState}
            character={character}
            gameMaster={gameMaster}
            triggerError={triggerError}
          />
        )}
        {onChatHelp ? (
          <ChatCommandsPanel />
        ) : (
          <MiddlePanel
            currentStory={currentStory}
            isGameMaster={isGameMaster}
            stories={stories}
            eventHistory={eventHistory}
            storyCharacters={storyCharacters}
            doSetState={doSetState}
            character={character}
            gameMaster={gameMaster}
            triggerError={triggerError}
            uid={uid}
            pseudo={pseudo}
            {...rest}
          />
        )}
        <BottomPanel />
      </div>
    );
  }
}

GameScreen.propTypes = {
  onChatHelp: PropTypes.bool.isRequired,
  stories: PropTypes.array.isRequired,
  currentStory: PropTypes.number.isRequired,
  musicMute: PropTypes.bool.isRequired,
  isGameMaster: PropTypes.bool.isRequired,
  selectAnotherCharacter: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  accessChatHelp: PropTypes.func.isRequired,
  toggleMusic: PropTypes.func.isRequired,
  togglePlayerView: PropTypes.func.isRequired,
  currentEvent: PropTypes.number.isRequired,
  eventHistory: PropTypes.array.isRequired,
  storyCharacters: PropTypes.array.isRequired,
  uid: PropTypes.string.isRequired,
  pseudo: PropTypes.string.isRequired,
  doSetState: PropTypes.func.isRequired,
  character: PropTypes.object.isRequired,
  gameMaster: PropTypes.string.isRequired,
  triggerError: PropTypes.func.isRequired,
};

export default GameScreen;
