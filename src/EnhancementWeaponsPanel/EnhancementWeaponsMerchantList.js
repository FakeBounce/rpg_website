import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import EnhancementWeaponsItem from './EnhancementWeaponsItem';
import EnhancementWeaponsSeparator from './EnhancementWeaponsSeparator';

class EnhancementWeaponsMerchantList extends Component {
  render() {
    const {
      character,
      itemsList,
      isFromMerchant,
      choosedItem,
      showEnhancers,
    } = this.props;

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
                isSelected={
                  isFromMerchant && choosedItem.name === itemFromMerchant.name
                }
                itemAction={() =>
                  showEnhancers(true, itemFromMerchant)
                }
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
  isFromMerchant: PropTypes.bool.isRequired,
  choosedItem: PropTypes.object.isRequired,
  showEnhancers: PropTypes.func.isRequired,
  itemsList: PropTypes.array.isRequired,
};

export default EnhancementWeaponsMerchantList;
