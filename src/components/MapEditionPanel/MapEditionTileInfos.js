import React from 'react';
import PropTypes from 'prop-types';
import { towns } from '../Utils/Constants';
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

const MapEditionTileInfos = ({
  setTownToAssign,
  toggleIsCurrent,
  toggleHasTown,
  townToAssign,
}) => {
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
            value={townToAssign}
            onChange={e => setTownToAssign(parseInt(e.target.value, 10))}
          />
          {currentTile.hasTown > -1 && (
            <div>
              Town name : {towns[currentTile.hasTown].name}
              <br />
            </div>
          )}
          <button onClick={() => toggleHasTown}>Validate</button>
          <br />
          isCurrent : {currentTile.isCurrent}
          <button onClick={toggleIsCurrent}>Toggle current</button>
          <br />x :{currentTile.x}
          <br />y : {currentTile.y}
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
