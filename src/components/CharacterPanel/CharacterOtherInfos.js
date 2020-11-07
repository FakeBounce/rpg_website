import React from 'react';
import { useSelector } from 'react-redux';
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

const CharacterOtherInfos = ({
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
  toggleIsOnChar,
  mentalDamage,
  onMentalChange,
}) => {
  const { isGameMaster } = useSelector(store => ({
    isGameMaster: store.appState.isGameMaster,
  }));
  return (
    <div style={styles.characterOtherInfos}>
      <CharacterTabButtons onChangeTab={onChangeTab} infoTab={infoTab} />
      <CharacterTabPanel infoTab={infoTab} onItemUse={onItemUse} />
      {isGameMaster && (
        <CharacterInputs
          status={status}
          gold={gold}
          infoTab={infoTab}
          damageTaken={damageTaken}
          onChange={onChange}
          onChangeTab={onChangeTab}
          onLifeChange={onLifeChange}
          onStatusChange={onStatusChange}
          onGoldChange={onGoldChange}
          toggleIsOnChar={toggleIsOnChar}
          mentalDamage={mentalDamage}
          onMentalChange={onMentalChange}
        />
      )}
    </div>
  );
};

CharacterOtherInfos.propTypes = {
  status: PropTypes.string.isRequired,
  gold: PropTypes.number.isRequired,
  infoTab: PropTypes.string.isRequired,
  damageTaken: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onChangeTab: PropTypes.func.isRequired,
  onLifeChange: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onGoldChange: PropTypes.func.isRequired,
  onItemUse: PropTypes.func.isRequired,
  toggleIsOnChar: PropTypes.func.isRequired,
};

export default CharacterOtherInfos;
