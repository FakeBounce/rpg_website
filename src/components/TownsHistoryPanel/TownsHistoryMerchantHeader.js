import React from 'react';
import PropTypes from 'prop-types';

const styledMerchantHeader = {
  width: '100%',
  height: 25,
  borderBottom: '1px solid white',
  position: 'relative',
};

const TownsHistoryMerchantHeader = ({ currentMerchant }) => {
  return (
    <div style={styledMerchantHeader}>
      {currentMerchant.name}, {currentMerchant.job}
    </div>
  );
};

TownsHistoryMerchantHeader.propTypes = {
  currentMerchant: PropTypes.object.isRequired,
};

export default TownsHistoryMerchantHeader;
