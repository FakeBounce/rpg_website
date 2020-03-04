import React, { Component } from "react";
import { gridDimension, widthLeft } from "../Utils/StyleConstants";

import PropTypes from "prop-types";
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

class MapEditionTile extends Component {
  render() {
    const { tile, tileKey, action, isSelected } = this.props;
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
