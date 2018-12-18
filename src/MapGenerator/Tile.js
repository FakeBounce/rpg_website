import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import "./Grid.css";
import Town from "./Town";

import { gridDimension } from "../Utils/StyleConstants";

class Tile extends PureComponent {
  render() {
    const {
      row,
      tilesTypes,
      towns,
      currentZoom,
      showTownList,
      cancelTownList,
    } = this.props;

    return (
      <div
        className={`grid ${row.isCurrent && "is-current"}`}
        style={{
          backgroundColor: tilesTypes[row.environment].backgroundColor,
          width: `${(gridDimension * currentZoom) / 10 -
            (row.isCurrent ? 4 : 0)}px`,
          height: `${(gridDimension * currentZoom) / 10 -
            (row.isCurrent ? 4 : 0)}px`,
        }}
      >
        {row.hasFog && (
          <div
            className="fog"
            style={{
              width: `${(gridDimension * currentZoom) / 10}px`,
              height: `${(gridDimension * currentZoom) / 10}px`,
            }}
          />
        )}
        {row.hasTown > -1 && (
          <Town
            town={towns[row.hasTown]}
            showTownList={showTownList}
            cancelTownList={cancelTownList}
            isCurrent={row.isCurrent || false}
          />
        )}
      </div>
    );
  }
}

Tile.propTypes = {
  cancelTownList: PropTypes.func.isRequired,
  currentZoom: PropTypes.number.isRequired,
  row: PropTypes.object.isRequired,
  showTownList: PropTypes.func.isRequired,
  tilesTypes: PropTypes.object.isRequired,
  towns: PropTypes.array.isRequired,
};

export default Tile;
