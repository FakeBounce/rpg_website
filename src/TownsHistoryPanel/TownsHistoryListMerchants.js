import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import TownsHistoryListMerchant from './TownsHistoryListMerchant';
import TownsHistoryListMerchantsHeader from './TownsHistoryListMerchantsHeader';

const styledTownContainer = { width: '100%' };

class TownsHistoryListMerchants extends Component {
  render() {
    const { town, showMerchant } = this.props;
    return (
      <Fragment>
        {town.merchants.length > 0 && <TownsHistoryListMerchantsHeader />}
        {town.merchants.map(m => {
          return (
            <TownsHistoryListMerchant
              showMerchant={showMerchant}
              merchant={m}
            />
          );
        })}
      </Fragment>
    );
  }
}

TownsHistoryListMerchants.propTypes = {
  town: PropTypes.object.isRequired,
  showMerchant: PropTypes.func.isRequired,
};

export default TownsHistoryListMerchants;
