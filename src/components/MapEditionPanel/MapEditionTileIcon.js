import React from "react";
import { gridDimension, widthLeft } from "../Utils/StyleConstants";

const styledGrid = {
  border: "1px solid pink",
  width: `${(widthLeft / 2 - 3) / 8}px`,
  height: `${gridDimension}px`,
  display: "inline-block",
  float: "left",
  position: "relative",
};

const MapEditionTileIcon = ({ icon }) => {
  return (
    <div
      style={{
        ...styledGrid,
        backgroundImage: `url(${icon})`,
        backgroundSize: "cover",
      }}
    />
  );
};

export default MapEditionTileIcon;
