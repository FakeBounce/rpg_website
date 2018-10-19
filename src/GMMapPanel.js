import React, { Component } from "react";
import { heightLeft, widthLeft } from "./Utils/StyleConstants";

import PropTypes from "prop-types";
import SoundPanel from "./SoundPanel/SoundPanel";
import firebase from "firebase";
import TownMerchant from "./TownMerchant";
import TownQuest from "./TownQuest";
import EventPanel from "./EventPanel/EventPanel";
import MapEditionPanel from "./MapEditionPanel/MapEditionPanel";
import StoryQuestsAndMerchantsPanel from "./StoryQuestsAndMerchantsPanel";

const styledBoxHeader = {
  width: "100%",
  height: "20px",
  marginBottom: "5px",
  textAlign: "center",
  float: "left",
  display: "inline-block",
  position: "relative",
};

const styledSemiBoxHeader = {
  width: "50%",
  height: "20px",
  marginBottom: "5px",
  textAlign: "center",
  float: "left",
  display: "inline-block",
  position: "relative",
};

const styledMapSide = {
  border: "1px solid brown",
  width: `${widthLeft / 2 - 3}px`,
  height: `${heightLeft / 2 - 1}px`,
  display: "inline-block",
  float: "left",
  textAlign: "left",
  position: "relative",
};

const styledSemiContainer = {
  width: "100%",
  height: `${heightLeft / 4 - 40}px`,
  display: "inline-block",
  float: "left",
  position: "relative",
  overflowY: "auto",
};

const styledMiddlePanel = {
  width: `${widthLeft - 2}px`,
  height: `${heightLeft - 1}px`,
  display: "inline-block",
  float: "left",
  position: "relative",
};

class GMMapPanel extends Component {
  state = {
    isOnQuest: true,
    isOnMap: true,
    townToAssign: -1,
  };

  changeCurrentMusic = m => {
    const { onChangeMusics } = this.props;
    onChangeMusics("musicName", m);
  };

  changeCurrentNoise = n => {
    const { onChangeMusics } = this.props;
    onChangeMusics("noiseName", n);
    onChangeMusics("noiseStatus", "PLAYING");
  };

  toggleMerchantDiscover = i => {
    const { currentStory, currentTown, merchants } = this.props;

    const newMerchant = { ...merchants[i] };
    newMerchant.isDiscovered = !newMerchant.isDiscovered;
    firebase
      .database()
      .ref("stories/" + currentStory + "/merchants/" + i)
      .set(newMerchant)
      .catch(error => {
        // Handle Errors here.
        this.props.triggerError(error);
      });
  };

  validateQuest = i => {
    const { currentStory, quests } = this.props;

    const newQuest = { ...quests[i] };
    newQuest.validated = !newQuest.validated;
    firebase
      .database()
      .ref("stories/" + currentStory + "/quests/" + i)
      .set(newQuest)
      .catch(error => {
        // Handle Errors here.
        this.props.triggerError(error);
      });
  };

  removeQuestFromTown = i => {
    const { currentStory, currentTown, towns, quests } = this.props;
    const newTown = { ...towns[currentTown] };
    if (!quests[i].validated) {
      newTown.questsList.map((ql, index) => {
        if (ql === i) {
          newTown.questsList.splice(index, 1);
        }
      });

      firebase
        .database()
        .ref("stories/" + currentStory + "/towns/" + currentTown)
        .set(newTown)
        .catch(error => {
          // Handle Errors here.
          this.props.triggerError(error);
        });

      const newQuest = { ...quests[i] };
      newQuest.town = null;
      firebase
        .database()
        .ref("stories/" + currentStory + "/quests/" + i)
        .set(newQuest)
        .catch(error => {
          // Handle Errors here.
          this.props.triggerError(error);
        });
    }
  };

  removeMerchantFromTown = i => {
    const { currentStory, currentTown, towns, merchants } = this.props;
    const newTown = { ...towns[currentTown] };
    newTown.merchantsList.map((ql, index) => {
      if (ql === i) {
        newTown.merchantsList.splice(index, 1);
      }
    });

    firebase
      .database()
      .ref("stories/" + currentStory + "/towns/" + currentTown)
      .set(newTown)
      .catch(error => {
        // Handle Errors here.
        this.props.triggerError(error);
      });

    const newMerchant = { ...merchants[i] };
    newMerchant.town = null;
    firebase
      .database()
      .ref("stories/" + currentStory + "/merchants/" + i)
      .set(newMerchant)
      .catch(error => {
        // Handle Errors here.
        this.props.triggerError(error);
      });
  };

  toggleRightPanel = bool => {
    this.setState(state => ({
      ...state,
      isOnQuest: bool,
    }));
  };

  toggleIsOnMap = bool => {
    this.setState(state => ({
      ...state,
      isOnMap: bool,
    }));
  };

