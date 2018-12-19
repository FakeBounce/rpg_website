import React, { Component } from 'react';
import { heightLeft, widthLeft } from './Utils/StyleConstants';

import PropTypes from 'prop-types';
import EventPanel from './EventPanel/EventPanel';
import MapEditionPanel from './MapEditionPanel/MapEditionPanel';
import StoryQuestsAndMerchantsPanel from './StoryQuestsAndMerchantsPanel/StoryQuestsAndMerchantsPanel';
import TownPanel from './TownPanel/TownPanel';
import PanelToggle from './PanelToggle';
import SpellGenerator from './SpellGenerator';
import ButtonLarge from './Utils/ButtonLarge';
import TeamPanel from './TeamCharacters/TeamPanel';
import firebase from 'firebase';

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
  height: `${heightLeft / 2}px`,
  overflow: 'auto',
  display: 'inline-block',
  float: 'left',
  position: 'relative',
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

  chatWithTeamMember = pseudo => {
    if (pseudo === 'GM') {
      this.props.doSetState({
        chatInput: `/gmw `,
      });
    } else {
      this.props.doSetState({
        chatInput: `/w ${pseudo} `,
      });
    }
  };

  goldWithTeamMember = pseudo => {
    if (pseudo === 'GM') {
      this.props.doSetState({
        chatInput: `/goldgm `,
      });
    } else {
      this.props.doSetState({
        chatInput: `/gold ${pseudo} `,
      });
    }
  };

  modifyCurrentCharacter = uid => {
    const { currentStory, isGameMaster, doSetState } = this.props;

    if (isGameMaster) {
      firebase
        .database()
        .ref(
          'stories/' +
            currentStory +
            '/characters/' +
            this.props.uid +
            '/character'
        )
        .off();
      firebase
        .database()
        .ref('stories/' + currentStory + '/characters/' + uid + '/character')
        .on('value', snapshot => {
          doSetState({
            uid,
            character: snapshot.val(),
          });
        });
    }
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
      items,
      merchants,
      quests,
      stories,
      storyCharacters,
      textureToApply,
      tilesTypes,
      towns,
      triggerError,
    } = this.props;
    const { isOnQuest, isOnMap, isOnSpell, hasHydrated } = this.state;

    return (
      <div style={styledMiddlePanel}>
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
        <div style={styledMapSide}>
          <div style={styledContainer}>
            Générateur de sorts : <br />
            <SpellGenerator items={items} />
          </div>
        </div>
        <EventPanel
          items={items}
          currentStory={currentStory}
          eventHistory={eventHistory}
          storyCharacters={storyCharacters}
          gameMaster={gameMaster}
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
