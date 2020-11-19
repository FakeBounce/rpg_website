import React from 'react';
import PropTypes from 'prop-types';
import './Grid.css';
import Town from './Town';
import ReactTooltip from 'react-tooltip';

import { gridDimension } from '../Utils/StyleConstants';
import { useSelector } from 'react-redux';

const Tile = ({ row, town, showTownList, cancelTownList }) => {
  const { currentZoom, tilesTypes } = useSelector(store => ({
    currentZoom: store.mapInfos.currentZoom,
    tilesTypes: store.mapInfos.tilesTypes,
  }));

  const tileClassName = `grid ${
    row.isCurrent ? 'is-current' : row.hasObjective ? 'has-objective' : ''
  }`;

  return (
    <div
      className={tileClassName}
      style={{
        backgroundColor: tilesTypes[row.environment]
          ? tilesTypes[row.environment].backgroundColor
          : 'white',
        width: `${(gridDimension * currentZoom) / 10}px`,
        height: `${(gridDimension * currentZoom) / 10}px`,
      }}
      data-tip={row.hasObjective ? row.objectiveName : null}
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
          showTooltip={!row.hasObjective}
        />
      )}
      {row.hasObjective && <ReactTooltip />}
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
