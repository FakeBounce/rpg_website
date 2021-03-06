import React from 'react';
import PropTypes from 'prop-types';
import ButtonLarge from '../Utils/ButtonLarge';
import { statusList } from '../Utils/Constants';
import { useSelector } from 'react-redux';

const CharacterInputsLifeInput = {
  position: 'relative',
  float: 'left',
  display: 'inline-block',
  width: 35,
  height: 19,
};
const CharacterInputsLifeSelect = {
  position: 'relative',
  float: 'left',
  display: 'inline-block',
  width: 50,
  height: 19,
};
const CharacterInputsLifeButton = {
  position: 'relative',
  float: 'left',
  display: 'inline-block',
  width: 25,
  height: 25,
  padding: 0,
};
const CharacterInputsStatusButton = {
  position: 'relative',
  float: 'left',
  display: 'inline-block',
  width: 42,
  height: 25,
  padding: 0,
};
const CharacterInputsGoldButton = {
  position: 'relative',
  float: 'left',
  display: 'inline-block',
  width: 35,
  height: 25,
  padding: 0,
};

const CharacterInputs = ({
  gold,
  status,
  onChange,
  onLifeChange,
  onStatusChange,
  onGoldChange,
  damageTaken,
  mentalDamage,
  onMentalChange,
}) => {
  const { isGameMaster } = useSelector(store => ({
    isGameMaster: store.appState.isGameMaster,
  }));

  return (
    <div>
      <input
        type='number'
        placeholder='X'
        name='damageTaken'
        value={damageTaken}
        onChange={e => {
          onChange(e.target.name, parseInt(e.target.value, 10));
        }}
        style={CharacterInputsLifeInput}
      />
      <ButtonLarge onClick={onLifeChange} style={CharacterInputsLifeButton}>
        HP
      </ButtonLarge>
      <select
        value={status}
        onChange={e => {
          onChange('status', e.target.value);
        }}
        style={CharacterInputsLifeSelect}
      >
        {statusList.map(sts => {
          return (
            <option key={sts} value={sts}>
              {sts}
            </option>
          );
        })}
      </select>
      <ButtonLarge onClick={onStatusChange} style={CharacterInputsStatusButton}>
        Status
      </ButtonLarge>
      {isGameMaster && (
        <div>
          <input
            type='number'
            placeholder='X'
            name='gold'
            value={gold}
            onChange={e => {
              onChange(e.target.name, parseInt(e.target.value, 10));
            }}
            style={CharacterInputsLifeInput}
          />
          <ButtonLarge onClick={onGoldChange} style={CharacterInputsGoldButton}>
            Gold
          </ButtonLarge>
        </div>
      )}

      <input
        type='number'
        placeholder='X'
        name='mentalDamage'
        value={mentalDamage}
        onChange={e => {
          onChange(e.target.name, parseInt(e.target.value, 10));
        }}
        style={CharacterInputsLifeInput}
      />
      <ButtonLarge onClick={onMentalChange} style={CharacterInputsLifeButton}>
        MP
      </ButtonLarge>
    </div>
  );
};

CharacterInputs.propTypes = {
  status: PropTypes.string.isRequired,
  damageTaken: PropTypes.number.isRequired,
  gold: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onChangeTab: PropTypes.func.isRequired,
  onLifeChange: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onGoldChange: PropTypes.func.isRequired,
};

export default CharacterInputs;
