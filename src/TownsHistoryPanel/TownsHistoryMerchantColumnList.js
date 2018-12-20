import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Item from '../ItemPanel/Item';
import { heightLeft } from '../Utils/StyleConstants';

const styledMerchantList = {
  width: '100%',
  height: heightLeft - 52,
  position: 'relative',
  overflowY: 'auto',
  overflowX: 'hidden',
};

class TownsHistoryMerchantColumnList extends Component {
  render() {
    const { character, merchants, currentMerchant } = this.props;
    return (
      <div style={styledMerchantList} className="scrollbar">
        {Object.keys(merchants[currentMerchant].items).map(iKey => {
          return (
            <Item
              index={iKey}
              showItemDescription={() => {}}
              noPrice
              isHidden={
                character.education <
                parseInt(merchants[currentMerchant].items[iKey].rarity, 10) * 9
              }
              {...merchants[currentMerchant].items[iKey]}
            />
          );
        })}
      </div>
    );
  }
}

TownsHistoryMerchantColumnList.propTypes = {
  character: PropTypes.object.isRequired,
  merchants: PropTypes.array.isRequired,
  currentMerchant: PropTypes.object.isRequired,
};

export default TownsHistoryMerchantColumnList;