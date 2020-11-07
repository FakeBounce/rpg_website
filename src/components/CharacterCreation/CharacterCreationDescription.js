import React from 'react';
import { useCharacterContext } from '../../contexts/characterContext';

const styledCreationDescriptionContainer = {
  marginTop: 15,
  display: 'flex',
  justifyContent: 'center',
  alignitems: 'center',
};

const styledCreationDescription = {
  minWidth: '30%',
  minHeight: 50,
  textAlign: 'center',
};

const CharacterCreationDescription = () => {
  const { description, setDescription } = useCharacterContext();

  return (
    <div style={styledCreationDescriptionContainer}>
      <textarea
        style={styledCreationDescription}
        name='Description'
        placeholder='Description'
        value={description}
        onChange={e => {
          setDescription(e.target.value);
        }}
      />
    </div>
  );
};

export default CharacterCreationDescription;
