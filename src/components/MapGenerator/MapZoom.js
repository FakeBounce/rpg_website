import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_CURRENT_ZOOM } from '../../redux/actionsTypes/actionsTypesMapInfos';

const MapZoom = () => {
  const dispatch = useDispatch();

  const { currentZoom } = useSelector(store => ({
    currentZoom: store.mapInfos.currentZoom,
  }));

  const setCurrentZoom = payload => {
    dispatch({ type: SET_CURRENT_ZOOM, payload });
  };

  return (
    <div className='map-zoom'>
      <input
        type='range'
        name='currentZoom'
        onChange={e => {
          setCurrentZoom(parseInt(e.target.value, 10));
        }}
        value={currentZoom}
        min='5'
        max='12'
        step='1'
      />
    </div>
  );
};

export default MapZoom;
