import React, { Component } from "react";
import { gridDimension, widthLeft } from "../Utils/StyleConstants";

import PropTypes from "prop-types";
import MapEditionTileIcon from "./MapEditionTileIcon";

const styledGrid = {
  border: "1px solid pink",
  width: `${(widthLeft / 2 - 3) / 8}px`,
  height: `${gridDimension}px`,
  display: "inline-block",
  float: "left",
  position: "relative",
};

class MapEditionTile extends Component {
  render() {
    const { tile, tileKey, action, isSelected } = this.props;
    return (
      <div
        style={{
          ...styledGrid,
          border: isSelected ? "1px solid red" : "none",
          borderLeft: "1px solid black",
          backgroundColor:
            tileKey === "Fog"
              ? "black"
              : tileKey === "NoFog"
                ? "white"
                : tile.backgroundColor,
        }}
        onClick={() => action()}
      >
        {tile.icon && <MapEditionTileIcon icon={tile.icon} />}
      </div>
    );
  }
}

MapEditionTile.defaultProps = {
  tileKey: "",
  isSelected: false,
};

MapEditionTile.propTypes = {
  action: PropTypes.func.isRequired,
  tile: PropTypes.object.isRequired,
  tileKey: PropTypes.string,
  isSelected: PropTypes.bool,
};

export default MapEditionTile;
