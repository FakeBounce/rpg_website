import React from 'react';
import PropTypes from 'prop-types';
import './Grid.css';
import Town from './Town';

import { gridDimension } from '../Utils/StyleConstants';
import { useSelector } from 'react-redux';

const Tile = ({ row, town, showTownList, cancelTownList }) => {
  const { currentZoom, tilesTypes } = useSelector(store => ({
    currentZoom: store.mapInfos.currentZoom,
    tilesTypes: store.mapInfos.tilesTypes,
  }));

  return (
    <div
      className={`grid ${row.isCurrent && 'is-current'}`}
      style={{
        backgroundColor: tilesTypes[row.environment]
          ? tilesTypes[row.environment].backgroundColor
          : 'white',
        width: `${(gridDimension * currentZoom) / 10 -
          (row.isCurrent ? 4 : 0)}px`,
        height: `${(gridDimension * currentZoom) / 10 -
          (row.isCurrent ? 4 : 0)}px`,
      }}
    >
      {row.hasFog && (
        <div
          className='fog'
          style={{
            width: `${(gridDimension * currentZoom) / 10}px`,
            height: `${(gridDimension * currentZoom) / 10}px`,
          }}
        />
      )}
      {town && (
        <Town
          town={town}
          showTownList={showTownList}
          cancelTownList={cancelTownList}
          isCurrent={row.isCurrent || false}
        />
      )}
    </div>
  );
};

Tile.defaultProps = {
  town: null,
};

Tile.propTypes = {
  cancelTownList: PropTypes.func.isRequired,
  row: PropTypes.object.isRequired,
  showTownList: PropTypes.func.isRequired,
  town: PropTypes.object,
};

export default Tile;
