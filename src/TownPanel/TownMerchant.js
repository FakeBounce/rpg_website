import React, { Component } from "react";

import PropTypes from "prop-types";
import {cursorPointer} from "../Utils/StyleConstants";

const styledTownListItem = {
  width: "75%",
  height: 20,
  marginBottom: 5,
  textAlign: "center",
  float: "left",
  display: "inline-block",
  position: "relative",
  cursor: cursorPointer,
};

const styledTownListDiscover = {
  width: "25%",
  height: 20,
  textAlign: "center",
  float: "left",
  display: "inline-block",
  position: "relative",
  cursor: cursorPointer,
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
