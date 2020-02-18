import React, { Component } from "react";
import PropTypes from "prop-types";

const styledMerchantHeader = {
  width: "100%",
  height: 25,
  borderBottom: "1px solid white",
  position: "relative",
};

class TownsHistoryMerchantHeader extends Component {
  render() {
    const { merchant } = this.props;
    return (
      <div style={styledMerchantHeader}>
        {merchant.name}, {merchant.job}
      </div>
    );
  }
}

TownsHistoryMerchantHeader.propTypes = {
  merchant: PropTypes.object.isRequired,
};

export default TownsHistoryMerchantHeader;
