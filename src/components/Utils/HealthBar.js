import React, { Component } from "react";
import PropTypes from "prop-types";
import { widthRightPanelLeft } from "./StyleConstants";
import { colors } from "./Constants";

const styles = {
  healthBar: {
    boxSizing: "border-box",
    width: `${widthRightPanelLeft}px`,
    height: 20,
    padding: 5,
    background: colors.backgroundHealthbar,
    borderRadius: 5,
    position: "relative",
    float: "left",
    display: "inline-block",
    marginBottom: 5,
  },
  bar: {
    background: colors.backgroundBar,
    position: "relative",
    height: 10,
    transition: "width .5s linear",
  },
  hit: {
    background: colors.backgroundHit,
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    transition: "width .5s linear",
  },
  text: {
    width: "100%",
    position: "absolute",
    textAlign: "center",
    fontSize: 12,
    marginTop: -12,
    color: colors.healthBarText,
  },
};

class HealthBar extends Component {
  render() {
    const { width, maxWidth, isGM, health, maxHealth } = this.props;

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
            background: isGM ? colors.purple400 : colors.backgroundBar,
          }}
        />

        {health > -1 && maxHealth > -1 && (
          <div style={styles.text}>
            {health} / {maxHealth}
          </div>
        )}
      </div>
    );
  }
}

HealthBar.defaultProps = {
  maxWidth: "100%",
  isGM: false,
  health: -1,
  maxHealth: -1,
};

HealthBar.propTypes = {
  width: PropTypes.string.isRequired,
  maxWidth: PropTypes.string,
  isGM: PropTypes.bool,
  health: PropTypes.number,
  maxHealth: PropTypes.number,
};

export default HealthBar;
