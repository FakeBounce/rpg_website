import React, { Component } from "react";
import PropTypes from "prop-types";

class MapEditionScale extends Component {
  render() {
    const { changeCurrentScale, currentScale } = this.props;
    return (
      <div>
        <span style={{ marginRight: 10 }}>Taille du pinceau :</span>
        <input
          type="number"
          onChange={e => {
            changeCurrentScale(parseInt(e.target.value, 10));
          }}
          value={currentScale}
          style={{ maxWidth: 150 }}
        />
      </div>
    );
  }
}

MapEditionScale.propTypes = {
  changeCurrentScale: PropTypes.func.isRequired,
  currentScale: PropTypes.number.isRequired,
};

export default MapEditionScale;
