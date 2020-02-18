import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setCurrentZoom } from "../../redux/actions/actionsMapInfos";

class MapZoom extends Component {
  render() {
    const { dispatchSetCurrentZoom, currentZoom } = this.props;

    return (
      <div className="map-zoom">
        <input
          type="range"
          name="currentZoom"
          onChange={e => {
            dispatchSetCurrentZoom(parseInt(e.target.value, 10));
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

const mapDispatchToProps = dispatch => {
  return {
    dispatchSetCurrentZoom: payload => {
      dispatch(setCurrentZoom(payload));
    },
  };
};

const mapStateToProps = store => ({
  currentZoom: store.mapInfos.currentZoom,
});

MapZoom.propTypes = {
  dispatchSetCurrentZoom: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MapZoom);
