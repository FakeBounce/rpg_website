import React from 'react';
import PropTypes from 'prop-types';
import { cursorPointer } from '../Utils/StyleConstants';

const styledItem = {
  display: 'inline-block',
  border: '1px solid green',
  cursor: cursorPointer,
};
const styledIcon = {
  width: 30,
  height: 30,
  float: 'left',
  display: 'inline-block',
};
const styledText = {
  marginLeft: 5,
  float: 'left',
  display: 'inline-block',
};
const CharacterPreview = ({
  icon,
  name,
  chooseCharacter,
  modifyCharacter,
  id,
}) => {
  return (
    <div style={styledItem}>
      <img src={icon} alt={name} style={styledIcon} />
      <div style={styledText}>{name}</div>
      <button onClick={() => chooseCharacter(id)}>Selectionner</button>
      <button onClick={() => modifyCharacter(id)}>Modifier</button>
    </div>
  );
};

CharacterPreview.propTypes = {
  id: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  chooseCharacter: PropTypes.func.isRequired,
  modifyCharacter: PropTypes.func.isRequired,
};

export default CharacterPreview;
