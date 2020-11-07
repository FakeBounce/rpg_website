import React from 'react';
import { cursorPointer } from '../Utils/StyleConstants';
import CharacterCreationName from './CharacterCreationName';
import CharacterCreationBox from './CharacterCreationBox';
import { useCharacterContext } from '../../contexts/characterContext';
import ButtonLarge from '../Utils/ButtonLarge';

const styledItem = {
  display: 'inline-block',
  border: '1px solid green',
  width: '80%',
  position: 'relative',
};

const CharacterCreationPanel = () => {
  const { validateBeforeCreate } = useCharacterContext();

  return (
    <div style={styledItem}>
      <CharacterCreationName />
      <CharacterCreationBox />
      <ButtonLarge onClick={validateBeforeCreate}>Validate</ButtonLarge>
    </div>
  );
};

export default CharacterCreationPanel;
