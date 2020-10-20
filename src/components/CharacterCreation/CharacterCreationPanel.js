import React from "react";
import PropTypes from "prop-types";
import { cursorPointer } from "../Utils/StyleConstants";
import CharacterCreationName from "./CharacterCreationName";
import CharacterCreationBox from "./CharacterCreationBox";
import { connect } from "react-redux";
import { useCharacterContext } from "../../contexts/characterContext";

const styledItem = {
  display: "inline-block",
  border: "1px solid green",
  width: "80%",
  position: "relative",
  cursor: cursorPointer,
};

const CharacterCreationPanel = props => {
  const {
    totalPointsleft,
    name,
    icon,
    attributes,
    items,
    skills,
    abilities,
    weapons,
    iconPath,
    description,
  } = useCharacterContext();

  const validateBeforeCreate = () => {
    const {
      id,
      triggerError,
      createCharacter,
      updateCharacter,
      isAnUpdate,
      character,
    } = props;
    if (totalPointsleft < 0) {
      triggerError({
        message: "Cannot exceed points limit !",
      });
    } else if (name === "") {
      triggerError({ message: "Name cannot be empty !!" });
    } else if (icon === "") {
      triggerError({ message: "Icon cannot be empty !" });
    } else if (isAnUpdate) {
      const health =
        attributes.constitution !== character.constitution
          ? parseInt(character.health, 10) +
            (parseInt(attributes.constitution, 10) -
              parseInt(character.constitution, 10))
          : character.health;

      const mentalState = character.willpower
        ? attributes.willpower !== character.willpower
          ? parseInt(character.mentalState, 10) +
            (parseInt(attributes.willpower, 10) / 5 -
              parseInt(character.willpower, 10) / 5)
          : character.mentalState
        : attributes.willpower;

      updateCharacter({
        attributes,
        items,
        skills,
        abilities,
        weapons,
        iconPath,
        description,
        name,
        icon,
        health,
        mentalState,
        maxHealth: parseInt(attributes.constitution, 10) + 10,
        maxMentalState: parseInt(attributes.willpower, 10) / 5 + 1,
        id,
      });
    } else {
      createCharacter({
        attributes,
        items,
        skills,
        abilities,
        weapons,
        iconPath,
        description,
        name,
        icon,
        mentalState: Math.ceil(
          (parseInt(attributes.willpower, 10) / 5 + 1) / 2,
        ),
        maxMentalState: parseInt(attributes.willpower, 10) / 5 + 1,
        health: parseInt(attributes.constitution, 10) + 10,
        maxHealth: parseInt(attributes.constitution, 10) + 10,
        id,
      });
    }
  };

  return (
    <div style={styledItem}>
      <CharacterCreationName />
      <CharacterCreationBox />
      <button onClick={validateBeforeCreate}>Validate</button>
    </div>
  );
};

const mapStateToProps = store => ({
  uid: store.userInfos.uid,
});

CharacterCreationPanel.defaultProps = {
  character: {},
};

CharacterCreationPanel.propTypes = {
  id: PropTypes.number.isRequired,
  isAnUpdate: PropTypes.bool.isRequired,
  character: PropTypes.object,
  createCharacter: PropTypes.func.isRequired,
  updateCharacter: PropTypes.func.isRequired,
  triggerError: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(CharacterCreationPanel);
