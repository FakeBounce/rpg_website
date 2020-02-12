import React, { Component } from "react";

import PropTypes from "prop-types";
import firebase from "firebase";
import MapEditionTileInfos from "./MapEditionTileInfos";
import MapEditionTilesList from "./MapEditionTilesList";
import MapEditionScale from "./MapEditionScale";
import { heightLeft, widthLeft } from "../Utils/StyleConstants";
import { connect } from "react-redux";

class MapEditionPanel extends Component {
  state = {
    townToAssign: -1,
  };

  toggleIsCurrent = () => {
    const {
      stories,
      currentStory,
      currentTile,
      doSetState,
      currentX,
      currentY,
    } = this.props;
    const newTile = { ...currentTile };
    newTile.isCurrent = !newTile.isCurrent;
    firebase
      .database()
      .ref(
        "maps/" +
          stories[currentStory].map +
          "/" +
          currentY +
          "/" +
          currentX +
          "/isCurrent",
      )
      .set(null)
      .then(() => {
        firebase
          .database()
          .ref(
            "maps/" +
              stories[currentStory].map +
              "/" +
              newTile.y +
              "/" +
              newTile.x,
          )
          .set(newTile)
          .then(() => {
            doSetState({
              currentTile: { ...newTile },
              currentY: newTile.y,
              currentX: newTile.x,
            });
            if (newTile.isCurrent) {
              firebase
                .database()
                .ref("stories/" + currentStory + "/currentX")
                .set(parseInt(newTile.x, 10))
                .catch(error => {
                  // Handle Errors here.
                  this.props.triggerError(error);
                });
              firebase
                .database()
                .ref("stories/" + currentStory + "/currentY")
                .set(parseInt(newTile.y, 10))
                .catch(error => {
                  // Handle Errors here.
                  this.props.triggerError(error);
                });
            }
          })
          .catch(error => {
            // Handle Errors here.
            this.props.triggerError(error);
          });
      })
      .catch(error => {
        // Handle Errors here.
        this.props.triggerError(error);
      });
  };

  toggleHasTown = () => {
    const { stories, currentStory, currentTile, doSetState } = this.props;
    const { townToAssign } = this.state;
    const newTile = { ...currentTile };
    newTile.hasTown = townToAssign;
    firebase
      .database()
      .ref(
        "maps/" +
          stories[currentStory].map +
          "/" +
          currentTile.y +
          "/" +
          currentTile.x,
      )
      .set(newTile)
      .then(() => {
        doSetState({
          currentTile: { ...newTile },
        });
      })
      .catch(error => {
        // Handle Errors here.
        this.props.triggerError(error);
      });
  };

  onChange = (name, value) => {
    const obj = {};
    obj[name] = value;
    this.setState(state => ({
      ...state,
      ...obj,
    }));
  };

  render() {
    const {
      textureToApply,
      changeCurrentScale,
      currentScale,
      currentTile,
      doSetState,
      tilesTypes,
    } = this.props;
    const { townToAssign } = this.state;
    return (
      <div
        style={{
          width: widthLeft / 2,
          position: "absolute",
          height: heightLeft / 2,
          top: heightLeft / 2,
          left: -widthLeft / 2,
          textAlign: "left",
        }}
      >
        <MapEditionTilesList
          tilesTypes={tilesTypes}
          doSetState={doSetState}
          textureToApply={textureToApply}
        />
        <MapEditionScale
          changeCurrentScale={changeCurrentScale}
          currentScale={currentScale}
        />
        <MapEditionTileInfos
          currentTile={currentTile}
          onChange={this.onChange}
          toggleIsCurrent={this.toggleIsCurrent}
          toggleHasTown={this.toggleHasTown}
          townToAssign={townToAssign}
        />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  currentStory: store.appState.currentStory,
});

MapEditionPanel.defaultProps = {
  textureToApply: null,
};

MapEditionPanel.propTypes = {
  currentX: PropTypes.number.isRequired,
  currentY: PropTypes.number.isRequired,
  stories: PropTypes.array.isRequired,
  textureToApply: PropTypes.object,
  changeCurrentScale: PropTypes.func.isRequired,
  currentScale: PropTypes.number.isRequired,
  currentTile: PropTypes.object.isRequired,
  doSetState: PropTypes.func.isRequired,
  tilesTypes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(MapEditionPanel);
