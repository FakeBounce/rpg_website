import React, { Component } from "react";
import PropTypes from "prop-types";
import { cursorPointer } from "../Utils/StyleConstants";
import { connect } from "react-redux";
import { GET_CURRENT_POSITION } from "../../redux/actionsTypes/actionsTypesMapInfos";
import { setCurrentX, setCurrentY } from "../../redux/actions/actionsMapInfos";

const styledMapArrows = {
  position: "absolute",
  width: 160,
  height: 30,
  top: 25,
  right: 0,
  zIndex: 5,
  cursor: cursorPointer,
};
const styledMapCenter = {
  width: 30,
  height: 30,
  backgroundColor: "grey",
  borderRadius: 30,
};

class MapArrows extends Component {
  render() {
    const {
      dispatchSetCurrentX,
      dispatchSetCurrentY,
      dispatchGetCurrentPosition,
      currentX,
      currentY,
    } = this.props;

    return (
      <div style={styledMapArrows}>
        <div
          className="map-move map-move-center"
          onClick={dispatchGetCurrentPosition}
        >
          <div style={styledMapCenter} />
        </div>
        <div
          className="map-move map-move-left"
          onClick={() => {
            dispatchSetCurrentX(currentX - 3);
          }}
        >
          <img
            src={"./map/arrow-left.png"}
            className="map-arrow"
            alt="arrow-left"
          />
        </div>
        <div
          className="map-move map-move-right"
          onClick={() => {
            dispatchSetCurrentX(currentX + 3);
          }}
        >
          <img
            src={"./map/arrow-right.png"}
            className="map-arrow"
            alt="arrow-right"
          />
        </div>
        <div
          className="map-move map-move-up"
          onClick={() => {
            dispatchSetCurrentY(currentY - 3);
          }}
        >
          <img
            src={"./map/arrow-up.png"}
            className="map-arrow"
            alt="arrow-up"
          />
        </div>
        <div
          className="map-move map-move-down"
          onClick={() => {
            dispatchSetCurrentY(currentY + 3);
          }}
        >
          <img
            src={"./map/arrow-down.png"}
            className="map-arrow"
            alt="arrow-down"
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchSetCurrentX: payload => {
      dispatch(setCurrentX(payload));
    },
    dispatchSetCurrentY: payload => {
      dispatch(setCurrentY(payload));
    },
    dispatchGetCurrentPosition: () => {
      dispatch({ type: GET_CURRENT_POSITION });
    },
  };
};

const mapStateToProps = store => ({
  currentX: store.mapInfos.currentX,
  currentY: store.mapInfos.currentY,
});

MapArrows.propTypes = {
  dispatchSetCurrentX: PropTypes.func.isRequired,
  dispatchSetCurrentY: PropTypes.func.isRequired,
  dispatchGetCurrentPosition: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MapArrows);
