import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { cursorPointer, widthListPanelBestiary } from "../Utils/StyleConstants";

const styledMerchant = {
  width: '100%',
  height: 45,
  position: 'relative',
  display: 'inline-block',
  cursor: cursorPointer,
};
const styledImage = {
  width: 25,
  height: 25,
  display: 'inline-block',
  float: 'right',
};
const styledText = { width:widthListPanelBestiary - 31, height: 25, display: 'inline-block', float: 'left' };

class TownsHistoryListMerchant extends Component {
  render() {
    const { showMerchant, merchant } = this.props;
    return (
      <div style={styledMerchant} onClick={() => showMerchant(merchant)}>
        <img style={styledImage} src={`./merchants/${merchant.icon}`} />
        <div style={styledText}>
          {merchant.name}, {merchant.job} (Quality : {merchant.level})
        </div>
      </div>
    );
  }
}

TownsHistoryListMerchant.propTypes = {
  showMerchant: PropTypes.func.isRequired,
  merchant: PropTypes.object.isRequired,
};

export default TownsHistoryListMerchant;
