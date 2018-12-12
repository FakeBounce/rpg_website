import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import EnhancementWeaponsItem from './EnhancementWeaponsItem';
import EnhancementWeaponsSeparator from './EnhancementWeaponsSeparator';

class EnhancementWeaponsMerchantList extends Component {
  render() {
    const { character, itemsList, choosedItem, showEnhancers } = this.props;

    return (
      <Fragment>
        <EnhancementWeaponsSeparator text="Proposed weapons :" />
        {itemsList.map((itemFromMerchant, index) => {
          const isHidden = character.education < itemFromMerchant.rarity * 9;
          if (itemFromMerchant.itemType === 'weapons') {
            return (
              <EnhancementWeaponsItem
                key={`item-${itemFromMerchant.name}-${index}`}
                {...itemFromMerchant}
                index={index}
                isHidden={isHidden}
                isSelected={choosedItem && choosedItem.index === index}
                itemAction={() => showEnhancers(true, itemFromMerchant, index)}
                slot={itemFromMerchant.slots}
              />
            );
          }
        })}
      </Fragment>
    );
  }
}

EnhancementWeaponsMerchantList.propTypes = {
  character: PropTypes.object.isRequired,
  choosedItem: PropTypes.object.isRequired,
  showEnhancers: PropTypes.func.isRequired,
  itemsList: PropTypes.array.isRequired,
};

export default EnhancementWeaponsMerchantList;
