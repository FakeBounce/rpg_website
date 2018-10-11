export const widthRightPanel = 350;
export const heightHeader = 100;
export const heightCameras = 0;
export const imageSize = 100;
export const widthRightPanelLeft = widthRightPanel - imageSize;

// export const gridHeight = 20;
// export const gridWidth = 20;
export const gridLength = 20;
export const gridDimension = Math.floor(
    (window.innerHeight - (heightHeader + heightCameras)) / gridLength,
);
export const totalRows = 40;
export const totalColumn = 40;
// export const gridDimension = 30;
export const widthLeft =
    window.innerWidth - gridLength * gridDimension - widthRightPanel;
export const heightLeft = gridLength * gridDimension;
