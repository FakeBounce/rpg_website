import React from 'react';
import PropTypes from 'prop-types';
import './Grid.css';
import { useSelector, useDispatch } from 'react-redux';

import { SET_CURRENT_TOWN } from '../../redux/actionsTypes/actionsTypesMapInfos';
import TileGM from './TileGM';

const TileGMParent = ({
  row,
  index,
  positionX,
  showInfos,
  town,
}) => {

  const { currentZoom, tilesTypes, textureToApply } = useSelector(store => ({
    currentZoom: store.mapInfos.currentZoom,
    tilesTypes: store.mapInfos.tilesTypes,
    textureToApply: store.mapInfos.textureToApply,
  }));

  return (
    <TileGM
      row={row}
      index={index}
      positionX={positionX}
      showInfos={showInfos}
      town={town}
      currentZoom={currentZoom}
      tilesTypes={tilesTypes}
      textureToApply={textureToApply}
    />
  );
};
TileGMParent.defaultProps = {
  town: null,
};

TileGMParent.propTypes = {
  positionX: PropTypes.number.isRequired,
  row: PropTypes.object.isRequired,
  showInfos: PropTypes.func.isRequired,
  town: PropTypes.object,
  index: PropTypes.number.isRequired,
};

export default TileGMParent;
