import React, { Component } from "react";
import PropTypes from "prop-types";

class CharacterCreationAbilites extends Component {
  render() {
    const {
      abilities,
      onChangeAbilities,
      removeAbility,
      addAbility,
    } = this.props;

    return (
      <div>
        Abilities :
        {abilities.map((ability, index) => {
          return (
            <div key={`ability-${index}`}>
              <input
                type="text"
                placeholder={`Ability ${index + 1}`}
                value={ability}
                onChange={e => {
                  onChangeAbilities(index, e.target.value);
                }}
              />
              <button onClick={() => removeAbility(index)}>
                Remove this ability
              </button>
            </div>
          );
        })}
        <button onClick={addAbility}>Add an ability</button>
      </div>
    );
  }
}

CharacterCreationAbilites.propTypes = {
  abilities: PropTypes.array.isRequired,
  onChangeAbilities: PropTypes.func.isRequired,
  removeAbility: PropTypes.func.isRequired,
  addAbility: PropTypes.func.isRequired,
};

export default CharacterCreationAbilites;
