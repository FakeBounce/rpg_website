import React, { Component } from 'react';
import { cursorPointer, heightLeft, widthLeft } from './Utils/StyleConstants';

import PropTypes from 'prop-types';
import SoundPanel from './SoundPanel/SoundPanel';
import EventPanel from './EventPanel/EventPanel';
import MapEditionPanel from './MapEditionPanel/MapEditionPanel';
import StoryQuestsAndMerchantsPanel from './StoryQuestsAndMerchantsPanel/StoryQuestsAndMerchantsPanel';
import TownPanel from './TownPanel/TownPanel';
import PanelToggle from './PanelToggle';
import SpellGenerator from './SpellGenerator';
import firebase from 'firebase';
import ButtonLarge from './Utils/ButtonLarge';

const styledMapSide = {
  width: `${widthLeft / 2}px`,
  height: `${heightLeft / 2}px`,
  display: 'inline-block',
  float: 'left',
  textAlign: 'left',
  position: 'relative',
};

const styledMiddlePanel = {
  width: `${widthLeft}px`,
  height: `${heightLeft}px`,
  display: 'inline-block',
  float: 'left',
  position: 'relative',
};

const styledContainer = {
  width: `${widthLeft / 2}px`,
  height: `${heightLeft / 2 - 20}px`,
  overflow: 'auto',
  display: 'inline-block',
  float: 'left',
  position: 'relative',
};

const styledBestiary = {
  width: `${widthLeft / 2}px`,
  height: 20,
  display: 'inline-block',
  float: 'left',
  position: 'relative',
  cursor: cursorPointer,
};

class GMMapPanel extends Component {
  state = {
    isOnQuest: true,
    isOnMap: true,
    isOnSpell: false,
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

  toggleIsOnSpell = bool => {
    this.setState(state => ({
      ...state,
      isOnSpell: bool,
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
      changeCurrentScale,
      currentScale,
      currentStory,
      currentTile,
      currentTown,
      doSetState,
      eventHistory,
      gameMaster,
      hydrateMerchants,
      items,
      merchants,
      musicName,
      musicVolume,
      noiseName,
      noiseVolume,
      onChangeMusics,
      quests,
      resetSounds,
      stories,
      storyCharacters,
      textureToApply,
      tilesTypes,
      towns,
      triggerError,
    } = this.props;
    const { isOnQuest, isOnMap, isOnSpell } = this.state;
    return (
      <div style={styledMiddlePanel}>
        <div style={styledMapSide}>
          <PanelToggle
            toggleIsOnMap={this.toggleIsOnMap}
            toggleIsOnSpell={this.toggleIsOnSpell}
          />
          {isOnSpell ? (
            <div style={styledContainer}>
              <SpellGenerator items={items} />
              <ButtonLarge style={{ marginTop: 30 }} onClick={hydrateMerchants}>
                Hydrate merchants
              </ButtonLarge>
            </div>
          ) : isOnMap ? (
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
          ) : (
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
  changeCurrentScale: PropTypes.func.isRequired,
  currentScale: PropTypes.number.isRequired,
  currentStory: PropTypes.number.isRequired,
  currentTile: PropTypes.object.isRequired,
  currentTown: PropTypes.number.isRequired,
  doSetState: PropTypes.func.isRequired,
  eventHistory: PropTypes.array.isRequired,
  gameMaster: PropTypes.string.isRequired,
  hydrateMerchants: PropTypes.string.isRequired,
  items: PropTypes.object.isRequired,
  merchants: PropTypes.array.isRequired,
  musicName: PropTypes.string.isRequired,
  musicVolume: PropTypes.number.isRequired,
  noiseName: PropTypes.string.isRequired,
  noiseVolume: PropTypes.number.isRequired,
  onChangeMusics: PropTypes.func.isRequired,
  quests: PropTypes.array.isRequired,
  resetSounds: PropTypes.func.isRequired,
  stories: PropTypes.array.isRequired,
  storyCharacters: PropTypes.array.isRequired,
  textureToApply: PropTypes.object,
  tilesTypes: PropTypes.object.isRequired,
  towns: PropTypes.array.isRequired,
  triggerError: PropTypes.func.isRequired,
};

export default GMMapPanel;
