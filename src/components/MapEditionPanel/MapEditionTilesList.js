import React, { Component } from "react";
import { gridDimension } from "../Utils/StyleConstants";

import PropTypes from "prop-types";
import MapEditionTile from "./MapEditionTile";
import { connect } from "react-redux";
import { setTextureToApply } from "../../redux/actions/actionsMapInfos";

const styledMapButtons = {
  border: "1px solid blue",
  width: "100%",
  height: `${gridDimension * 2 + 1}px`,
  display: "inline-block",
  float: "left",
  position: "relative",
};

class MapEditionTilesList extends Component {
  loadTexture = gridType => {
    const { dispatchSetTextureToApply } = this.props;
    if (gridType === "Fog") {
      dispatchSetTextureToApply({
        hasFog: true,
      });
    } else if (gridType === "NoFog") {
      dispatchSetTextureToApply({
        hasFog: false,
      });
    } else {
      dispatchSetTextureToApply({
        environment: gridType,
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
    const { dispatchSetTextureToApply } = this.props;
    dispatchSetTextureToApply(null);
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

const mapDispatchToProps = dispatch => {
  return {
    dispatchSetTextureToApply: payload => {
      dispatch(setTextureToApply(payload));
    },
  };
};

const mapStateToProps = store => ({
  tilesTypes: store.mapInfos.tilesTypes,
  textureToApply: store.mapInfos.textureToApply,
});

MapEditionTilesList.propTypes = {
  dispatchSetTextureToApply: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapEditionTilesList);
