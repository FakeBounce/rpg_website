import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import EnhancerItem from './EnhancerItem';
import EnhancerSeparator from './EnhancerSeparator';

class EnhancerMerchantItems extends Component {
  render() {
    const {
      character,
      itemsList,
      merchants,
      currentMerchant,
      chooseEnhancer1,
      chooseEnhancer2,
      choosedEnhancer1,
      choosedEnhancer2,
      slots,
      currentTab,
    } = this.props;

    return (
      <Fragment>
        <EnhancerSeparator
          text={
            currentTab === 'enhancements'
              ? 'Choose enhancement (temporary) :'
              : 'Choose enhancement (permanent) :'
          }
        />
        {parseInt(merchants[currentMerchant].enhancements, 10) > 0 &&
          itemsList.map((itemFromMerchant, index) => {
            const isHidden = character.education < itemFromMerchant.rarity * 9;
            if (
              itemFromMerchant.itemType === 'enhancements' &&
              itemFromMerchant.slot <= slots &&
              itemFromMerchant.slot <=
                parseInt(merchants[currentMerchant].level, 10)
            ) {
              return (
                <EnhancerItem
                  key={`item-${itemFromMerchant.name}-${index}`}
                  {...itemFromMerchant}
                  index={index}
                  isHidden={isHidden}
                  isSelected={
                    (choosedEnhancer1 &&
                      choosedEnhancer1.isFromMerchant &&
                      choosedEnhancer1.index === index) ||
                    (choosedEnhancer2 &&
                      choosedEnhancer2.isFromMerchant &&
                      choosedEnhancer2.index === index)
                  }
                  itemAction={() => {
                    if (parseInt(itemFromMerchant.slot, 10) === 1) {
                      chooseEnhancer1(true, itemFromMerchant, index);
                    } else {
                      chooseEnhancer2(true, itemFromMerchant, index);
                    }
                  }}
                />
              );
            }
          })}
      </Fragment>
    );
  }
}

EnhancerMerchantItems.propTypes = {
  currentMerchant: PropTypes.number.isRequired,
  character: PropTypes.object.isRequired,
  itemsList: PropTypes.array.isRequired,
  merchants: PropTypes.array.isRequired,
  chooseEnhancer1: PropTypes.func.isRequired,
  chooseEnhancer2: PropTypes.func.isRequired,
  choosedEnhancer1: PropTypes.object.isRequired,
  choosedEnhancer2: PropTypes.object.isRequired,
  slots: PropTypes.number.isRequired,
  currentTab: PropTypes.string.isRequired,
};

export default EnhancerMerchantItems;
