import React, { PureComponent } from "react";
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
import MapGrid from "./MapGrid";
import { connect } from "react-redux";

const styledMap = {
  width: `${mapWidth}px`,
  height: `${gridDimension * gridLength}px`,
  background: "black",
};

class MapGenerator extends PureComponent {
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
      towns,
      doSetState,
    } = this.props;

    return (
      <div className="map" style={styledMap}>
        <MapZoom />
        <MapArrows />
        <div
          className="map-mover"
          style={{
            width: totalRows * gridDimension,
            height: totalColumn * gridDimension,
            left: 0,
            top: 0,
          }}
        >
          <MapGrid
            doSetState={doSetState}
            setTexture={this.setTexture}
            towns={towns}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  currentStory: store.appState.currentStory,
  stories: store.appState.stories,
  currentScale: store.mapInfos.currentScale,
  textureToApply: store.mapInfos.textureToApply,
});

MapGenerator.propTypes = {
  doSetState: PropTypes.func.isRequired,
  towns: PropTypes.array.isRequired,
  triggerError: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(MapGenerator);
