import React from "react";
import { gridDimension, widthLeft } from "../Utils/StyleConstants";

import MapEditionTileIcon from "./MapEditionTileIcon";
import { colors } from "../Utils/Constants";

const styledGrid = {
  border: "1px solid pink",
  width: `${(widthLeft / 2 - 3) / 8}px`,
  height: `${gridDimension}px`,
  display: "inline-block",
  float: "left",
  position: "relative",
};

const MapEditionTile = ({ tile, tileKey = "", action, isSelected = false }) => {
  return (
    <div
      style={{
        ...styledGrid,
        border: isSelected ? "1px solid red" : "none",
        borderColor: colors.red300,
        borderLeft: "1px solid black",
        backgroundColor:
          tileKey === "Fog"
            ? "black"
            : tileKey === "NoFog"
            ? colors.text
            : tile.backgroundColor,
      }}
      onClick={action}
    >
      {tile.icon && <MapEditionTileIcon icon={tile.icon} />}
      <span
        style={{
          position: "absolute",
          height: `${gridDimension - 5}px`,
          width: `${(widthLeft / 2 - 3) / 8 - 5}px`,
        }}
      >
        {tileKey}
      </span>
    </div>
  );
};

export default MapEditionTile;
