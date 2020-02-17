import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import "./Grid.css";

import { gridDimension, gridLength, totalRows } from "../Utils/StyleConstants";
import Tile from "./Tile";
import TileGM from "./TileGM";
import { connect } from "react-redux";

class MapGrid extends PureComponent {
  generateTable = mapToRender => {
    const table = [];
    const { currentZoom, currentY } = this.props;
    mapToRender.map((row, index) => {
      if (
        index <= currentY + (gridLength * 10) / currentZoom / 2 &&
        index >= currentY - (gridLength * 10) / currentZoom / 2
      ) {
        table.push(
          <div
            key={`table-row-${index}`}
            className="row"
            style={{
              width: `${(totalRows * gridDimension * currentZoom) / 10 +
                totalRows}px`,
              height: `${(gridDimension * currentZoom) / 10}px`,
            }}
          >
            {this.createGrid(index, row)}
          </div>,
        );
      }
      return null;
    });
    return table;
  };

  createGrid = (positionX, rowToRender) => {
    const {
      currentX,
      isGameMaster,
      isOnPlayerView,
      textureToApply,
      tilesTypes,
      currentZoom,
      doSetState,
      towns,
      setTexture,
    } = this.props;
    const table = [];
    rowToRender.map((row, index) => {
      if (
        index <= currentX + (gridLength * 10) / currentZoom / 2 &&
        index >=
          currentX - (gridLength * 10) / currentZoom / 2 - (12 - currentZoom)
      ) {
        table.push(
          isGameMaster && !isOnPlayerView ? (
            <TileGM
              key={`row-${index}`}
              currentZoom={currentZoom}
              doSetState={doSetState}
              positionX={positionX}
              row={row}
              setTexture={setTexture}
              showInfos={this.showInfos}
              textureToApply={textureToApply}
              tilesTypes={tilesTypes}
              town={row.hasTown > -1 ? towns[row.hasTown] : null}
              index={index}
            />
          ) : (
            <Tile
              key={`row-${index}`}
              cancelTownList={this.cancelTownList}
              currentZoom={currentZoom}
              row={row}
              showTownList={this.showTownList}
              tilesTypes={tilesTypes}
              town={row.hasTown > -1 ? towns[row.hasTown] : null}
            />
          ),
        );
      }
      return null;
    });
    return table;
  };

  showInfos = tileInfo => {
    this.props.doSetState({
      currentTile: tileInfo,
    });
  };

  showTownList = town => {
    this.props.doSetState({
      isTownShowed: true,
      merchantsList: town.merchantsList || [],
      questsList: town.questsList || [],
    });
  };

  cancelTownList = () => {
    this.props.doSetState({
      isTownShowed: false,
      merchantsList: [],
      questsList: [],
    });
  };

  render() {
    const { map, towns } = this.props;
    if (map && map.length > 0) {
      return this.generateTable(map);
    }
    return null;
  }
}

const mapStateToProps = store => ({
  isOnPlayerView: store.appState.isOnPlayerView,
  isGameMaster: store.appState.isGameMaster,
  map: store.mapInfos.map,
  tilesTypes: store.mapInfos.tilesTypes,
});

MapGrid.defaultProps = {
  textureToApply: null,
};

MapGrid.propTypes = {
  currentY: PropTypes.number.isRequired,
  currentX: PropTypes.number.isRequired,
  setTexture: PropTypes.func.isRequired,
  currentZoom: PropTypes.number.isRequired,
  doSetState: PropTypes.func.isRequired,
  textureToApply: PropTypes.object,
  towns: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(MapGrid);
