import React from 'react';
import { useCharacterContext } from '../../contexts/characterContext';

const styledCreationNameContainer = {
  display: 'flex',
  flex: 1,
  justifyContent: 'center',
};

const styledCreationName = {
  minWidth: '30%',
  textAlign: 'center',
};

const CharacterCreationName = () => {
  const { name, setName } = useCharacterContext();

  return (
    <div style={styledCreationNameContainer}>
      <input
        style={styledCreationName}
        type='text'
        name='Name'
        placeholder='Name'
        value={name}
        onChange={e => {
          setName(e.target.value);
        }}
      />
    </div>
  );
};

export default CharacterCreationName;
