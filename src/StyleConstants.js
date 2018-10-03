
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
    gridLength * 2 -
    widthRightPanel;
export const heightLeft = gridLength * gridDimension;

export const priceRanges = {
    "1": {
        minValue: 30,
        maxValue: 80,
    },
    "2": {
        minValue: 60,
        maxValue: 150,
    },
    "3": {
        minValue: 100,
        maxValue: 300,
    },
    "4": {
        minValue: 150,
        maxValue: 400,
    },
    "5": {
        minValue: 225,
        maxValue: 550,
    },
    "6": {
        minValue: 325,
        maxValue: 775,
    },
    "7": {
        minValue: 500,
        maxValue: 1250,
    },
    "8": {
        minValue: 750,
        maxValue: 1800,
    },
    "9": {
        minValue: 1000,
        maxValue: 3000,
    },
    "10": {
        minValue: 1500,
        maxValue: 5000,
    },
};

export const itemQuantities = {
    consumables: 3,
    weapons: 3,
    artefacts: 1,
    runes: 0,
    enhancements: 2,
    stones: 2,
    spells: 4,
};