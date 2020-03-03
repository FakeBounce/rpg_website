import React, { Component } from "react";
import { heightLeft, widthLeft } from "../components/Utils/StyleConstants";
import EventPanel from "../components/EventPanel";
import MapEditionPanel from "../components/MapEditionPanel";
import StoryQuestsAndMerchantsPanel from "../components/StoryQuestsAndMerchantsPanel";
import TownPanel from "../components/TownPanel";
import SpellGeneratorPanel from "../components/SpellGeneratorPanel";
import { connect } from "react-redux";

const styledMiddlePanel = {
  width: `${widthLeft}px`,
  height: `${heightLeft}px`,
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
        <SpellGeneratorPanel />
        <EventPanel />
        {currentTown > -1 && (
          <TownPanel toggleRightPanel={this.toggleRightPanel} />
        )}
        {currentTown > -1 && (
          <StoryQuestsAndMerchantsPanel isOnQuest={isOnQuest} />
        )}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  currentStory: store.appState.currentStory,
  currentTown: store.appState.currentTown,
});

export default connect(mapStateToProps)(GMMapPanel);
