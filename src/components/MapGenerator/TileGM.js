import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Grid.css';
import Town from './Town';

import { gridDimension } from '../Utils/StyleConstants';

class TileGM extends PureComponent {
  render() {
    const {
      row,
      index,
      currentZoom,
      doSetState,
      positionX,
      setTexture,
      showInfos,
      textureToApply,
      tilesTypes,
      town,
    } = this.props;

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
              doSetState({
                currentTown: row.hasTown,
              });
              showInfos(row);
            }}
            isCurrent={true}
          />
        )}
        {row.hasFog && (
          <div
            className="fog-gm"
            style={{
              width: `${(gridDimension * currentZoom) / 10}px`,
              height: `${(gridDimension * currentZoom) / 10}px`,
            }}
          />
        )}
      </div>
    );
  }
}

TileGM.defaultProps = {
  town: null,
  textureToApply: null,
};

TileGM.propTypes = {
  currentZoom: PropTypes.number.isRequired,
  doSetState: PropTypes.func.isRequired,
  positionX: PropTypes.number.isRequired,
  row: PropTypes.object.isRequired,
  setTexture: PropTypes.func.isRequired,
  showInfos: PropTypes.func.isRequired,
  textureToApply: PropTypes.object,
  tilesTypes: PropTypes.object.isRequired,
  town: PropTypes.object,
  index: PropTypes.number.isRequired,
};

export default TileGM;
