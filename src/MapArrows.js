import React, { Component } from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import "./Grid.css";
import Town from "./Town";

import { gridDimension, totalRows } from "./StyleConstants";

const styledMapArrows = {
    position: "absolute",
    width: 160,
    height: 30,
    top: 25,
    right: 0,
    zIndex: 5,
    cursor: "pointer",
};

class MapArrows extends Component {
    render() {
        const { doSetState, currentX, currentY, loadCurrentPosition } = this.props;

        return (
            <div style={styledMapArrows}>
                <div className="map-move map-move-center" onClick={loadCurrentPosition}>
                    <div
                        style={{
                            width: 30,
                            height: 30,
                            backgroundColor: "grey",
                            borderRadius: 30,
                        }}
                    />
                </div>
                <div
                    className="map-move map-move-left"
                    onClick={() => {
                        doSetState({ currentX: currentX - 1 });
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
                        doSetState({ currentX: currentX + 1 });
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
                        doSetState({ currentY: currentY - 1 });
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
                        doSetState({ currentY: currentY + 1 });
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

MapArrows.propTypes = {
    doSetState: PropTypes.func.isRequired,
    currentX: PropTypes.number.isRequired,
    currentY: PropTypes.number.isRequired,
    loadCurrentPosition: PropTypes.func.isRequired,
};

export default MapArrows;
