import React from 'react';
import PropTypes from 'prop-types';
import { cursorPointer, widthListPanelBestiary } from '../Utils/StyleConstants';

const styledMerchant = {
  width: '100%',
  position: 'relative',
  display: 'inline-block',
  cursor: cursorPointer,
  marginTop: 5,
  marginBottom: 5,
};
const styledImage = {
  width: 25,
  height: 25,
  display: 'inline-block',
  float: 'right',
};
const styledText = {
  width: widthListPanelBestiary - 31,
  display: 'inline-block',
  float: 'left',
};

const TownsHistoryListMerchant = ({ showMerchant, merchant }) => {
  return (
    <div style={styledMerchant} onClick={() => showMerchant(merchant)}>
      <img
        style={styledImage}
        src={`./merchants/${merchant.icon}`}
        alt={merchant.icon}
      />
      <div style={styledText}>
        {merchant.name}, {merchant.job}
        <br />
        (Quality : {merchant.level})
      </div>
    </div>
  );
};

TownsHistoryListMerchant.propTypes = {
  showMerchant: PropTypes.func.isRequired,
  merchant: PropTypes.object.isRequired,
};

export default TownsHistoryListMerchant;
