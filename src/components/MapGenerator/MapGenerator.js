import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import firebase from 'firebase';
import Draggable from 'react-draggable';
import './Grid.css';

import {
  gridDimension,
  gridLength,
  mapWidth,
  totalRows,
  totalColumn,
} from '../Utils/StyleConstants';

import MapZoom from './MapZoom';
import MapArrows from './MapArrows';
import MapGrid from './MapGrid';
import useApp from '../../hooks/useApp';
import {
  SET_CURRENT_Y,
  SET_CURRENT_X,
} from '../../redux/actionsTypes/actionsTypesMapInfos';

const styledMap = {
  width: `${mapWidth}px`,
  height: `${gridDimension * gridLength}px`,
  background: 'black',
};

const MapGenerator = () => {
  const {
    stories,
    currentStory,
    currentX,
    currentScale,
    currentY,
    textureToApply,
  } = useSelector(store => ({
    currentStory: store.appState.currentStory,
    stories: store.appState.stories,
    currentScale: store.mapInfos.currentScale,
    textureToApply: store.mapInfos.textureToApply,
    currentX: store.mapInfos.currentX,
    currentY: store.mapInfos.currentY,
  }));
  const dispatch = useDispatch();

  const [mapX, setMapX] = useState((currentX - 5) * -gridDimension);
  const [mapY, setMapY] = useState((currentY - 5) * -gridDimension);
  const { triggerError } = useApp();
  let draggableRef = useRef(null);

  const dispatchSetCurrentY = payload => {
    dispatch({ type: SET_CURRENT_Y, payload });
  };

  const dispatchSetCurrentX = payload => {
    dispatch({ type: SET_CURRENT_X, payload });
  };

  useEffect(() => {
    setMapX((currentX - 5) * -gridDimension);
    setMapY((currentY - 5) * -gridDimension);
  }, [currentY, currentX]);

  const setTexture = (x, y) => {
    let updates = {};
    let path = '';
    Object.keys(textureToApply).map(key => {
      path = key;
      return null;
    });
    updates['/' + parseInt(x, 10) + '/' + parseInt(y, 10) + '/' + path] =
      textureToApply[path];
    for (let i = 0; i <= currentScale - 1; i++) {
      if (i === 0) {
        for (let j = 0; j <= currentScale - 1; j++) {
          if (y - j >= 0) {
            updates['/' + x + '/' + parseInt(y - j, 10) + '/' + path] =
              textureToApply[path];
          }
          if (y + j <= 39) {
            updates['/' + x + '/' + parseInt(y + j, 10) + '/' + path] =
              textureToApply[path];
          }
        }
      } else {
        for (let j = 0; j <= currentScale - 1; j++) {
          if (x - i >= 0 && y - j >= 0) {
            updates[
              '/' + parseInt(x - i, 10) + '/' + parseInt(y - j, 10) + '/' + path
            ] = textureToApply[path];
          }
          if (x - i >= 0 && y + j <= 39) {
            updates[
              '/' + parseInt(x - i, 10) + '/' + parseInt(y + j, 10) + '/' + path
            ] = textureToApply[path];
          }
        }
        for (let j = 0; j <= currentScale - 1; j++) {
          if (x + i <= 39 && y - j >= 0) {
            updates[
              '/' + parseInt(x + i, 10) + '/' + parseInt(y - j, 10) + '/' + path
            ] = textureToApply[path];
          }
          if (x + i <= 39 && y + j <= 39) {
            updates[
              '/' + parseInt(x + i, 10) + '/' + parseInt(y + j, 10) + '/' + path
            ] = textureToApply[path];
          }
        }
      }
    }

    firebase
      .database()
      .ref('maps/' + stories[currentStory].map)
      .update(updates)
      .catch(error => {
        // Handle Errors here.
        triggerError(error);
      });
  };

  const getCloserValue = (value, isY = false) => {
    const rest = value > 0 ? value % gridDimension : -value % gridDimension;
    let tileValue = 0;

    if (value > 0) {
      if (rest < gridDimension / 2) {
        tileValue = (value - rest) / gridDimension;
      } else {
        tileValue = (value + gridDimension - rest) / gridDimension;
      }
    } else {
      if (rest < gridDimension / 2) {
        tileValue = (-value - rest) / gridDimension;
      } else {
        tileValue = (-value - gridDimension + rest) / gridDimension;
      }
    }

    if (isY) {
      dispatchSetCurrentY(tileValue + 5);
    } else {
      dispatchSetCurrentX(tileValue + 5);
    }
    return value + gridDimension - rest;
  };

  return (
    <div className='map' style={styledMap}>
      <MapZoom />
      <MapArrows />
      <div
        className='map-mover'
        style={{
          width: totalRows * gridDimension,
          height: totalColumn * gridDimension,
          left: 0,
          top: 0,
        }}
      >
        <Draggable
          onStart={e => {}}
          ref={draggableRef}
          axis={'both'}
          onDrag={e => {
            setMapX(mapX + e.movementX);
            setMapY(mapY + e.movementY);
          }}
          onStop={e => {
            getCloserValue(mapX);
            getCloserValue(mapY, true);
          }}
          position={{ x: mapX, y: mapY }}
        >
          <div>
            <MapGrid setTexture={setTexture} />
          </div>
        </Draggable>
      </div>
    </div>
  );
};

export default MapGenerator;
