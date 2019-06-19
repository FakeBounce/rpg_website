import React, { Component } from "react";
import PropTypes from "prop-types";
import CharacterCreationImage from "./CharacterCreationImage";
import CharacterCreationStats from "./CharacterCreationStats";

const styledCharacterBox = {
  height: window.innerHeight - 75 - 50, // minus header and validation button
};

class CharacterCreationBox extends Component {
  render() {
    const { name, icon, onDrop, removePicture, ...rest } = this.props;

    return (
      <div style={styledCharacterBox}>
        <CharacterCreationImage
          name={name}
          icon={icon}
          onDrop={onDrop}
          removePicture={removePicture}
        />
        <CharacterCreationStats {...rest} />
      </div>
    );
  }
}

CharacterCreationBox.propTypes = {
  abilities: PropTypes.array.isRequired,
  addAbility: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
  addSkill: PropTypes.func.isRequired,
  addWeapon: PropTypes.func.isRequired,
  attributes: PropTypes.object.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType("string", "number", "object").isRequired,
  items: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onChangeAbilities: PropTypes.func.isRequired,
  onChangeAttributes: PropTypes.func.isRequired,
  onChangeItems: PropTypes.func.isRequired,
  onChangeItemsQuantity: PropTypes.func.isRequired,
  onChangeSkills: PropTypes.func.isRequired,
  onChangeWeapons: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  removeAbility: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  removePicture: PropTypes.func.isRequired,
  removeSkill: PropTypes.func.isRequired,
  removeWeapon: PropTypes.func.isRequired,
  skills: PropTypes.array.isRequired,
  totalPointsleft: PropTypes.number.isRequired,
  weapons: PropTypes.array.isRequired,
};

export default CharacterCreationBox;
