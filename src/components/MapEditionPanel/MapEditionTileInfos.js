import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { towns } from '../Utils/Constants';
import ButtonLarge from '../Utils/ButtonLarge';
import { useSelector } from 'react-redux';

const styledBoxHeader = {
  width: '100%',
  height: '20px',
  marginBottom: '5px',
  textAlign: 'left',
  float: 'left',
  display: 'inline-block',
  position: 'relative',
};

const styledObjectiveBox = {
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
};

const styledObjectiveInputBox = {
  display: 'flex',
  flex: 1,
  maxHeight: 20,
};

const styledObjectiveButtonsBox = {
  display: 'flex',
  flex: 1,
};

const MapEditionTileInfos = ({
  toggleIsCurrent,
  toggleHasTown,
  updateTileObjective,
  removeObjective,
}) => {
  const [townToAssign, setTownToAssign] = useState(-1);
  const [objectiveName, setObjectiveName] = useState('');
  const { currentTile } = useSelector(store => ({
    currentTile: store.mapInfos.currentTile,
  }));

  return (
    <div>
      <div style={styledBoxHeader}>Modifier la case :</div>
      {Object.keys(currentTile).length > 0 && (
        <div>
          environment : {currentTile.environment}
          <br />
          hasFog : {currentTile.hasFog ? 'True' : 'False'}
          <br />
          hasTown : {currentTile.hasTown ? currentTile.hasTown : 'False'}
          <input
            type='number'
            name='townToAssign'
            defaultValue={townToAssign}
            onChange={e => {
              setTownToAssign(parseInt(e.target.value, 10));
            }}
          />
          {currentTile.hasTown > -1 && (
            <div>
              Town name : {towns[currentTile.hasTown].name}
              <br />
            </div>
          )}
          <button
            onClick={() => {
              toggleHasTown(townToAssign);
            }}
          >
            Validate
          </button>
          <br />
          isCurrent : {currentTile.isCurrent}
          <button onClick={toggleIsCurrent}>Toggle current</button>
          <br />x :{currentTile.x}
          <br />y : {currentTile.y}
          <br />
          <div style={styledObjectiveBox}>
            <div style={styledObjectiveInputBox}>
              hasObjective :{' '}
              {currentTile.hasObjective ? currentTile.objectiveName : 'False'}
              <input
                type='text'
                name='objectiveName'
                defaultValue={
                  currentTile.hasObjective
                    ? currentTile.objectiveName
                    : objectiveName
                }
                onChange={e => {
                  setObjectiveName(e.target.value);
                }}
              />
            </div>
            <div style={styledObjectiveButtonsBox}>
              <ButtonLarge
                onClick={() => {
                  setObjectiveName('');
                  updateTileObjective(objectiveName);
                }}
              >
                Validate obj
              </ButtonLarge>
              <ButtonLarge
                onClick={() => {
                  removeObjective();
                }}
              >
                Remove obj
              </ButtonLarge>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

MapEditionTileInfos.propTypes = {
  toggleIsCurrent: PropTypes.func.isRequired,
  toggleHasTown: PropTypes.func.isRequired,
  townToAssign: PropTypes.number.isRequired,
  setTownToAssign: PropTypes.func.isRequired,
};

export default MapEditionTileInfos;
