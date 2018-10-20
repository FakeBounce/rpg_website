import React, { Component } from "react";
import { heightLeft, widthLeft } from "./Utils/StyleConstants";

import PropTypes from "prop-types";
import SoundPanel from "./SoundPanel/SoundPanel";
import EventPanel from "./EventPanel/EventPanel";
import MapEditionPanel from "./MapEditionPanel/MapEditionPanel";
import StoryQuestsAndMerchantsPanel from "./StoryQuestsAndMerchantsPanel/StoryQuestsAndMerchantsPanel";
import TownPanel from "./TownPanel/TownPanel";
import PanelToggle from "./PanelToggle";

const styledMapSide = {
  border: "1px solid brown",
  width: `${widthLeft / 2 - 3}px`,
  height: `${heightLeft / 2 - 1}px`,
  display: "inline-block",
  float: "left",
  textAlign: "left",
  position: "relative",
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
      stories,
    } = this.props;
    const { isOnQuest, isOnMap } = this.state;
    return (
      <div style={styledMiddlePanel}>
        <div style={styledMapSide}>
          <PanelToggle toggleIsOnMap={this.toggleIsOnMap} />
          {isOnMap && (
            <MapEditionPanel
              changeCurrentScale={changeCurrentScale}
              currentScale={currentScale}
              currentTile={currentTile}
              doSetState={doSetState}
              tilesTypes={tilesTypes}
              textureToApply={textureToApply}
              currentStory={currentStory}
              stories={stories}
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
          resetSounds={resetSounds}
          onChangeMusics={onChangeMusics}
        />
        {currentTown > -1 && (
          <TownPanel
            currentTown={currentTown}
            towns={towns}
            quests={quests}
            merchants={merchants}
            toggleRightPanel={this.toggleRightPanel}
            currentStory={currentStory}
          />
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
