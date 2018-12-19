import React, { Component } from 'react';

import PropTypes from 'prop-types';
import firebase from 'firebase';
import MapEditionTileInfos from './MapEditionTileInfos';
import MapEditionTilesList from './MapEditionTilesList';
import MapEditionScale from './MapEditionScale';
import {
  gridLength,
  heightHeader,
  heightLeft,
  widthLeft,
} from '../Utils/StyleConstants';

class MapEditionPanel extends Component {
  state = {
    townToAssign: -1,
  };

  toggleIsCurrent = () => {
    const { stories, currentStory, currentTile, doSetState } = this.props;
    const newTile = { ...currentTile };
    newTile.isCurrent = !newTile.isCurrent;
    firebase
      .database()
      .ref(
        'maps/' +
          stories[currentStory].map +
          '/' +
          currentTile.y +
          '/' +
          currentTile.x
      )
      .set(newTile)
      .then(() => {
        doSetState({
          currentTile: { ...newTile },
        });
        if (newTile.isCurrent) {
          firebase
            .database()
            .ref('stories/' + currentStory + '/currentX')
            .set(parseInt(newTile.x, 10) - gridLength / 2)
            .catch(error => {
              // Handle Errors here.
              this.props.triggerError(error);
            });
          firebase
            .database()
            .ref('stories/' + currentStory + '/currentY')
            .set(parseInt(newTile.y, 10) - gridLength / 2)
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
  };

  toggleHasTown = () => {
    const { stories, currentStory, currentTile, doSetState } = this.props;
    const { townToAssign } = this.state;
    const newTile = { ...currentTile };
    newTile.hasTown = townToAssign;
    firebase
      .database()
      .ref(
        'maps/' +
          stories[currentStory].map +
          '/' +
          currentTile.y +
          '/' +
          currentTile.x
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
          position: 'absolute',
          height: heightLeft / 2,
          top: heightLeft / 2,
          left: -widthLeft/2,
          textAlign:'left',
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

MapEditionPanel.defaultProps = {
  textureToApply: null,
};

MapEditionPanel.propTypes = {
  stories: PropTypes.array.isRequired,
  currentStory: PropTypes.number.isRequired,
  textureToApply: PropTypes.object,
  changeCurrentScale: PropTypes.func.isRequired,
  currentScale: PropTypes.number.isRequired,
  currentTile: PropTypes.object.isRequired,
  doSetState: PropTypes.func.isRequired,
  tilesTypes: PropTypes.object.isRequired,
};

export default MapEditionPanel;
