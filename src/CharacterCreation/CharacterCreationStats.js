import React, { Component } from "react";
import PropTypes from "prop-types";
import CharacterCreationItems from "./CharacterCreationItems";
import CharacterCreationAbilites from "./CharacterCreationAbilites";
import CharacterCreationWeapons from "./CharacterCreationWeapons";
import CharacterCreationSkills from "./CharacterCreationSkills";
import CharacterCreationAttributes from "./CharacterCreationAttributes";
import CharacterCreationDescription from "./CharacterCreationDescription";

const styledCharacterStats = {
  width: "80%",
  height: window.innerHeight - 75 - 50 - 50, // minus header, validation button
  // and character name
  position: "relative",
  float: "left",
};

class CharacterCreationStats extends Component {
  render() {
    const {
      abilities,
      addAbility,
      addItem,
      addSkill,
      addWeapon,
      attributes,
      description,
      items,
      onChange,
      onChangeAbilities,
      onChangeAttributes,
      onChangeItems,
      onChangeItemsQuantity,
      onChangeSkills,
      onChangeWeapons,
      removeAbility,
      removeItem,
      removeSkill,
      removeWeapon,
      skills,
      totalPointsleft,
      weapons,
    } = this.props;

    return (
      <div style={styledCharacterStats}>
        <CharacterCreationAttributes
          attributes={attributes}
          onChange={onChangeAttributes}
          totalPointsleft={totalPointsleft}
        />
        <CharacterCreationSkills
          skills={skills}
          onChangeSkills={onChangeSkills}
          addSkill={addSkill}
          removeSkill={removeSkill}
        />
        <CharacterCreationWeapons
          weapons={weapons}
          onChangeWeapons={onChangeWeapons}
          removeWeapon={removeWeapon}
          addWeapon={addWeapon}
        />
        <CharacterCreationAbilites
          abilities={abilities}
          onChangeAbilities={onChangeAbilities}
          removeAbility={removeAbility}
          addAbility={addAbility}
        />
        <CharacterCreationItems
          items={items}
          onChangeItems={onChangeItems}
          onChangeItemsQuantity={onChangeItemsQuantity}
          removeItem={removeItem}
          addItem={addItem}
        />
        <CharacterCreationDescription
          description={description}
          onChange={onChange}
        />
      </div>
    );
  }
}

CharacterCreationStats.propTypes = {
  abilities: PropTypes.array.isRequired,
  addAbility: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
  addSkill: PropTypes.func.isRequired,
  addWeapon: PropTypes.func.isRequired,
  attributes: PropTypes.object.isRequired,
  description: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onChangeAbilities: PropTypes.func.isRequired,
  onChangeAttributes: PropTypes.func.isRequired,
  onChangeItems: PropTypes.func.isRequired,
  onChangeItemsQuantity: PropTypes.func.isRequired,
  onChangeSkills: PropTypes.func.isRequired,
  onChangeWeapons: PropTypes.func.isRequired,
  removeAbility: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  removeSkill: PropTypes.func.isRequired,
  removeWeapon: PropTypes.func.isRequired,
  skills: PropTypes.array.isRequired,
  totalPointsleft: PropTypes.number.isRequired,
  weapons: PropTypes.array.isRequired,
};

export default CharacterCreationStats;
