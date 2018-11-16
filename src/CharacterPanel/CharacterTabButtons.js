import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CharacterTabButton from './CharacterTabButton';
import { widthRightPanelLeft } from '../Utils/StyleConstants';

const styles = {
  tabsButtons: {
    width: `${widthRightPanelLeft}px`,
    height: 25,
    position: 'relative',
    float: 'left',
    display: 'inline-block',
  },
};

class CharacterTabButtons extends Component {
  render() {
    const { onChangeTab, infoTab } = this.props;

    return (
      <div style={styles.tabsButtons}>
        <CharacterTabButton
          onChangeTab={onChangeTab}
          tabToChange="Weapons"
          isActive={infoTab === 'Weapons'}
        />
        <CharacterTabButton
          onChangeTab={onChangeTab}
          tabToChange="Abilities"
          isActive={infoTab === 'Abilities'}
        />
        <CharacterTabButton
          onChangeTab={onChangeTab}
          tabToChange="Skills"
          isActive={infoTab === 'Skills'}
        />
        <CharacterTabButton
          onChangeTab={onChangeTab}
          tabToChange="Items"
          isActive={infoTab === 'Items'}
        />
      </div>
    );
  }
}

CharacterTabButtons.propTypes = {
  onChangeTab: PropTypes.func.isRequired,
  infoTab: PropTypes.string.isRequired,
};

export default CharacterTabButtons;
