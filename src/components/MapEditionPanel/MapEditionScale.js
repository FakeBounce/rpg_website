import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setCurrentScale } from "../../redux/actions/actionsMapInfos";

class MapEditionScale extends Component {
  render() {
    const { dispatchSetCurrentScale, currentScale } = this.props;
    return (
      <div>
        <span style={{ marginRight: 10 }}>Taille du pinceau :</span>
        <input
          type="number"
          onChange={e => {
            dispatchSetCurrentScale(parseInt(e.target.value, 10));
          }}
          value={currentScale}
          style={{ maxWidth: 150 }}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchSetCurrentScale: payload => {
      dispatch(setCurrentScale(payload));
    },
  };
};

const mapStateToProps = store => ({
  currentScale: store.mapInfos.currentScale,
});

MapEditionScale.propTypes = {
  dispatchSetCurrentScale: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MapEditionScale);
