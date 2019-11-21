import React, { Component } from "react";
import PropTypes from "prop-types";
import CharacterTabPanelContent from "./CharacterTabPanelContent";

import {
  widthRightPanelLeft,
  imageSize,
  heightLeft,
} from "../Utils/StyleConstants";
import CharacterTabPanelItem from "./CharacterTabPanelItem";

const styles = {
  tabPanel: {
    width: `${widthRightPanelLeft}px`,
    height: `${heightLeft / 2 - imageSize - 50}px`,
    padding: 0,
    position: "relative",
    float: "left",
    display: "inline-block",
    overflowY: "auto",
  },
};

class CharacterTabPanel extends Component {
  render() {
    const {
      character,
      infoTab,
      onItemUse,
      isGameMaster,
      currentStory,
    } = this.props;

    return (
      <div style={styles.tabPanel} className="scrollbar">
        {infoTab === "Weapons" && (
          <CharacterTabPanelContent
            tab={character.weapons || []}
            tabName={"Weapons"}
            isGameMaster="Weapons :"
            character={character}
            currentStory={currentStory}
          />
        )}
        {infoTab === "Abilities" && (
          <CharacterTabPanelContent
            tab={character.abilities || []}
            tabName={"Abilities"}
            character={character}
            currentStory={currentStory}
          />
        )}
        {infoTab === "Skills" && (
          <CharacterTabPanelContent
            tab={character.skills || []}
            tabName={"Skills"}
            character={character}
            currentStory={currentStory}
          />
        )}
        {infoTab === "Items" && (
          <CharacterTabPanelItem
            currentStory={currentStory}
            character={character}
            onItemUse={onItemUse}
            isGameMaster={isGameMaster}
          />
        )}
      </div>
    );
  }
}

CharacterTabPanel.propTypes = {
  character: PropTypes.object.isRequired,
  currentStory: PropTypes.number.isRequired,
  infoTab: PropTypes.string.isRequired,
  onItemUse: PropTypes.func.isRequired,
  isGameMaster: PropTypes.bool.isRequired,
};

export default CharacterTabPanel;
