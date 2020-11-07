import React from 'react';
import PropTypes from 'prop-types';
import { cursorPointer } from '../Utils/StyleConstants';

const styledTabsContainer = {
  height: 50,
  paddingTop: 10,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const styledTab = {
  display: 'flex',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  borderLeft: '1px solid white',
  borderBottom: '1px solid white',
  cursor: cursorPointer,
};

const styledActiveTab = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  borderLeft: '1px solid white',
  borderBottom: '1px solid white',
  backgroundColor: 'white',
  color: 'black',
  cursor: cursorPointer,
};

const CharacterCreationStatsTabs = ({ currentPanel, changePanel }) => {
  return (
    <div style={styledTabsContainer}>
      <div
        style={currentPanel === 'attributes' ? styledActiveTab : styledTab}
        onClick={() => changePanel('attributes')}
      >
        Attributes
      </div>
      <div
        style={currentPanel === 'skills' ? styledActiveTab : styledTab}
        onClick={() => changePanel('skills')}
      >
        Skills
      </div>
      <div
        style={currentPanel === 'items' ? styledActiveTab : styledTab}
        onClick={() => changePanel('items')}
      >
        Items
      </div>
    </div>
  );
};

CharacterCreationStatsTabs.propTypes = {
  currentPanel: PropTypes.string.isRequired,
  changePanel: PropTypes.func.isRequired,
};

export default CharacterCreationStatsTabs;
