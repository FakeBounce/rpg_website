import React from "react";
import { useCharacterContext } from "../../contexts/characterContext";

const CharacterCreationAbilites = () => {
  const {
    abilities,
    onChangeAbilities,
    removeAbility,
    addAbility,
  } = useCharacterContext;

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
};

export default CharacterCreationAbilites;
