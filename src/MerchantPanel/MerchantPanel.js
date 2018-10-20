import React, { Component } from "react";
import PropTypes from "prop-types";
import { widthLeft, heightLeft } from "../Utils/StyleConstants";
import MerchantList from "./MerchantList";

const styledBoxHeader = {
  width: "100%",
  height: "20px",
  marginBottom: "5px",
  textAlign: "center",
};

const styledMapSide = {
  border: "1px solid brown",
  width: `${widthLeft / 2 - 11}px`,
  height: `${heightLeft / 2 - 1}px`,
  display: "inline-block",
  float: "left",
  textAlign: "left",
  position: "relative",
};

class MerchantPanel extends Component {
  showItems = (list, index) => {
    this.props.doSetState({
      isItemShowed: true,
      itemsList: list,
      currentMerchant: index,
    });
  };

  render() {
    const { merchantsList, merchants, currentMerchant } = this.props;

    return (
      <div style={styledMapSide}>
        <div style={styledBoxHeader}>Liste des marchands</div>
        <MerchantList
          currentMerchant={currentMerchant}
          merchantsList={merchantsList}
          merchants={merchants}
          showItems={this.showItems}
        />
      </div>
    );
  }
}

MerchantPanel.propTypes = {
  currentMerchant: PropTypes.number.isRequired,
  merchantsList: PropTypes.array.isRequired,
  merchants: PropTypes.array.isRequired,
  doSetState: PropTypes.func.isRequired,
};

export default MerchantPanel;
