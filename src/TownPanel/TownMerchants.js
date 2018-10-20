import React, { Component } from "react";
import { heightLeft } from "../Utils/StyleConstants";

import PropTypes from "prop-types";
import TownMerchant from "./TownMerchant";


const styledBoxHeader = {
  width: "100%",
  height: "20px",
  marginBottom: "5px",
  textAlign: "center",
  float: "left",
  display: "inline-block",
  position: "relative",
};

const styledSemiContainer = {
  width: "100%",
  height: `${heightLeft / 4 - 40}px`,
  display: "inline-block",
  float: "left",
  position: "relative",
  overflowY: "auto",
};

class TownMerchants extends Component {
  render() {
    const {
      currentTown,
      merchants,
      removeMerchantFromTown,
      toggleMerchantDiscover,
      toggleRightPanel,
    } = this.props;
    return (
      <div>
        <div onClick={() => toggleRightPanel(false)} style={styledBoxHeader}>
          Merchants
        </div>
        <div style={styledSemiContainer}>
          {merchants.map((m, i) => {
            if (m.town === currentTown) {
              return (
                <TownMerchant
                  key={`town-${m.name}`}
                  m={m}
                  i={i}
                  removeMerchantFromTown={removeMerchantFromTown}
                  toggleMerchantDiscover={toggleMerchantDiscover}
                />
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  }
}

TownMerchants.propTypes = {
  currentTown: PropTypes.number.isRequired,
  merchants: PropTypes.array.isRequired,
  toggleMerchantDiscover: PropTypes.func.isRequired,
  removeMerchantFromTown: PropTypes.func.isRequired,
  toggleRightPanel: PropTypes.func.isRequired,
};

export default TownMerchants;
