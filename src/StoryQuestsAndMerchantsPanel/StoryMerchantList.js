import React, { Component } from "react";
import { heightLeft } from "../Utils/StyleConstants";

import PropTypes from "prop-types";

const styledBoxHeader = {
  width: "100%",
  height: "20px",
  marginBottom: "5px",
  textAlign: "center",
  float: "left",
  display: "inline-block",
  position: "relative",
};

const styledMerchantsContainer = {
  width: "100%",
  height: `${heightLeft / 2 - 20}px`,
  display: "inline-block",
  float: "left",
  position: "absolute",
  top: 20,
  left: 0,
  overflowY: "auto",
};

class StoryMerchantList extends Component {
  render() {
    const { towns, merchants, addMerchantToTown } = this.props;
    return (
      <div style={styledMerchantsContainer}>
        {merchants.map((m, i) => {
          return (
            <div onClick={() => addMerchantToTown(i)} style={styledBoxHeader}>
              {m.name}({m.job})
              {typeof m.town !== "undefined" &&
                m.town > -1 && <span>({towns[m.town].name})</span>}
            </div>
          );
        })}
      </div>
    );
  }
}

StoryMerchantList.propTypes = {
  addMerchantToTown: PropTypes.func.isRequired,
  towns: PropTypes.array.isRequired,
  merchants: PropTypes.array.isRequired,
};

export default StoryMerchantList;
