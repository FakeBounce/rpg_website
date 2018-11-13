import React, { Component } from "react";
import PropTypes from "prop-types";
import CharacterTabPanelContent from "./CharacterTabPanelContent";

import {
  heightHeader,
  widthRightPanelLeft,
  imageSize, heightLeft,
} from "../Utils/StyleConstants";
import CharacterTabPanelItem from "./CharacterTabPanelItem";

const styles = {
  tabPanel: {
    width: `${widthRightPanelLeft}px`,
    height: `${heightLeft/2 - imageSize - 50}px`,
    padding: 0,
    position: "relative",
    float: "left",
    display: "inline-block",
    overflowY: "auto",
  },
};

class CharacterTabPanel extends Component {
  render() {
    const { character, infoTab, onItemUse } = this.props;

    return (
      <div style={styles.tabPanel}>
        {infoTab === "Weapons" && (
          <CharacterTabPanelContent
            tab={character.weapons || []}
            title="Weapons :"
          />
        )}
        {infoTab === "Abilities" && (
          <CharacterTabPanelContent
            tab={character.abilities || []}
            title="Abilities :"
          />
        )}
        {infoTab === "Skills" && (
          <CharacterTabPanelContent
            tab={character.skills || []}
            title="Skills :"
          />
        )}
        {infoTab === "Items" && (
          <CharacterTabPanelItem character={character} onItemUse={onItemUse} />
        )}
      </div>
    );
  }
}

CharacterTabPanel.propTypes = {
  character: PropTypes.object.isRequired,
  infoTab: PropTypes.string.isRequired,
  onItemUse: PropTypes.func.isRequired,
};

export default CharacterTabPanel;
