import React, { Component } from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import "./Grid.css";

import {
  gridDimension,
  gridLength,
  mapWidth,
  totalRows,
  totalColumn,
} from "../Utils/StyleConstants";
import MapZoom from "./MapZoom";
import MapArrows from "./MapArrows";
import Tile from "./Tile";
import TileGM from "./TileGM";

const styledMap = {
  width: `${mapWidth}px`,
  height: `${gridDimension * gridLength}px`,
};

class MapGenerator extends Component {
  generateTable = mapToRender => {
    const { currentZoom } = this.props;
    const table = [];
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
      textureToApply,
      tilesTypes,
      currentZoom,
      doSetState,
      towns,
    } = this.props;
    const table = [];
    rowToRender.map((row, index) => {
      table.push(
        isGameMaster && !isOnPlayerView ? (
          <TileGM
            key={`row-${index}`}
            currentZoom={currentZoom}
            doSetState={doSetState}
            positionX={positionX}
            row={row}
            setTexture={this.setTexture}
            showInfos={this.showInfos}
            textureToApply={textureToApply}
            tilesTypes={tilesTypes}
            towns={towns}
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
            towns={towns}
          />
        ),
      );
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

  setTexture = (x, y) => {
    const {
      stories,
      currentStory,
      textureToApply,
      triggerError,
      currentScale,
    } = this.props;

    let updates = {};
    let path = "";
    Object.keys(textureToApply).map(key => {
      path = key;
      return null;
    });
    updates["/" + parseInt(x, 10) + "/" + parseInt(y, 10) + "/" + path] =
      textureToApply[path];
    for (let i = 0; i <= currentScale - 1; i++) {
      if (i === 0) {
        for (let j = 0; j <= currentScale - 1; j++) {
          if (y - j >= 0) {
            updates["/" + x + "/" + parseInt(y - j, 10) + "/" + path] =
              textureToApply[path];
          }
          if (y + j <= 39) {
            updates["/" + x + "/" + parseInt(y + j, 10) + "/" + path] =
              textureToApply[path];
          }
        }
      } else {
        for (let j = 0; j <= currentScale - 1; j++) {
          if (x - i >= 0 && y - j >= 0) {
            updates[
              "/" + parseInt(x - i, 10) + "/" + parseInt(y - j, 10) + "/" + path
            ] = textureToApply[path];
          }
          if (x - i >= 0 && y + j <= 39) {
            updates[
              "/" + parseInt(x - i, 10) + "/" + parseInt(y + j, 10) + "/" + path
            ] = textureToApply[path];
          }
        }
        for (let j = 0; j <= currentScale - 1; j++) {
          if (x + i <= 39 && y - j >= 0) {
            updates[
              "/" + parseInt(x + i, 10) + "/" + parseInt(y - j, 10) + "/" + path
            ] = textureToApply[path];
          }
          if (x + i <= 39 && y + j <= 39) {
            updates[
              "/" + parseInt(x + i, 10) + "/" + parseInt(y + j, 10) + "/" + path
            ] = textureToApply[path];
          }
        }
      }
    }

    firebase
      .database()
      .ref("maps/" + stories[currentStory].map)
      .update(updates)
      .catch(error => {
        // Handle Errors here.
        triggerError(error);
      });
  };

  render() {
    const {
      map,
      towns,
      doSetState,
      currentX,
      currentY,
      currentZoom,
      loadCurrentPosition,
    } = this.props;

    return (
      <div className="map" style={styledMap}>
        <MapZoom doSetState={doSetState} currentZoom={currentZoom} />
        <MapArrows
          doSetState={doSetState}
          currentX={currentX}
          currentY={currentY}
          loadCurrentPosition={loadCurrentPosition}
        />
        <div
          className="map-mover"
          style={{
            width: totalRows * gridDimension,
            height: totalColumn * gridDimension,
            left: (-gridDimension * currentX * currentZoom) / 10,
            top: (-gridDimension * currentY * currentZoom) / 10,
          }}
        >
          {map.length > 0 && towns.length > 0 && this.generateTable(map)}
        </div>
      </div>
    );
  }
}

MapGenerator.defaultProps = {
  textureToApply: null,
};

MapGenerator.propTypes = {
  currentScale: PropTypes.number.isRequired,
  currentStory: PropTypes.number.isRequired,
  currentX: PropTypes.number.isRequired,
  currentY: PropTypes.number.isRequired,
  currentZoom: PropTypes.number.isRequired,
  doSetState: PropTypes.func.isRequired,
  isGameMaster: PropTypes.bool.isRequired,
  isOnPlayerView: PropTypes.bool.isRequired,
  loadCurrentPosition: PropTypes.func.isRequired,
  map: PropTypes.array.isRequired,
  stories: PropTypes.array.isRequired,
  textureToApply: PropTypes.object,
  tilesTypes: PropTypes.object.isRequired,
  towns: PropTypes.array.isRequired,
  triggerError: PropTypes.func.isRequired,
};

export default MapGenerator;
