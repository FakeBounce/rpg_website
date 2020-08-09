import React, { useContext, useState } from 'react';
import { useWindowContext } from './windowContext';

const StyleContext = React.createContext(undefined);

export const useStyleContext = () => useContext(StyleContext);

function StyleProvider(props) {
  const { windowHeight, windowWidth } = useWindowContext();

  const widthRightPanel = 400;
  const heightHeader = 150;
  const heightCameras = 0;
  const imageSize = 100;
  const widthRightPanelLeft = widthRightPanel - imageSize;
  const widthListPanelBestiary = 250;
  const widthLeftBestiary = windowWidth - widthListPanelBestiary;
  const widthImageBestiary = 200;
  const widthTextBestiary = widthLeftBestiary - widthImageBestiary;
  const widthExchangeBox = 300;
  const heightExchangeBox = 300;

  // const gridHeight = 20;
  // const gridWidth = 20;
  const gridLength = 10;
  const gridDimension = Math.floor(
    (windowHeight - (heightHeader + heightCameras)) / (gridLength * 2),
  );
  const maxGridWidth = (windowWidth / 100) * 35;
  const totalRows = 40;
  const totalColumn = 40;
  // const gridDimension = 30;
  const gridTotal = gridDimension * gridLength;
  const mapWidth = (windowWidth - widthRightPanel) / 3;
  const widthLeft = windowWidth - mapWidth - widthRightPanel;
  const heightLeft = windowHeight - heightHeader;

  const cursorPointer = `url('/common/cursor_pointer.png'), pointer`;

  const styledCadre = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: `${widthLeft / 2}px`,
    height: `${heightLeft / 2}px`,
  };

  const questsPosition = [
    {
      left: '5%',
      top: '5%',
    },
    {
      left: '25%',
      top: '5%',
    },
    {
      left: '45%',
      top: '5%',
    },
    {
      left: '65%',
      top: '5%',
    },
    {
      left: '5%',
      top: '45%',
    },
    {
      left: '25%',
      top: '45%',
    },
    {
      left: '45%',
      top: '45%',
    },
    {
      left: '65%',
      top: '45%',
    },
  ];

  const questsRandom = [
    'rotate(5deg)',
    'rotate(-5deg)',
    'rotate(10deg)',
    'rotate(-10deg)',
    'translate(0px,-20px)',
    'translate(0px,20px)',
    'translate(0px,20px)',
    'translate(10px,0px)',
    'translate(-10px,0px)',
    'translate(10px,20px)',
    'translate(-10px,20px)',
    'translate(-10px,-20px)',
    'translate(-10px,-20px)',
  ];

  return (
    <StyleContext.Provider
      value={{
        widthRightPanel,
        heightHeader,
        heightCameras,
        imageSize,
        widthRightPanelLeft,
        widthListPanelBestiary,
        widthLeftBestiary,
        widthImageBestiary,
        widthTextBestiary,
        widthExchangeBox,
        heightExchangeBox,
        gridLength,
        gridDimension,
        maxGridWidth,
        totalRows,
        totalColumn,
        gridTotal,
        mapWidth,
        widthLeft,
        heightLeft,
        cursorPointer,
        styledCadre,
        questsPosition,
        questsRandom,
      }}
    >
      {props.children}
    </StyleContext.Provider>
  );
}

export { StyleContext, StyleProvider };
