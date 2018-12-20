import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TownsHistoryListMerchant from './TownsHistoryListMerchant';
import TownsHistoryListHeader from './TownsHistoryListHeader';

const styledTownContainer = { width: '100%' };

class TownsHistoryListTown extends Component {
  render() {
    const {
      merchantsOrdered,
      showCity,
      showMerchant,
      index,
      townKey,
    } = this.props;
    return (
      <div style={styledTownContainer}>
        <TownsHistoryListHeader
          index={index}
          showCity={showCity}
          townKey={townKey}
        />
        {merchantsOrdered[townKey].map(m => {
          return (
            <TownsHistoryListMerchant
              showMerchant={showMerchant}
              merchant={m}
            />
          );
        })}
      </div>
    );
  }
}

TownsHistoryListTown.propTypes = {
  merchantsOrdered: PropTypes.array.isRequired,
  showCity: PropTypes.func.isRequired,
  showMerchant: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  townKey: PropTypes.string.isRequired,
};

export default TownsHistoryListTown;
