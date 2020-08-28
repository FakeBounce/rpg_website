import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import {
  SET_CURRENT_Y,
  SET_CURRENT_X,
} from '../../redux/actionsTypes/actionsTypesMapInfos';
import { TileGMProvider } from '../../contexts/TileGMContext';

const styledMap = {
  width: `${mapWidth}px`,
  height: `${gridDimension * gridLength}px`,
  background: 'black',
};

const MapGenerator = () => {
  const { currentX, currentY, currentZoom } = useSelector(store => ({
    currentX: store.mapInfos.currentX,
    currentY: store.mapInfos.currentY,
    currentZoom: store.mapInfos.currentZoom,
  }));
  const dispatch = useDispatch();

  const [mapX, setMapX] = useState(
    (-currentX * gridDimension * currentZoom) / 10 + gridDimension * 5,
  );
  const [mapY, setMapY] = useState(
    (-currentY * gridDimension * currentZoom) / 10 + gridDimension * 5,
  );
  let draggableRef = useRef(null);

  const dispatchSetCurrentY = payload => {
    dispatch({ type: SET_CURRENT_Y, payload });
  };

  const dispatchSetCurrentX = payload => {
    dispatch({ type: SET_CURRENT_X, payload });
  };

  useEffect(() => {
    setMapX((-currentX * gridDimension * currentZoom) / 10 + gridDimension * 5);
    setMapY((-currentY * gridDimension * currentZoom) / 10 + gridDimension * 5);
  }, [currentY, currentX, currentZoom]);

  const getCurrentPosition = () => {
    setMapX((-currentX * gridDimension * currentZoom) / 10 + gridDimension * 5);
    setMapY((-currentY * gridDimension * currentZoom) / 10 + gridDimension * 5);
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
      <MapArrows
        moveYUp={() => {
          setMapY(mapY - 3 * -gridDimension);
        }}
        moveYDown={() => {
          setMapY(mapY + 3 * -gridDimension);
        }}
        moveXLeft={() => {
          setMapX(mapX - 3 * -gridDimension);
        }}
        moveXRight={() => {
          setMapX(mapX + 3 * -gridDimension);
        }}
        getCurrentPosition={getCurrentPosition}
      />
      <div
        className='map-mover'
        style={{
          width: totalRows * gridDimension,
          height: totalColumn * gridDimension,
          left: 0,
          top: 0,
          position: 'relative',
        }}
      >
        <TileGMProvider>
          <Draggable
            ref={draggableRef}
            axis={'both'}
            onStop={(e, ui) => {
              setMapX(ui.x);
              setMapY(ui.y);
              // getCloserValue(ui.x);
              // getCloserValue(ui.y, true);
            }}
            position={{ x: mapX, y: mapY }}
          >
            <div>
              <MapGrid />
            </div>
          </Draggable>
        </TileGMProvider>
      </div>
    </div>
  );
};

export default MapGenerator;
