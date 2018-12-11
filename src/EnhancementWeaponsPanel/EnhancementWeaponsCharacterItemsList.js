import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EnhancementWeaponsItem from './EnhancementWeaponsItem';

class EnhancementWeaponsCharacterItemsList extends Component {
  render() {
    const {
      character,
      isFromMerchant,
      choosedItem,
      showEnhancers,
    } = this.props;

    return character.items.map((item, index) => {
      const isHidden = character.education < item.rarity * 9;
      if (item.itemType === 'weapons') {
        return (
          <EnhancementWeaponsItem
            key={`item-${item.name}-${index}`}
            {...item}
            index={index}
            isHidden={isHidden}
            isSelected={isFromMerchant && choosedItem.name === item.name}
            itemAction={() => showEnhancers(false, item)}
          />
        );
      }
    });
  }
}

EnhancementWeaponsCharacterItemsList.propTypes = {
  character: PropTypes.object.isRequired,
  isFromMerchant: PropTypes.bool.isRequired,
  choosedItem: PropTypes.object.isRequired,
  showEnhancers: PropTypes.func.isRequired,
};

export default EnhancementWeaponsCharacterItemsList;
