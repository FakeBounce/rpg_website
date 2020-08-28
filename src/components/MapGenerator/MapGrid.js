import React, { useState, useEffect, memo } from 'react';
import './Grid.css';

import { gridDimension, totalRows } from '../Utils/StyleConstants';
import { useSelector, useDispatch } from 'react-redux';
import Tile from './Tile';
import {
  SET_CURRENT_TILE,
  SET_TOWN_INFOS,
} from '../../redux/actionsTypes/actionsTypesMapInfos';
import TileGMParent from './TileGMParent';

const MapGrid = () => {
  const [tableToDisplay, setTableToDisplay] = useState([]);
  const dispatch = useDispatch();

  const { isOnPlayerView, isGameMaster, map, currentZoom, towns } = useSelector(
    store => ({
      isOnPlayerView: store.appState.isOnPlayerView,
      isGameMaster: store.appState.isGameMaster,
      map: store.mapInfos.map,
      currentZoom: store.mapInfos.currentZoom,
      towns: store.mapInfos.towns,
    }),
  );

  useEffect(() => {
    generateTable(map);
  }, [map, currentZoom, isOnPlayerView]);

  const setCurrentTile = payload => {
    dispatch({ type: SET_CURRENT_TILE, payload });
  };

  const setTownInfos = payload => {
    dispatch({ type: SET_TOWN_INFOS, payload });
  };

  const generateTable = mapToRender => {
    const table = [];
    mapToRender.map((row, index) => {
      table.push(
        <div
          key={`table-row-${index}`}
          className='row'
          style={{
            width: `${(totalRows * gridDimension * currentZoom) / 10 +
              totalRows}px`,
            height: `${(gridDimension * currentZoom) / 10}px`,
          }}
        >
          {createGrid(index, row)}
        </div>,
      );
      return null;
    });
    setTableToDisplay(table);
    return table;
  };

  const createGrid = (positionX, rowToRender) => {
    const table = [];
    rowToRender.map((row, index) => {
      table.push(
        isGameMaster && !isOnPlayerView ? (
          <TileGMParent
            key={`row-${index}`}
            positionX={positionX}
            row={row}
            showInfos={showInfos}
            town={row.hasTown > -1 ? towns[row.hasTown] : null}
            index={index}
          />
        ) : (
          <Tile
            key={`row-${index}`}
            cancelTownList={cancelTownList}
            row={row}
            showTownList={showTownList}
            town={row.hasTown > -1 ? towns[row.hasTown] : null}
          />
        ),
      );
      return null;
    });
    return table;
  };

  const showInfos = tileInfo => {
    setCurrentTile(tileInfo);
  };

  const showTownList = town => {
    setTownInfos({
      isTownShowed: true,
      merchantsList: town.merchantsList || [],
      questsList: town.questsList || [],
    });
  };

  const cancelTownList = () => {
    setTownInfos({
      isTownShowed: false,
      merchantsList: [],
      questsList: [],
    });
  };

  return tableToDisplay;
};

export default MapGrid;
