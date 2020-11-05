import React, { useState, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useApp from '../hooks/useApp';
import { gridDimension } from '../components/Utils/StyleConstants';
import {
  SET_CURRENT_Y,
  SET_CURRENT_X,
} from '../redux/actionsTypes/actionsTypesMapInfos';

const MapGeneratorContext = React.createContext(undefined);

export const useMapGeneratorContext = () => useContext(MapGeneratorContext);

function MapGeneratorProvider(props) {
  const store = props.store.getState();
  const dispatch = useDispatch();

  const [mapX, setMapX] = useState(
    (store.mapInfos.currentX - 5) * -gridDimension,
  );
  const [mapY, setMapY] = useState(
    (store.mapInfos.currentY - 5) * -gridDimension,
  );

  const dispatchSetCurrentY = payload => {
    dispatch({ type: SET_CURRENT_Y, payload });
  };

  const dispatchSetCurrentX = payload => {
    dispatch({ type: SET_CURRENT_X, payload });
  };

  useEffect(() => {
      console.log('store.mapInfos.currentX',store.mapInfos.currentX)
    setMapX((store.mapInfos.currentX - 5) * -gridDimension);
    setMapY((store.mapInfos.currentY - 5) * -gridDimension);
  }, [store]);

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
    <MapGeneratorContext.Provider
      value={{ mapX, mapY, setMapX, setMapY, getCloserValue }}
    >
      {props.children}
    </MapGeneratorContext.Provider>
  );
}

export { MapGeneratorContext, MapGeneratorProvider };
