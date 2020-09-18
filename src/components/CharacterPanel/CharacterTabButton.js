import React from 'react';
import PropTypes from 'prop-types';
import { cursorPointer, widthRightPanelLeft } from '../Utils/StyleConstants';
import ButtonLarge from '../Utils/ButtonLarge';
import {
  GiChestArmor,
  GiArmorPunch,
  GiBodyBalance,
  GiBindle,
} from 'react-icons/gi';

const styledTabButton = {
  width: `${widthRightPanelLeft / 4}px`,
  height: 25,
  padding: 0,
  position: 'relative',
  float: 'left',
  display: 'inline-block',
  cursor: cursorPointer,
};

const CharacterTabButton = ({ onChangeTab, tabToChange, isActive }) => {
  const getTabIcon = () => {
    switch (tabToChange) {
      case 'Weapons':
        return <GiChestArmor />;
      case 'Abilities':
        return <GiBodyBalance />;
      case 'Skills':
        return <GiArmorPunch />;
      default:
        return <GiBindle />;
    }
  };

  return (
    <ButtonLarge
      className={isActive ? 'buttonLargeActive' : ''}
      onClick={() => onChangeTab(tabToChange)}
      style={styledTabButton}
    >
      {getTabIcon()}
    </ButtonLarge>
  );
};

CharacterTabButton.propTypes = {
  onChangeTab: PropTypes.func.isRequired,
  tabToChange: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default CharacterTabButton;
