import React from 'react';
import PropTypes from 'prop-types';
import './Grid.css';
import Town from './Town';
import { useSelector, useDispatch } from 'react-redux';

import { gridDimension } from '../Utils/StyleConstants';
import { SET_CURRENT_TOWN } from '../../redux/actionsTypes/actionsTypesMapInfos';

const TileGM = ({ row, index, positionX, setTexture, showInfos, town }) => {
  const dispatch = useDispatch();

  const { currentZoom, tilesTypes, textureToApply } = useSelector(store => ({
    currentZoom: store.mapInfos.currentZoom,
    tilesTypes: store.mapInfos.tilesTypes,
    textureToApply: store.mapInfos.textureToApply,
  }));

  const setCurrentTown = payload => {
    dispatch({ type: SET_CURRENT_TOWN, payload });
  };

  return (
    <div
      className={`grid ${row.isCurrent && 'is-current'}`}
      style={{
        backgroundColor: tilesTypes[row.environment].backgroundColor,
        width: `${(gridDimension * currentZoom) / 10 -
          (row.isCurrent ? 4 : 0)}px`,
        height: `${(gridDimension * currentZoom) / 10 -
          (row.isCurrent ? 4 : 0)}px`,
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
  setTexture: PropTypes.func.isRequired,
  showInfos: PropTypes.func.isRequired,
  town: PropTypes.object,
  index: PropTypes.number.isRequired,
};

export default TileGM;
