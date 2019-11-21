import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CharacterTabButtons from './CharacterTabButtons';
import CharacterTabPanel from './CharacterTabPanel';
import CharacterInputs from './CharacterInputs';
import {
  widthRightPanelLeft,
  imageSize,
  heightLeft,
} from '../Utils/StyleConstants';

const styles = {
  characterOtherInfos: {
    width: `${widthRightPanelLeft}px`,
    height: `${heightLeft / 2 - imageSize}px`,
    position: 'relative',
    float: 'left',
    display: 'inline-block',
  },
};

class CharacterOtherInfos extends Component {
  render() {
    const {
      character,
      currentStory,
      infoTab,
      status,
      gold,
      onChangeTab,
      onChange,
      onLifeChange,
      onStatusChange,
      onGoldChange,
      onItemUse,
      damageTaken,
      isGameMaster,
      toggleIsOnChar,
    } = this.props;

    return (
      <div style={styles.characterOtherInfos}>
        <CharacterTabButtons onChangeTab={onChangeTab} infoTab={infoTab}/>
        <CharacterTabPanel
          character={character}
          currentStory={currentStory}
          infoTab={infoTab}
          onItemUse={onItemUse}
          isGameMaster={isGameMaster}
        />
        <CharacterInputs
          character={character}
          status={status}
          gold={gold}
          infoTab={infoTab}
          damageTaken={damageTaken}
          isGameMaster={isGameMaster}
          onChange={onChange}
          onChangeTab={onChangeTab}
          onLifeChange={onLifeChange}
          onStatusChange={onStatusChange}
          onGoldChange={onGoldChange}
          toggleIsOnChar={toggleIsOnChar}
        />
      </div>
    );
  }
}

CharacterOtherInfos.propTypes = {
  character: PropTypes.object.isRequired,
  currentStory: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  gold: PropTypes.number.isRequired,
  infoTab: PropTypes.string.isRequired,
  damageTaken: PropTypes.number.isRequired,
  isGameMaster: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onChangeTab: PropTypes.func.isRequired,
  onLifeChange: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onGoldChange: PropTypes.func.isRequired,
  onItemUse: PropTypes.func.isRequired,
  toggleIsOnChar: PropTypes.func.isRequired,
};

export default CharacterOtherInfos;