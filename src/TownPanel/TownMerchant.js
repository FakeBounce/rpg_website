import React, { Component } from "react";

import PropTypes from "prop-types";
import { cursorPointer } from "../Utils/StyleConstants";

const styledTownListItem = {
  marginBottom: 5,
  textAlign: "center",
  display: "inline-block",
  position: "relative",
  cursor: cursorPointer,
};

const styledTownListDiscover = {
  textAlign: "center",
  display: "block",
  position: "relative",
  cursor: cursorPointer,
};

class TownMerchant extends Component {
  render() {
    const { m, i, removeMerchantFromTown, toggleMerchantDiscover } = this.props;
    return (
      <div
        style={{
          flex: 1,
          width: "100%",
          minHeight: 20,
          float: "left",
          borderBottom: "1px solid white",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={`./merchants/${m.icon}`}
          style={{ maxWidth: 45, maxHeight: 45, float: "left" }}
          alt={`${m.name}`}
        />
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
          Discover ({m.isDiscovered ? "Y" : "N"})
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
