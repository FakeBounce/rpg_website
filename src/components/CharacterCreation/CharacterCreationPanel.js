import React from 'react';
import { cursorPointer } from '../Utils/StyleConstants';
import CharacterCreationName from './CharacterCreationName';
import CharacterCreationBox from './CharacterCreationBox';
import { useCharacterContext } from '../../contexts/characterContext';

const styledItem = {
  display: 'inline-block',
  border: '1px solid green',
  width: '80%',
  position: 'relative',
  cursor: cursorPointer,
};

const CharacterCreationPanel = () => {
  const { validateBeforeCreate } = useCharacterContext();

  return (
    <div style={styledItem}>
      <CharacterCreationName />
      <CharacterCreationBox />
      <button onClick={validateBeforeCreate}>Validate</button>
    </div>
  );
};

export default CharacterCreationPanel;
