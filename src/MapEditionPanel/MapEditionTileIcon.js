import React, { Component } from "react";
import { gridDimension, widthLeft } from "../Utils/StyleConstants";

import PropTypes from "prop-types";

const styledGrid = {
  border: "1px solid pink",
  width: `${(widthLeft / 2 - 3) / 8}px`,
  height: `${gridDimension}px`,
  display: "inline-block",
  float: "left",
  position: "relative",
};

class MapEditionTileIcon extends Component {
  render() {
    const { icon } = this.props;
    return (
      <div
        style={{
          ...styledGrid,
          backgroundImage: `url(${icon})`,
          backgroundSize: "cover",
        }}
      />
    );
  }
}

MapEditionTileIcon.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default MapEditionTileIcon;
