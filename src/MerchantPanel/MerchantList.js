import React, { Component } from "react";
import Merchant from "../MerchantPanel/Merchant";
import PropTypes from "prop-types";

const styledItemContainer = {
  display: "inline-block",
  float: "left",
  position: "absolute",
  top: "25px",
  overflowY: "auto",
  height: "90%",
  width: "100%",
};

class MerchantList extends Component {
  render() {
    const { merchantsList, merchants, currentMerchant, showItems } = this.props;

    return (
      <div style={styledItemContainer}>
        {merchantsList.map(index => {
          return (
            <Merchant
              key={`merchant-${merchants[index].name}`}
              {...merchants[index]}
              index={index}
              showItems={showItems}
              currentMerchant={currentMerchant}
            />
          );
        })}
      </div>
    );
  }
}

MerchantList.propTypes = {
  currentMerchant: PropTypes.number.isRequired,
  merchantsList: PropTypes.array.isRequired,
  merchants: PropTypes.array.isRequired,
  showItems: PropTypes.func.isRequired,
};

export default MerchantList;
