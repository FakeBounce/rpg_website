import React, { Component } from "react";
import PropTypes from "prop-types";

import BottomPanel from "./BottomPanel/BottomPanel";
import ChatCommandsPanel from "./ChatCommandsPanel/ChatCommandsPanel";
import Header from "./Utils/Header";
import MiddlePanel from "./MiddlePanel";
import EventModal from "./EventModal/EventModal";

const styledImage = {
  position: "relative",
  float: "left",
  width: 100,
  height: 100,
};
const styledContainer = {
  position: "relative",
  width: window.innerWidth / 4 - 2,
  float: "left",
  display: "inline-block",
  borderLeft: "1px dashed black",
  borderRight: "1px dashed black",
  borderBottom: "1px dashed black",
};
const styledText = {
  position: "relative",
  float: "left",
  width: window.innerWidth / 4 - 2 - 120,
  padding: 10,
};
const styledTitle = {
  fontSize: 22,
  fontWeight: "bolder",
  color: "red",
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
      accessChatHelp,
      character,
      currentEvent,
      currentStory,
      doSetState,
      eventHistory,
      gameMaster,
      isGameMaster,
      isOnBestiary,
      musicMute,
      onChatHelp,
      pseudo,
      selectAnotherCharacter,
      signOut,
      stories,
      storyCharacters,
      toggleMusic,
      toggleBestiary,
      togglePlayerView,
      triggerError,
      uid,
      bestiary,
      ...rest
    } = this.props;

    const { isEventHidden } = this.state;

    return (
      <div>
        <Header
          accessChatHelp={accessChatHelp}
          chatHelpTitle={onChatHelp ? "Return to map" : "Access chat help"}
          bestiaryTitle={isOnBestiary ? "Return to map" : "Bestiary"}
          eventTitle={isEventHidden ? "Toggle event (Is hidden)" : "Toggle event"}
          isGameMaster={isGameMaster}
          musicMute={musicMute}
          selectAnotherCharacter={selectAnotherCharacter}
          signOut={signOut}
          title={stories[currentStory].name}
          toggleBestiary={toggleBestiary}
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
          <div>
            {bestiary.map(b => {
              if (b.seen) {
                if (typeof b[uid] !== "undefined") {
                  return (
                    <div style={styledContainer}>
                      <div style={styledTitle}> {b.name}</div>
                      <img src={"./bestiary/" + b.image} style={styledImage} />
                      <div style={styledText}>
                        {b[uid].text1 && <div>{b.text1}</div>}
                        {b[uid].text2 && <div>{b.text2}</div>}
                        {b[uid].text3 && <div>{b.text3}</div>}
                        {b[uid].text4 && <div>{b.text4}</div>}
                        {b.monster &&
                          b[uid].dangerosity && <div>Dangerosité : {b.dangerosity}</div>}
                        {!b.monster && b[uid].age && <div>Age : {b.age} ans</div>}
                        {b[uid].taille && (
                          <div>
                            Taille : {b.taille}
                            cm
                          </div>
                        )}
                        {b[uid].poids && (
                          <div>
                            Poids : {b.poids}
                            kg
                          </div>
                        )}
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div style={styledContainer}>
                      <div style={styledTitle}> {b.name}</div>
                      <img src={"./bestiary/" + b.image} style={styledImage} />
                    </div>
                  );
                }
              }
            })}
          </div>
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
            pseudo={pseudo}
            stories={stories}
            storyCharacters={storyCharacters}
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
  accessChatHelp: PropTypes.func.isRequired,
  character: PropTypes.object.isRequired,
  currentEvent: PropTypes.number.isRequired,
  currentStory: PropTypes.number.isRequired,
  doSetState: PropTypes.func.isRequired,
  eventHistory: PropTypes.array.isRequired,
  gameMaster: PropTypes.string.isRequired,
  isGameMaster: PropTypes.bool.isRequired,
  isOnBestiary: PropTypes.bool.isRequired,
  musicMute: PropTypes.bool.isRequired,
  onChatHelp: PropTypes.bool.isRequired,
  pseudo: PropTypes.string.isRequired,
  selectAnotherCharacter: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  stories: PropTypes.array.isRequired,
  storyCharacters: PropTypes.array.isRequired,
  toggleMusic: PropTypes.func.isRequired,
  toggleBestiary: PropTypes.func.isRequired,
  togglePlayerView: PropTypes.func.isRequired,
  triggerError: PropTypes.func.isRequired,
  uid: PropTypes.string.isRequired,
  bestiary: PropTypes.array.isRequired,
};

export default GameScreen;
