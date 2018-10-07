
export const widthRightPanel = 350;
export const heightHeader = 100;
export const imageSize = 100;
export const widthRightPanelLeft = widthRightPanel - imageSize;

// export const gridHeight = 20;
// export const gridWidth = 20;
export const gridLength = 20;
export const gridDimension = Math.floor((window.innerHeight - 250) / gridLength);
// export const gridDimension = 30;
export const widthLeft =
    window.innerWidth -
    gridLength * gridDimension -
    gridLength -
    widthRightPanel;
export const heightLeft = gridLength * gridDimension;