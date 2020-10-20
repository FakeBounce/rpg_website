import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './Grid.css';
import Town from './Town';
import { useDispatch } from 'react-redux';

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

  return (
    <div
      className={`grid ${row.isCurrent && 'is-current'}`}
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
    >
      {town && (
        <Town
          town={town}
          showTownList={() => {
            setCurrentTown(row.hasTown);
            showInfos(row);
          }}
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
