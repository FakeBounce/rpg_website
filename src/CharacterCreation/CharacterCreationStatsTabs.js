import React, { Component } from "react";
import PropTypes from "prop-types";

const styledTabsContainer = {
  width: "100%",
  height: 50,
  paddingTop: 10,
};

const styledTab = {
  width: "33%",
  position: "relative",
  float: "left",
};

const styledActiveTab = {
  width: "33%",
  position: "relative",
  float: "left",
};

class CharacterCreationStatsTabs extends Component {
  render() {
    const { currentPanel, changePanel } = this.props;

    return (
      <div style={styledTabsContainer}>
        <div
          style={currentPanel === "attributes" ? styledTab : styledActiveTab}
          onClick={() => changePanel("attributes")}
        >
          Attributes
        </div>
        <div style={styledTab} onClick={() => changePanel("skills")}>
          Skills
        </div>
        <div style={styledTab} onClick={() => changePanel("items")}>
          Items
        </div>
      </div>
    );
  }
}

CharacterCreationStatsTabs.propTypes = {
  currentPanel: PropTypes.string.isRequired,
  changePanel: PropTypes.func.isRequired,
};

export default CharacterCreationStatsTabs;
