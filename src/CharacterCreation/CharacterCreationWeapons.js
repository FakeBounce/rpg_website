import React, { Component } from "react";
import PropTypes from "prop-types";

class CharacterCreationWeapons extends Component {
  render() {
    const { weapons, onChangeWeapons, removeWeapon, addWeapon } = this.props;

    return (
      <div>
        Weapons :
        {weapons.map((weapon, index) => {
          return (
            <div key={`weapon-${index}`}>
              <input
                type="text"
                placeholder={`Weapon ${index + 1} + description if needed`}
                value={weapon}
                onChange={e => {
                  onChangeWeapons(index, e.target.value);
                }}
              />
              <button onClick={() => removeWeapon(index)}>
                Remove this weapon
              </button>
            </div>
          );
        })}
        {weapons.length < 2 && (
          <button onClick={addWeapon}>Add a weapon</button>
        )}
      </div>
    );
  }
}

CharacterCreationWeapons.propTypes = {
  weapons: PropTypes.array.isRequired,
  onChangeWeapons: PropTypes.func.isRequired,
  removeWeapon: PropTypes.func.isRequired,
  addWeapon: PropTypes.func.isRequired,
};

export default CharacterCreationWeapons;
