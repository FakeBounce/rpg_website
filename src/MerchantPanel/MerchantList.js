import React, { Component } from "react";
import Merchant from "../MerchantPanel/Merchant";
import PropTypes from "prop-types";
import { heightLeft, widthLeft } from "../Utils/StyleConstants";

const styledItemContainer = {
  display: "inline-block",
  float: "left",
  position: "absolute",
  top: 30,
  left : 26,
  overflowY: "auto",
  height: `${heightLeft / 2 - 60}px`,
  width: `${widthLeft / 2 - 46}px`,
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
