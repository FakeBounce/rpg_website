import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';
import CharacterAttributes from './CharacterAttributes';
import CharacterOtherInfos from './CharacterOtherInfos';
import CharacterHeader from './CharacterHeader';
import { colors } from '../Utils/Constants';
import useApp from '../../hooks/useApp';
import { useSelector } from 'react-redux';

const styledCharacterPanelContainer = {
  borderBottom: '1px solid black',
  width: '100%',
  height: '50%',
  backgroundColor: colors.background,
  color: colors.text,
};
const styledCharacterPanelBox = { position: 'relative', height: '100%' };

const CharacterPanel = ({
  infoTab,
  status,
  damageTaken,
  gold,
  onChange,
  onChangeTab,
  onLifeChange,
  onStatusChange,
  onItemUse,
  onGoldChange,
  toggleIsOnChar,
}) => {

  const { triggerError } = useApp();
  const { isGameMaster } = useSelector(store => ({
    isGameMaster: store.appState.isGameMaster,
  }));

  return (
    <div style={styledCharacterPanelContainer}>
      <div style={styledCharacterPanelBox}>
        {isGameMaster ? (
          <CharacterHeader
            isGameMaster={isGameMaster}
            gold={0}
            status={'Gamemaster'}
            icon={'./common/gameMaster.jpg'}
            name={'Gamemaster'}
            health={'999'}
            maxHealth={'999'}
            mentalState={'9'}
            maxMentalState={'9'}
            triggerError={triggerError}
          />
        ) : (
          <CharacterHeader triggerError={triggerError} />
        )}
        <CharacterAttributes />
        <CharacterOtherInfos
          status={status}
          infoTab={infoTab}
          damageTaken={damageTaken}
          gold={gold}
          onChange={onChange}
          onChangeTab={onChangeTab}
          onLifeChange={onLifeChange}
          onStatusChange={onStatusChange}
          onItemUse={onItemUse}
          onGoldChange={onGoldChange}
          toggleIsOnChar={toggleIsOnChar}
        />
      </div>
    </div>
  );
};

CharacterPanel.propTypes = {
  onChange: PropTypes.func.isRequired,
  infoTab: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  damageTaken: PropTypes.number.isRequired,
  gold: PropTypes.number.isRequired,
  onChangeTab: PropTypes.func.isRequired,
  onLifeChange: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onItemUse: PropTypes.func.isRequired,
  onGoldChange: PropTypes.func.isRequired,
  toggleIsOnChar: PropTypes.func.isRequired,
  triggerError: PropTypes.func.isRequired,
};

export default CharacterPanel;
