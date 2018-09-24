import React, { Component } from "react";
import PropTypes from "prop-types";
import { widthRightPanelLeft } from "./StyleConstants";

const styles = {
    healthBar: {
        boxSizing: "border-box",
        width: `${widthRightPanelLeft}px`,
        height: 20,
        padding: 5,
        background: "#ddd",
        borderRadius: 5,
        position: "relative",
        float: "left",
        display: "inline-block",
        marginBottom: 5,
    },
    bar: {
        background: "#c54",
        position: "relative",
        height: 10,
        transition: "width .5s linear",
    },
    hit: {
        background: "rgba(255,255,255,0.6)",
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        transition: "width .5s linear",
    },
};

class HealthBar extends Component {
    render() {
        const { width, maxWidth, isGM } = this.props;

        return (
            <div
                style={{
                    ...styles.healthBar,
                    width: maxWidth,
                }}
            >
                <div
                    style={{
                        ...styles.bar,
                        width,
                        background: isGM ? "purple" : "#c54",
                    }}
                />
            </div>
        );
    }
}

HealthBar.defaultProps = {
    maxWidth: "100%",
    isGM: false,
};

HealthBar.propTypes = {
    width: PropTypes.string.isRequired,
    maxWidth: PropTypes.string,
    isGM: PropTypes.bool,
};

export default HealthBar;
