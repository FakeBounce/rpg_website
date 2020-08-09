export const widthRightPanel = 400;
export const heightHeader = 150;
export const heightCameras = 0;
export const imageSize = 100;
export const widthRightPanelLeft = widthRightPanel - imageSize;
export const widthListPanelBestiary = 250;
export const widthLeftBestiary = window.innerWidth - widthListPanelBestiary;
export const widthImageBestiary = 200;
export const widthTextBestiary = widthLeftBestiary - widthImageBestiary;
export const widthExchangeBox = 300;
export const heightExchangeBox = 300;

// export const gridHeight = 20;
// export const gridWidth = 20;
export const gridLength = 10;
export const gridDimension = Math.floor(
  (window.innerHeight - (heightHeader + heightCameras)) / (gridLength * 2),
);
export const maxGridWidth = (window.innerWidth / 100) * 35;
export const totalRows = 40;
export const totalColumn = 40;
// export const gridDimension = 30;
export const gridTotal = gridDimension * gridLength;
export const mapWidth = (window.innerWidth - widthRightPanel) / 3;
export const widthLeft = window.innerWidth - mapWidth - widthRightPanel;
export const heightLeft = window.innerHeight - heightHeader;

export const cursorPointer = `url('/common/cursor_pointer.png'), pointer`;

export const styledCadre = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: `${widthLeft / 2}px`,
  height: `${heightLeft / 2}px`,
};

export const questsPosition = [
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

export const questsRandom = [
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
