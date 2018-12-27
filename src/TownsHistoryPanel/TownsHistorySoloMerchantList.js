import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Item from '../ItemPanel/Item';
import { heightLeft } from '../Utils/StyleConstants';

const styledListContainer = {
  width: '100%',
  height: heightLeft - 26,
  display: 'inline-block',
  position: 'relative',
  float: 'left',
  borderRight: '1px solid white',
  overflowY: 'auto',
  overflowX: 'hidden',
};

class TownsHistorySoloMerchantList extends Component {
  render() {
    const { character, showedMerchant } = this.props;
    return (
      <div style={styledListContainer} className="scrollbar">
        {Object.keys(showedMerchant.items).map(iKey => {
          return (
            <Item
              key={'town-list-merchant-item-'+iKey}
              index={iKey}
              showItemDescription={() => {}}
              noPrice
              isHidden={
                character.education <
                parseInt(showedMerchant.items[iKey].rarity, 10) * 9
              }
              {...showedMerchant.items[iKey]}
            />
          );
        })}
      </div>
    );
  }
}

TownsHistorySoloMerchantList.propTypes = {
  character: PropTypes.object.isRequired,
  showedMerchant: PropTypes.object.isRequired,
};

export default TownsHistorySoloMerchantList;
