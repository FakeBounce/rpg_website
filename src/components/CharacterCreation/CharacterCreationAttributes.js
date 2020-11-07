import React from 'react';
import { attributes as namedAttributes } from '../Utils/Constants';
import { useCharacterContext } from '../../contexts/characterContext';

const styledBoxHeader = {
  width: '100%',
  height: 20,
  marginBottom: 5,
  textAlign: 'center',
};

const styledAttribute = {
  padding: 5,
};

const styledAttributeInput = {
  marginLeft: 5,
  width: 50,
};

const CharacterCreationAttributes = () => {
  const {
    attributes,
    onChangeAttribute,
    totalPointsleft,
  } = useCharacterContext();

  return (
    <div>
      <div style={styledBoxHeader}>Attributes :</div>
      {namedAttributes.map(a => {
        return (
          <div key={`attribute-${a}`} style={styledAttribute}>
            {a.toUpperCase()} :
            <input
              type='number'
              name={a}
              placeholder={a}
              value={attributes[a]}
              onChange={e => {
                onChangeAttribute(e.target.name, e.target.value);
              }}
              style={styledAttributeInput}
              min='5'
              max='75'
            />
          </div>
        );
      })}
      <div>Total points left : {totalPointsleft}</div>
    </div>
  );
};

export default CharacterCreationAttributes;
