import React, { Component } from "react";
import Merchant from "./Merchant";
import PropTypes from "prop-types";
import { heightLeft, widthLeft } from "../Utils/StyleConstants";
import { connect } from "react-redux";

const styledItemContainer = {
  display: "inline-block",
  float: "left",
  position: "absolute",
  top: 30,
  left: 26,
  overflowY: "auto",
  height: `${heightLeft / 2 - 60}px`,
  width: `${widthLeft / 2 - 46}px`,
};

class MerchantList extends Component {
  render() {
    const { merchantsList, merchants, showItems } = this.props;

    return (
      <div style={styledItemContainer} className="scrollbar">
        {merchantsList.map(index => {
          return (
            <Merchant
              key={`merchant-${merchants[index].name}`}
              {...merchants[index]}
              index={index}
              showItems={showItems}
            />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  merchants: store.merchants.merchantList,
});

MerchantList.propTypes = {
  merchantsList: PropTypes.array.isRequired,
  showItems: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(MerchantList);
