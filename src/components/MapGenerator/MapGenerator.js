import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import firebase from "firebase";
import { DraggableCore } from "react-draggable";
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
import { CALL_PRINT_ERROR } from "../../redux/actionsTypes/actionsTypesAppState";

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
      dispatchCallPrintError,
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
        dispatchCallPrintError(error);
      });
  };

  eventLogger = (e, data) => {
    console.log("Event: ", e);
    console.log("Data: ", data);
  };

  render() {
    return (
      <div className="map" style={styledMap}>
        <MapZoom />
        <MapArrows />
        <DraggableCore
          onDrag={e => {
            console.log("e", e);
          }}
          onStop={e => {
            console.log("e2", e);
          }}
          className="map-mover"
          style={{
            width: totalRows * gridDimension,
            height: totalColumn * gridDimension,
            left: 0,
            top: 0,
          }}
        >
          <MapGrid setTexture={this.setTexture} />
        </DraggableCore>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchCallPrintError: payload => {
      dispatch({ type: CALL_PRINT_ERROR, payload });
    },
  };
};

const mapStateToProps = store => ({
  currentStory: store.appState.currentStory,
  stories: store.appState.stories,
  currentScale: store.mapInfos.currentScale,
  textureToApply: store.mapInfos.textureToApply,
});

MapGenerator.propTypes = {
  dispatchCallPrintError: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MapGenerator);
