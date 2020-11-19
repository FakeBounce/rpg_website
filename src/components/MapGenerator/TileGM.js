import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import './Grid.css';
import Town from './Town';
import ReactTooltip from 'react-tooltip';

import { SET_CURRENT_TOWN } from '../../redux/actionsTypes/actionsTypesMapInfos';

import { gridDimension } from '../Utils/StyleConstants';
import { useTileGMContext } from '../../contexts/TileGMContext';

const TileGM = ({
  row,
  index,
  positionX,
  showInfos,
  town,
  currentZoom,
  tilesTypes,
  textureToApply,
}) => {
  const { setTexture } = useTileGMContext();
  const dispatch = useDispatch();

  const setCurrentTown = payload => {
    dispatch({ type: SET_CURRENT_TOWN, payload });
  };

  const tileClassName = `grid ${
    row.isCurrent ? 'is-current' : row.hasObjective ? 'has-objective' : ''
  }`;

  return (
    <div
      className={tileClassName}
      style={{
        backgroundColor: tilesTypes[row.environment]
          ? tilesTypes[row.environment].backgroundColor
          : 'black',
        width: `${(gridDimension * currentZoom) / 10}px`,
        height: `${(gridDimension * currentZoom) / 10}px`,
      }}
      onClick={() => {
        if (textureToApply) setTexture(positionX, index);
        else showInfos(row);
      }}
      data-tip={row.hasObjective ? row.objectiveName : null}
    >
      {town && (
        <Town
          town={town}
          showTownList={() => {
            setCurrentTown(row.hasTown);
            showInfos(row);
          }}
          showTooltip={!row.hasObjective}
          isCurrent={true}
        />
      )}
      {row.hasFog && (
        <div
          className='fog-gm'
          style={{
            width: `${(gridDimension * currentZoom) / 10}px`,
            height: `${(gridDimension * currentZoom) / 10}px`,
          }}
        />
      )}
      {row.hasObjective && <ReactTooltip />}
    </div>
  );
};
TileGM.defaultProps = {
  town: null,
};

TileGM.propTypes = {
  positionX: PropTypes.number.isRequired,
  row: PropTypes.object.isRequired,
  showInfos: PropTypes.func.isRequired,
  town: PropTypes.object,
  index: PropTypes.number.isRequired,
};

export default memo(TileGM);
