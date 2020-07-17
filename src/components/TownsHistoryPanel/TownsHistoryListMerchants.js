import React from 'react';
import PropTypes from 'prop-types';
import TownsHistoryListMerchant from './TownsHistoryListMerchant';
import TownsHistoryListMerchantsHeader from './TownsHistoryListMerchantsHeader';

const TownsHistoryListMerchants = ({ town, showMerchant }) => {
  return (
    <>
      {town.merchants.length > 0 && <TownsHistoryListMerchantsHeader />}
      {town.merchants.map(m => {
        return (
          <TownsHistoryListMerchant
            key={'town-list-merchant-' + m.name}
            showMerchant={showMerchant}
            merchant={m}
          />
        );
      })}
    </>
  );
};

TownsHistoryListMerchants.propTypes = {
  town: PropTypes.object.isRequired,
  showMerchant: PropTypes.func.isRequired,
};

export default TownsHistoryListMerchants;
