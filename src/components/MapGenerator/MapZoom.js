import React, { Component } from "react";
import PropTypes from "prop-types";

class MapZoom extends Component {
  render() {
    const { doSetState, currentZoom } = this.props;

    return (
      <div className="map-zoom">
        <input
          type="range"
          name="currentZoom"
          onChange={e => {
            doSetState({
              currentZoom: parseInt(e.target.value, 10),
            });
          }}
          value={currentZoom}
          min="5"
          max="12"
          step="1"
        />
      </div>
    );
  }
}

MapZoom.defaultProps = {
  textureToApply: null,
};

MapZoom.propTypes = {
  doSetState: PropTypes.func.isRequired,
  currentZoom: PropTypes.number.isRequired,
};

export default MapZoom;
