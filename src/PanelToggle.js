import React, { Component } from "react";
import PropTypes from "prop-types";

const styledSemiBoxHeader = {
  width: "33%",
  height: "20px",
  marginBottom: "5px",
  textAlign: "center",
  float: "left",
  display: "inline-block",
  position: "relative",
};
class PanelToggle extends Component {
  render() {
    const { toggleIsOnMap, toggleIsOnSpell } = this.props;
    return (
      <div>
        <div
          style={styledSemiBoxHeader}
          onClick={() => {
            toggleIsOnMap(true);
            toggleIsOnSpell(false);
          }}
        >
          Modifier la carte
        </div>
        <div
          style={styledSemiBoxHeader}
          onClick={() => {
            toggleIsOnMap(false);
            toggleIsOnSpell(false);
          }}
        >
          Ajouter un event
        </div>
        <div style={styledSemiBoxHeader} onClick={() => toggleIsOnSpell(true)}>
          Générateur de sorts
        </div>
      </div>
    );
  }
}

PanelToggle.propTypes = {
  toggleIsOnMap: PropTypes.func.isRequired,
  toggleIsOnSpell: PropTypes.func.isRequired,
};

export default PanelToggle;
