import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import MapEditionTileInfos from './MapEditionTileInfos';
import MapEditionTilesList from './MapEditionTilesList';
import MapEditionScale from './MapEditionScale';
import { heightLeft, widthLeft } from '../Utils/StyleConstants';
import useApp from '../../hooks/useApp';
import { useSelector, useDispatch } from 'react-redux';
import { SET_CURRENT_TILE } from '../../redux/actionsTypes/actionsTypesMapInfos';

const MapEditionPanel = ({ changeCurrentScale }) => {
  const { triggerError } = useApp();
  const dispatch = useDispatch();

  const {
    currentStory,
    stories,
    currentY,
    currentX,
    currentTile,
  } = useSelector(store => ({
    currentStory: store.appState.currentStory,
    stories: store.appState.stories,
    currentX: store.mapInfos.currentX,
    currentY: store.mapInfos.currentY,
    currentTile: store.mapInfos.currentTile,
  }));

  const setCurrentTile = payload => {
    dispatch({ type: SET_CURRENT_TILE, payload });
  };

  const toggleIsCurrent = () => {
    const newTile = {
      ...currentTile,
      isCurrent: currentTile.isCurrent ? false : true,
    };

    firebase
      .database()
      .ref(
        'maps/' +
          stories[currentStory].map +
          '/' +
          currentY +
          '/' +
          currentX +
          '/isCurrent',
      )
      .set(null)
      .then(() => {
        firebase
          .database()
          .ref(
            'maps/' +
              stories[currentStory].map +
              '/' +
              newTile.y +
              '/' +
              newTile.x,
          )
          .set(newTile)
          .then(() => {
            setCurrentTile(newTile);
            if (newTile.isCurrent) {
              firebase
                .database()
                .ref('stories/' + currentStory + '/currentX')
                .set(parseInt(newTile.x, 10))
                .catch(error => {
                  // Handle Errors here.
                  triggerError(error);
                });
              firebase
                .database()
                .ref('stories/' + currentStory + '/currentY')
                .set(parseInt(newTile.y, 10))
                .catch(error => {
                  // Handle Errors here.
                  triggerError(error);
                });
            }
          })
          .catch(error => {
            // Handle Errors here.
            triggerError(error);
          });
      })
      .catch(error => {
        // Handle Errors here.
        triggerError(error);
      });
  };

  const toggleHasTown = newTown => {
    const newTile = { ...currentTile };
    newTile.hasTown = newTown;
    firebase
      .database()
      .ref(
        'maps/' +
          stories[currentStory].map +
          '/' +
          currentTile.y +
          '/' +
          currentTile.x,
      )
      .set(newTile)
      .then(() => {
        setCurrentTile(newTile);
      })
      .catch(error => {
        // Handle Errors here.
        triggerError(error);
      });
  };

  const updateTileObjective = newObjective => {
    const newTile = { ...currentTile };
    newTile.hasObjective = true;
    newTile.objectiveName = newObjective;
    firebase
      .database()
      .ref(
        'maps/' +
          stories[currentStory].map +
          '/' +
          currentTile.y +
          '/' +
          currentTile.x,
      )
      .set(newTile)
      .then(() => {
        setCurrentTile(newTile);
      })
      .catch(error => {
        // Handle Errors here.
        triggerError(error);
      });
  };

  const removeObjective = () => {
    const newTile = { ...currentTile };
    newTile.hasObjective = false;
    newTile.objectiveName = '';
    firebase
      .database()
      .ref(
        'maps/' +
          stories[currentStory].map +
          '/' +
          currentTile.y +
          '/' +
          currentTile.x,
      )
      .set(newTile)
      .then(() => {
        setCurrentTile(newTile);
      })
      .catch(error => {
        // Handle Errors here.
        triggerError(error);
      });
  };

  return (
    <div
      style={{
        width: widthLeft / 2,
        position: 'absolute',
        height: heightLeft / 2,
        top: heightLeft / 2,
        left: -widthLeft / 2,
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}
    >
      <MapEditionTilesList />
      <MapEditionScale changeCurrentScale={changeCurrentScale} />
      <MapEditionTileInfos
        toggleIsCurrent={toggleIsCurrent}
        toggleHasTown={toggleHasTown}
        updateTileObjective={updateTileObjective}
        removeObjective={removeObjective}
      />
    </div>
  );
};

MapEditionPanel.propTypes = {
  changeCurrentScale: PropTypes.func.isRequired,
  dispatchCallPrintError: PropTypes.func.isRequired,
};

export default MapEditionPanel;
