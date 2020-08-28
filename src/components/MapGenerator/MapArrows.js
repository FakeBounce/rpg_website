import React from 'react';
import { cursorPointer } from '../Utils/StyleConstants';

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

const MapArrows = ({
  moveYUp,
  moveYDown,
  moveXLeft,
  moveXRight,
  getCurrentPosition,
}) => {
  return (
    <div style={styledMapArrows}>
      <div className='map-move map-move-center' onClick={getCurrentPosition}>
        <div style={styledMapCenter} />
      </div>
      <div
        className='map-move map-move-left'
        onClick={() => {
          moveXLeft();
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
          moveXRight();
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
          // setCurrentY(currentY - 3);
          moveYUp();
        }}
      >
        <img src={'./map/arrow-up.png'} className='map-arrow' alt='arrow-up' />
      </div>
      <div
        className='map-move map-move-down'
        onClick={() => {
          // setCurrentY(currentY + 3);
          moveYDown();
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
