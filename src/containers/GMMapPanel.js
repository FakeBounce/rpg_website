import React, { Component } from "react";
import { heightLeft, widthLeft } from "../components/Utils/StyleConstants";

import PropTypes from "prop-types";
import EventPanel from "../components/EventPanel";
import MapEditionPanel from "../components/MapEditionPanel";
import StoryQuestsAndMerchantsPanel from "../components/StoryQuestsAndMerchantsPanel";
import TownPanel from "../components/TownPanel";
import SpellGenerator from "../components/Utils/SpellGenerator";
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
    const { currentTown } = this.props;
    const { isOnQuest } = this.state;

    return (
      <div style={styledMiddlePanel}>
        <MapEditionPanel />
        <div style={styledMapSide}>
          <div style={styledContainer}>
            Générateur de sorts : <br />
            <SpellGenerator />
          </div>
        </div>
        <EventPanel />
        {currentTown > -1 && (
          <TownPanel toggleRightPanel={this.toggleRightPanel} />
        )}
        {currentTown > -1 && (
          <StoryQuestsAndMerchantsPanel
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

GMMapPanel.propTypes = {
  onChangeMusics: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(GMMapPanel);
