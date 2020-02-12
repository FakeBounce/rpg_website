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
    const {
      characterWeapons,
      characterAbilities,
      characterSkills,
      infoTab,
      onItemUse,
    } = this.props;

    return (
      <div style={styles.tabPanel} className="scrollbar">
        {infoTab === "Weapons" && (
          <CharacterTabPanelContent
            tab={characterWeapons}
            tabName={"Weapons"}
          />
        )}
        {infoTab === "Abilities" && (
          <CharacterTabPanelContent
            tab={characterAbilities}
            tabName={"Abilities"}
          />
        )}
        {infoTab === "Skills" && (
          <CharacterTabPanelContent tab={characterSkills} tabName={"Skills"} />
        )}
        {infoTab === "Items" && <CharacterTabPanelItem onItemUse={onItemUse} />}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  isGameMaster: store.appState.isGameMaster,
  characterWeapons: store.character.weapons,
  characterAbilities: store.character.abilities,
  characterSkills: store.character.skills,
});

CharacterTabPanel.propTypes = {
  infoTab: PropTypes.string.isRequired,
  onItemUse: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(CharacterTabPanel);
