import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_CURRENT_SCALE } from '../../redux/actionsTypes/actionsTypesMapInfos';

const styledMapEditionScaleBox = {
  display: 'flex',
  flex: 1,
  maxHeight: 20,
};

const MapEditionScale = () => {
  const dispatch = useDispatch();

  const { currentScale } = useSelector(store => ({
    currentScale: store.mapInfos.currentScale,
  }));

  const setCurrentScale = payload => {
    dispatch({ type: SET_CURRENT_SCALE, payload });
  };

  return (
    <div style={styledMapEditionScaleBox}>
      <span style={{ marginRight: 10 }}>Taille du pinceau :</span>
      <input
        type='number'
        onChange={e => {
          setCurrentScale(parseInt(e.target.value, 10));
        }}
        value={currentScale}
        style={{ maxWidth: 30 }}
      />
    </div>
  );
};

export default MapEditionScale;
