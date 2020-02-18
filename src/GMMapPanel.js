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
    const { currentTown, items, storyCharacters, triggerError } = this.props;
    const { isOnQuest } = this.state;

    return (
      <div style={styledMiddlePanel}>
        <MapEditionPanel />
        <div style={styledMapSide}>
          <div style={styledContainer}>
            Générateur de sorts : <br />
            <SpellGenerator items={items} />
          </div>
        </div>
        <EventPanel items={items} storyCharacters={storyCharacters} />
        {currentTown > -1 && (
          <TownPanel toggleRightPanel={this.toggleRightPanel} />
        )}
        {currentTown > -1 && (
          <StoryQuestsAndMerchantsPanel
            triggerError={triggerError}
            isOnQuest={isOnQuest}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  currentStory: store.appState.currentStory,
  currentTown: store.appState.currentTown,
});

GMMapPanel.defaultProps = {
  items: null,
  textureToApply: null,
};

GMMapPanel.propTypes = {
  items: PropTypes.object,
  onChangeMusics: PropTypes.func.isRequired,
  storyCharacters: PropTypes.array.isRequired,
  triggerError: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(GMMapPanel);
