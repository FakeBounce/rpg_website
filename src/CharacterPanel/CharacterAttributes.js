import React, { Component } from "react";
import PropTypes from "prop-types";
import { heightLeft, imageSize } from "../Utils/StyleConstants";

const styles = {
  BoxHeader: {
    width: "100%",
    height: "20px",
    marginBottom: "5px",
    textAlign: "center",
  },
  characterAttributeInfos: {
    width: `${imageSize - 1}px`,
    height: `${heightLeft/2 - imageSize}px`,
    position: "relative",
    float: "left",
    display: "inline-block",
    borderRight: "1px solid black",
    overflowY: "auto",
  },
};
const styledAttribute = {
  marginLeft: 5,
  float: "left",
  display: "inline-block",
};

class CharacterAttributes extends Component {
  render() {
    const { character } = this.props;

    return (
      <div style={styles.characterAttributeInfos}>
        <div style={styles.BoxHeader}>Attributes :</div>
        <div style={styledAttribute}>Stre : {character.strength}</div>
        <div style={styledAttribute}>Dext : {character.dexterity}</div>
        <div style={styledAttribute}>Perc : {character.perception}</div>
        <div style={styledAttribute}>Magi : {character.magic}</div>
        <div style={styledAttribute}>Cons : {character.constitution}</div>
        <div style={styledAttribute}>Char : {character.charisma}</div>
        <div style={styledAttribute}>Luck : {character.luck}</div>
        <div style={styledAttribute}>Educ : {character.education}</div>
      </div>
    );
  }
}

CharacterAttributes.propTypes = {
  character: PropTypes.object.isRequired,
};

export default CharacterAttributes;
