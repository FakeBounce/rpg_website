import React from 'react';
import PropTypes from 'prop-types';
import CharacterTabPanelContent from './CharacterTabPanelContent';
import { useSelector } from 'react-redux';

import {
  widthRightPanelLeft,
  imageSize,
  heightLeft,
} from '../Utils/StyleConstants';
import CharacterTabPanelItem from './CharacterTabPanelItem';

const styles = {
  tabPanel: {
    width: `${widthRightPanelLeft}px`,
    height: `${heightLeft / 2 - imageSize - 50}px`,
    padding: 0,
    position: 'relative',
    float: 'left',
    display: 'inline-block',
    overflowY: 'auto',
  },
};

const CharacterTabPanel = ({ infoTab, onItemUse }) => {
  const { characterWeapons, characterAbilities, characterSkills } = useSelector(
    store => ({
      characterWeapons: store.character.weapons,
      characterAbilities: store.character.abilities,
      characterSkills: store.character.skills,
    }),
  );
  return (
    <div style={styles.tabPanel} className='scrollbar'>
      {infoTab === 'Weapons' && (
        <CharacterTabPanelContent tab={characterWeapons} tabName={'Weapons'} />
      )}
      {infoTab === 'Abilities' && (
        <CharacterTabPanelContent
          tab={characterAbilities}
          tabName={'Abilities'}
        />
      )}
      {infoTab === 'Skills' && (
        <CharacterTabPanelContent tab={characterSkills} tabName={'Skills'} />
      )}
      {infoTab === 'Items' && <CharacterTabPanelItem onItemUse={onItemUse} />}
    </div>
  );
};

CharacterTabPanel.propTypes = {
  infoTab: PropTypes.string.isRequired,
  onItemUse: PropTypes.func.isRequired,
};

export default CharacterTabPanel;
