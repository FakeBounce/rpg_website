import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import EnhancerItem from './EnhancerItem';
import EnhancerSeparator from './EnhancerSeparator';

class EnhancerCharacterItems extends Component {
  render() {
    const {
      character,
      merchants,
      currentMerchant,
      chooseEnhancer1,
      chooseEnhancer2,
      choosedEnhancer1,
      choosedEnhancer2,
      slots,
    } = this.props;

    return (
      <Fragment>
        <EnhancerSeparator text="In your inventory :" />
        {character.items.map((item, index) => {
          const isHidden = character.education < item.rarity * 9;
          if (
            item.itemType === 'enhancements' &&
            item.slot <= slots &&
            item.slot <= parseInt(merchants[currentMerchant].level, 10)
          ) {
            return (
              <EnhancerItem
                key={`item-${item.name}-${index}`}
                {...item}
                index={index}
                isHidden={isHidden}
                isSelected={
                  (choosedEnhancer1 &&
                    !choosedEnhancer1.isFromMerchant &&
                    choosedEnhancer1.index === index) ||
                  (choosedEnhancer2 &&
                    !choosedEnhancer2.isFromMerchant &&
                    choosedEnhancer2.index === index)
                }
                slot={parseInt(item.slot, 10)}
                itemAction={() => {
                  if (parseInt(item.slot, 10) === 1) {
                    chooseEnhancer1(false, item, index);
                  } else {
                    chooseEnhancer2(false, item, index);
                  }
                }}
              />
            );
          }
          return null;
        })}
      </Fragment>
    );
  }
}

EnhancerCharacterItems.propTypes = {
  currentMerchant: PropTypes.number.isRequired,
  character: PropTypes.object.isRequired,
  merchants: PropTypes.array.isRequired,
  chooseEnhancer1: PropTypes.func.isRequired,
  chooseEnhancer2: PropTypes.func.isRequired,
  choosedEnhancer1: PropTypes.object.isRequired,
  choosedEnhancer2: PropTypes.object.isRequired,
  slots: PropTypes.number.isRequired,
};

export default EnhancerCharacterItems;
