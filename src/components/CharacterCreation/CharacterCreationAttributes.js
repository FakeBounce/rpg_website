import React from "react";
import { attributes as namedAttributes } from "../Utils/Constants";
import { useCharacterContext } from "../../contexts/characterContext";

const styledBoxHeader = {
  width: "100%",
  height: 20,
  marginBottom: 5,
  textAlign: "center",
};

const CharacterCreationAttributes = () => {
  const {
    attributes,
    onChangeAttribute,
    totalPointsleft,
  } = useCharacterContext;

  return (
    <div>
      <div style={styledBoxHeader}>Attributes :</div>
      {namedAttributes.map(a => {
        return (
          <div key={`attribute-${a}`}>
            {a} :
            <input
              type="number"
              name={a}
              placeholder={a}
              value={attributes[a]}
              onChange={e => {
                onChangeAttribute(e.target.name, e.target.value);
              }}
              min="5"
              max="75"
            />
          </div>
        );
      })}
      <div>Total points left : {totalPointsleft}</div>
    </div>
  );
};

export default CharacterCreationAttributes;
