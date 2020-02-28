import React, { Component } from "react";
import {
  cursorPointer,
  heightLeft,
  widthLeft,
} from "../components/Utils/StyleConstants";
import EventPanel from "../components/EventPanel";
import MapEditionPanel from "../components/MapEditionPanel";
import StoryQuestsAndMerchantsPanel from "../components/StoryQuestsAndMerchantsPanel";
import TownPanel from "../components/TownPanel";
import SpellGenerator from "../components/Utils/SpellGenerator";
import { connect } from "react-redux";
import { Menu } from "semantic-ui-react";
import { colors } from "../components/Utils/Constants";

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
  display: "flex",
  flexDirection: "column",
  borderRight: "1px solid white",
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
            <div
              style={{
                marginTop: 10,
                marginBottom: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Menu attached="top" tabular>
                <Menu.Item
                  name={"SpellGenerator"}
                  active={true}
                  style={{
                    width: 150,
                    marginLeft: widthLeft / 4 - 75,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 0,
                    backgroundColor: colors.background,
                    color: "white",
                    cursor: cursorPointer,
                  }}
                />
              </Menu>
            </div>
            <SpellGenerator />
          </div>
        </div>
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