  onChange = (name, value) => {
    const obj = {};
    obj[name] = value;
    this.setState(state => ({
      ...state,
      ...obj,
    }));
  };

  render() {
    const {
      textureToApply,
      onChangeMusics,
      resetSounds,
      musicName,
      musicVolume,
      noiseName,
      noiseVolume,
      changeCurrentScale,
      currentScale,
      currentTown,
      towns,
      quests,
      merchants,
      currentTile,
      storyCharacters,
      gameMaster,
      items,
      currentStory,
      eventHistory,
      doSetState,
      tilesTypes,
      triggerError,
    } = this.props;
    const { isOnQuest, isOnMap } = this.state;
    return (
      <div style={styledMiddlePanel}>
        <div style={styledMapSide}>
          <div
            style={styledSemiBoxHeader}
            onClick={() => this.toggleIsOnMap(true)}
          >
            Modifier la carte
          </div>
          <div
            style={styledSemiBoxHeader}
            onClick={() => this.toggleIsOnMap(false)}
          >
            Ajouter un event
          </div>
          {isOnMap && (
            <MapEditionPanel
              changeCurrentScale={changeCurrentScale}
              currentScale={currentScale}
              currentTile={currentTile}
              doSetState={doSetState}
              tilesTypes={tilesTypes}
              textureToApply={textureToApply}
            />
          )}
          {!isOnMap && (
            <EventPanel
              items={items}
              currentStory={currentStory}
              eventHistory={eventHistory}
              storyCharacters={storyCharacters}
              gameMaster={gameMaster}
            />
          )}
        </div>
        <SoundPanel
          musicName={musicName}
          noiseName={noiseName}
          musicVolume={musicVolume}
          noiseVolume={noiseVolume}
          onChange={onChangeMusics}
          resetSounds={resetSounds}
          changeCurrentMusic={this.changeCurrentMusic}
          changeCurrentNoise={this.changeCurrentNoise}
        />
        {currentTown > -1 && (
          <div style={styledMapSide}>
            <div style={styledBoxHeader}>{towns[currentTown].name}</div>
            <div
              onClick={() => this.toggleRightPanel(true)}
              style={styledBoxHeader}
            >
              Quests
            </div>
            <div style={styledSemiContainer}>
              {quests.map((q, i) => {
                if (q.town === currentTown) {
                  return (
                    <TownQuest
                      q={q}
                      i={i}
                      validateQuest={this.validateQuest}
                      removeQuestFromTown={this.removeQuestFromTown}
                    />
                  );
                }
              })}
            </div>
            <div
              onClick={() => this.toggleRightPanel(false)}
              style={styledBoxHeader}
            >
              Merchants
            </div>
            <div style={styledSemiContainer}>
              {merchants.map((m, i) => {
                if (m.town === currentTown) {
                  return (
                    <TownMerchant
                      key={`town-${m.name}`}
                      m={m}
                      i={i}
                      removeMerchantFromTown={this.removeMerchantFromTown}
                      toggleMerchantDiscover={this.toggleMerchantDiscover}
                    />
                  );
                }
                return null;
              })}
            </div>
          </div>
        )}
        {currentTown > -1 && (
          <StoryQuestsAndMerchantsPanel
            triggerError={triggerError}
            currentTown={currentTown}
            currentStory={currentStory}
            towns={towns}
            quests={quests}
            merchants={merchants}
            isOnQuest={isOnQuest}
          />
        )}
      </div>
    );
  }
}

GMMapPanel.defaultProps = {
  textureToApply: null,
};

GMMapPanel.propTypes = {
  items: PropTypes.object.isRequired,
  textureToApply: PropTypes.object,
  musicName: PropTypes.string.isRequired,
  noiseName: PropTypes.string.isRequired,
  musicVolume: PropTypes.number.isRequired,
  noiseVolume: PropTypes.number.isRequired,
  onChangeMusics: PropTypes.func.isRequired,
  resetSounds: PropTypes.func.isRequired,
  doSetState: PropTypes.func.isRequired,
  triggerError: PropTypes.func.isRequired,
  changeCurrentScale: PropTypes.func.isRequired,
  tilesTypes: PropTypes.object.isRequired,
  currentScale: PropTypes.number.isRequired,
  currentTown: PropTypes.number.isRequired,
  currentStory: PropTypes.number.isRequired,
  towns: PropTypes.array.isRequired,
  quests: PropTypes.array.isRequired,
  merchants: PropTypes.array.isRequired,
  stories: PropTypes.array.isRequired,
  currentTile: PropTypes.object.isRequired,
  eventHistory: PropTypes.array.isRequired,
  storyCharacters: PropTypes.array.isRequired,
  gameMaster: PropTypes.string.isRequired,
};

export default GMMapPanel;
