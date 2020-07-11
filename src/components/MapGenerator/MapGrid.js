import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Grid.css";

import { gridDimension, totalRows } from "../Utils/StyleConstants";
import Tile from "./Tile";
import TileGM from "./TileGM";
import { connect } from "react-redux";
import {
  setCurrentTile,
  setTownInfos,
} from "../../redux/actions/actionsMapInfos";

class MapGrid extends Component {
  generateTable = mapToRender => {
    const table = [];
    const { currentZoom } = this.props;
    mapToRender.map((row, index) => {
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
      return null;
    });
    return table;
  };

  createGrid = (positionX, rowToRender) => {
    const {
      isGameMaster,
      isOnPlayerView,
      towns,
      setTexture,
    } = this.props;
    const table = [];
    rowToRender.map((row, index) => {
      table.push(
        isGameMaster && !isOnPlayerView ? (
          <TileGM
            key={`row-${index}`}
            positionX={positionX}
            row={row}
            setTexture={setTexture}
            showInfos={this.showInfos}
            town={row.hasTown > -1 ? towns[row.hasTown] : null}
            index={index}
          />
        ) : (
          <Tile
            key={`row-${index}`}
            cancelTownList={this.cancelTownList}
            row={row}
            showTownList={this.showTownList}
            town={row.hasTown > -1 ? towns[row.hasTown] : null}
          />
        ),
      );

      return null;
    });
    return table;
  };

  showInfos = tileInfo => {
    const { dispatchSetCurrentTile } = this.props;
    dispatchSetCurrentTile(tileInfo);
  };

  showTownList = town => {
    const { dispatchSetTownInfos } = this.props;
    dispatchSetTownInfos({
      isTownShowed: true,
      merchantsList: town.merchantsList || [],
      questsList: town.questsList || [],
    });
  };

  cancelTownList = () => {
    const { dispatchSetTownInfos } = this.props;
    dispatchSetTownInfos({
      isTownShowed: false,
      merchantsList: [],
      questsList: [],
    });
  };

  render() {
    const { map } = this.props;
    if (map && map.length > 0) {
      return <div>{this.generateTable(map)}</div>;
    }
    return null;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchSetCurrentTile: payload => {
      dispatch(setCurrentTile(payload));
    },
    dispatchSetTownInfos: payload => {
      dispatch(setTownInfos(payload));
    },
  };
};

const mapStateToProps = store => ({
  isOnPlayerView: store.appState.isOnPlayerView,
  isGameMaster: store.appState.isGameMaster,
  map: store.mapInfos.map,
  currentX: store.mapInfos.currentX,
  currentY: store.mapInfos.currentY,
  currentZoom: store.mapInfos.currentZoom,
  towns: store.mapInfos.towns,
});

MapGrid.propTypes = {
  setTexture: PropTypes.func.isRequired,
  dispatchSetCurrentTile: PropTypes.func.isRequired,
  dispatchSetTownInfos: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MapGrid);
