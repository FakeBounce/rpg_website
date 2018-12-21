import React, { Component } from 'react';

const styledMerchantHeader = {
  width: '50%',
  borderBottom: '1px dashed white',
  marginLeft: '25%',
  marginTop: 5,
};

class TownsHistoryListMerchantsHeader extends Component {
  render() {
    return <div style={styledMerchantHeader}>Merchants</div>;
  }
}

export default TownsHistoryListMerchantsHeader;
