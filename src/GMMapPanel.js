import React, { Component } from "react";
import { heightLeft, widthLeft } from "./components/Utils/StyleConstants";

import PropTypes from "prop-types";
import EventPanel from "./components/EventPanel/EventPanel";
import MapEditionPanel from "./components/MapEditionPanel/MapEditionPanel";
import StoryQuestsAndMerchantsPanel from "./components/StoryQuestsAndMerchantsPanel/StoryQuestsAndMerchantsPanel";
import TownPanel from "./components/TownPanel/TownPanel";
import SpellGenerator from "./SpellGenerator";
import { connect } from "react-redux";

const styledMapSide = {
  width: `${widthLeft / 2}px`,
  height: `${heightLeft / 2}px`,
  display: "inline-block",
  float: "left",
  textAlign: "left",
  position: "relative",
};

const styledMiddlePanel = {
  width: `${widthLeft}px`,
  height: `${heightLeft}px`,
  display: "inline-block",
  float: "left",
  position: "relative",
};

const styledContainer = {
  width: `${widthLeft / 2}px`,
  height: `${heightLeft / 2}px`,
  overflow: "auto",
  display: "inline-block",
  float: "left",
  position: "relative",
};

class GMMapPanel extends Component {
  state = {
    isOnQuest: true,
  };

  toggleRightPanel = bool => {
    this.setState(state => ({
      ...state,
      isOnQuest: bool,
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
      currentTile,
      currentTown,
      currentX,
      currentY,
      doSetState,
      eventHistory,
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
    const { isOnQuest } = this.state;

    return (
      <div style={styledMiddlePanel}>
        <MapEditionPanel
          changeCurrentScale={changeCurrentScale}
          currentScale={currentScale}
          currentTile={currentTile}
          currentX={currentX}
          currentY={currentY}
          doSetState={doSetState}
          tilesTypes={tilesTypes}
          textureToApply={textureToApply}
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
          eventHistory={eventHistory}
          storyCharacters={storyCharacters}
        />
        {currentTown > -1 && (
          <TownPanel
            currentTown={currentTown}
            towns={towns}
            quests={quests}
            merchants={merchants}
            toggleRightPanel={this.toggleRightPanel}
          />
        )}
        {currentTown > -1 && (
          <StoryQuestsAndMerchantsPanel
            triggerError={triggerError}
            currentTown={currentTown}
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

const mapStateToProps = store => ({
  currentStory: store.appState.currentStory,
});

GMMapPanel.defaultProps = {
  items: null,
  textureToApply: null,
};

GMMapPanel.propTypes = {
  changeCurrentScale: PropTypes.func.isRequired,
  currentScale: PropTypes.number.isRequired,
  currentTile: PropTypes.object.isRequired,
  currentTown: PropTypes.number.isRequired,
  currentX: PropTypes.number.isRequired,
  currentY: PropTypes.number.isRequired,
  doSetState: PropTypes.func.isRequired,
  eventHistory: PropTypes.array.isRequired,
  items: PropTypes.object,
  merchants: PropTypes.array.isRequired,
  onChangeMusics: PropTypes.func.isRequired,
  quests: PropTypes.array.isRequired,
  stories: PropTypes.array.isRequired,
  storyCharacters: PropTypes.array.isRequired,
  textureToApply: PropTypes.object,
  tilesTypes: PropTypes.object.isRequired,
  towns: PropTypes.array.isRequired,
  triggerError: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(GMMapPanel);
