import React, { Component } from "react";
import PropTypes from "prop-types";
import CharacterTabPanelContent from "./CharacterTabPanelContent";

import {
  widthRightPanelLeft,
  imageSize,
  heightLeft,
} from "../Utils/StyleConstants";
import CharacterTabPanelItem from "./CharacterTabPanelItem";
import { connect } from "react-redux";

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
    const { character, infoTab, onItemUse, isGameMaster } = this.props;

    return (
      <div style={styles.tabPanel} className="scrollbar">
        {infoTab === "Weapons" && (
          <CharacterTabPanelContent
            tab={character.weapons || []}
            tabName={"Weapons"}
            isGameMaster="Weapons :"
            character={character}
          />
        )}
        {infoTab === "Abilities" && (
          <CharacterTabPanelContent
            tab={character.abilities || []}
            tabName={"Abilities"}
            character={character}
          />
        )}
        {infoTab === "Skills" && (
          <CharacterTabPanelContent
            tab={character.skills || []}
            tabName={"Skills"}
            character={character}
          />
        )}
        {infoTab === "Items" && (
          <CharacterTabPanelItem
            character={character}
            onItemUse={onItemUse}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  isGameMaster: store.appState.isGameMaster,
});

CharacterTabPanel.propTypes = {
  character: PropTypes.object.isRequired,
  infoTab: PropTypes.string.isRequired,
  onItemUse: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(CharacterTabPanel);
