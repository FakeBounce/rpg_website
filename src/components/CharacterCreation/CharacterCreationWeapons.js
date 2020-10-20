import React  from "react";
import { useCharacterContext } from "../../contexts/characterContext";

const CharacterCreationWeapons = () => {
  const {
    weapons,
    onChangeWeapons,
    removeWeapon,
    addWeapon,
  } = useCharacterContext();

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
      {weapons.length < 2 && <button onClick={addWeapon}>Add a weapon</button>}
    </div>
  );
};

export default CharacterCreationWeapons;
