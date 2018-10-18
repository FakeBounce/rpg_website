export const widthRightPanel = 350;
export const heightHeader = 100;
export const heightCameras = 0;
export const imageSize = 100;
export const widthRightPanelLeft = widthRightPanel - imageSize;

// export const gridHeight = 20;
// export const gridWidth = 20;
export const gridLength = 15;
export const gridDimension = Math.floor(
  (window.innerHeight - (heightHeader + heightCameras)) / gridLength,
);
export const maxGridWidth = (window.innerWidth / 100) * 35;
export const totalRows = 40;
export const totalColumn = 40;
// export const gridDimension = 30;
export const gridTotal = gridDimension * gridLength;
export const mapWidth = maxGridWidth > gridTotal ? gridTotal : maxGridWidth;
export const widthLeft = window.innerWidth - mapWidth - widthRightPanel;
export const heightLeft = gridLength * gridDimension;

export const questsPosition = [
  {
    left: "5%",
    top: "10%",
  },
  {
    left: "25%",
    top: "10%",
  },
  {
    left: "45%",
    top: "10%",
  },
  {
    left: "65%",
    top: "10%",
  },
  {
    left: "5%",
    top: "55%",
  },
  {
    left: "25%",
    top: "55%",
  },
  {
    left: "45%",
    top: "55%",
  },
  {
    left: "65%",
    top: "55%",
  },
];

export const questsRandom = [
  "rotate(5deg)",
  "rotate(-5deg)",
  "rotate(10deg)",
  "rotate(-10deg)",
  "translate(0px,-20px)",
  "translate(0px,20px)",
  "translate(0px,20px)",
  "translate(10px,0px)",
  "translate(-10px,0px)",
  "translate(10px,20px)",
  "translate(-10px,20px)",
  "translate(-10px,-20px)",
  "translate(-10px,-20px)",
];
