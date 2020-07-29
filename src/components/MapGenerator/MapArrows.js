import React from 'react';
import { cursorPointer } from '../Utils/StyleConstants';
import { useDispatch, useSelector } from 'react-redux';
import {
  GET_CURRENT_POSITION,
  SET_CURRENT_X,
  SET_CURRENT_Y,
} from '../../redux/actionsTypes/actionsTypesMapInfos';

const styledMapArrows = {
  position: 'absolute',
  width: 160,
  height: 30,
  top: 25,
  right: 0,
  zIndex: 5,
  cursor: cursorPointer,
};
const styledMapCenter = {
  width: 30,
  height: 30,
  backgroundColor: 'grey',
  borderRadius: 30,
};

const MapArrows = () => {
  const dispatch = useDispatch();

  const { currentY, currentX } = useSelector(store => ({
    currentX: store.mapInfos.currentX,
    currentY: store.mapInfos.currentY,
  }));

  const setCurrentX = payload => {
    dispatch({ type: SET_CURRENT_X, payload });
  };

  const setCurrentY = payload => {
    dispatch({ type: SET_CURRENT_Y, payload });
  };

  const getCurrentPosition = () => {
    dispatch({ type: GET_CURRENT_POSITION });
  };

  return (
    <div style={styledMapArrows}>
      <div className='map-move map-move-center' onClick={getCurrentPosition}>
        <div style={styledMapCenter} />
      </div>
      <div
        className='map-move map-move-left'
        onClick={() => {
          setCurrentX(currentX - 3);
        }}
      >
        <img
          src={'./map/arrow-left.png'}
          className='map-arrow'
          alt='arrow-left'
        />
      </div>
      <div
        className='map-move map-move-right'
        onClick={() => {
          setCurrentX(currentX + 3);
        }}
      >
        <img
          src={'./map/arrow-right.png'}
          className='map-arrow'
          alt='arrow-right'
        />
      </div>
      <div
        className='map-move map-move-up'
        onClick={() => {
          setCurrentY(currentY - 3);
        }}
      >
        <img src={'./map/arrow-up.png'} className='map-arrow' alt='arrow-up' />
      </div>
      <div
        className='map-move map-move-down'
        onClick={() => {
          setCurrentY(currentY + 3);
        }}
      >
        <img
          src={'./map/arrow-down.png'}
          className='map-arrow'
          alt='arrow-down'
        />
      </div>
    </div>
  );
};

export default MapArrows;
