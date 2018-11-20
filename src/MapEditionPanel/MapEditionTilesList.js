import React, { Component } from "react";
import { gridDimension } from "../Utils/StyleConstants";

import PropTypes from "prop-types";
import MapEditionTile from "./MapEditionTile";

const styledMapButtons = {
  border: "1px solid blue",
  width: "100%",
  height: `${gridDimension * 2 + 1}px`,
  display: "inline-block",
  float: "left",
};

class MapEditionTilesList extends Component {
  loadTexture = gridType => {
    if (gridType === "Fog") {
      this.props.doSetState({
        textureToApply: {
          hasFog: true,
        },
      });
    } else if (gridType === "NoFog") {
      this.props.doSetState({
        textureToApply: {
          hasFog: false,
        },
      });
    } else {
      this.props.doSetState({
        textureToApply: {
          environment: gridType,
        },
      });
    }
  };

  getGridSelected = grid => {
    const { tilesTypes } = this.props;
    let bg = "";

    if (grid.hasFog) {
      bg = tilesTypes["Fog"];
    } else {
      Object.keys(tilesTypes).map(key => {
        if (key === grid.environment) {
          bg = tilesTypes[key];
        }
        return null;
      });
    }
    return <MapEditionTile action={this.unloadTexture} tile={bg} isSelected />;
  };

  unloadTexture = () => {
    this.props.doSetState({
      textureToApply: null,
    });
  };

  render() {
    const { textureToApply, tilesTypes } = this.props;
    return (
      <div style={styledMapButtons}>
        {Object.keys(tilesTypes).map(ttKey => {
          return (
            <MapEditionTile
              key={`gridType-${ttKey}`}
              action={() => this.loadTexture(ttKey)}
              tile={tilesTypes[ttKey]}
              tileKey={ttKey}
            />
          );
        })}
        {textureToApply && this.getGridSelected(textureToApply)}
      </div>
    );
  }
}

MapEditionTilesList.defaultProps = {
  textureToApply: null,
};

MapEditionTilesList.propTypes = {
  textureToApply: PropTypes.object,
  tilesTypes: PropTypes.object.isRequired,
  doSetState: PropTypes.func.isRequired,
};

export default MapEditionTilesList;
