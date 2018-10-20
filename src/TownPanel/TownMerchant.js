import React, { Component } from "react";

import PropTypes from "prop-types";

const styledTownListItem = {
  width: "75%",
  height: "20px",
  marginBottom: "5px",
  textAlign: "center",
  float: "left",
  display: "inline-block",
  position: "relative",
  cursor: "pointer",
};

const styledTownListDiscover = {
  width: "25%",
  height: "20px",
  textAlign: "center",
  float: "left",
  display: "inline-block",
  position: "relative",
  cursor: "pointer",
};

class TownMerchant extends Component {
  render() {
    const { m, i, removeMerchantFromTown, toggleMerchantDiscover } = this.props;
    return (
      <div>
        <div
          onClick={() => removeMerchantFromTown(i)}
          style={styledTownListItem}
        >
          {m.name}({m.job})
        </div>
        <button
          style={styledTownListDiscover}
          onClick={() => toggleMerchantDiscover(i)}
        >
          ToggleDiscover(
          {m.isDiscovered ? "Y" : "N"})
        </button>
      </div>
    );
  }
}

TownMerchant.propTypes = {
  m: PropTypes.object.isRequired,
  i: PropTypes.number.isRequired,
  removeMerchantFromTown: PropTypes.func.isRequired,
  toggleMerchantDiscover: PropTypes.func.isRequired,
};

export default TownMerchant;
