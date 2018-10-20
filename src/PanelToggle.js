import React, { Component } from "react";
import PropTypes from "prop-types";

const styledSemiBoxHeader = {
  width: "50%",
  height: "20px",
  marginBottom: "5px",
  textAlign: "center",
  float: "left",
  display: "inline-block",
  position: "relative",
};
class PanelToggle extends Component {
  render() {
    const { toggleIsOnMap } = this.props;
    return (
      <div>
        <div style={styledSemiBoxHeader} onClick={() => toggleIsOnMap(true)}>
          Modifier la carte
        </div>
        <div style={styledSemiBoxHeader} onClick={() => toggleIsOnMap(false)}>
          Ajouter un event
        </div>
      </div>
    );
  }
}

PanelToggle.propTypes = {
  toggleIsOnMap: PropTypes.func.isRequired,
};

export default PanelToggle;
