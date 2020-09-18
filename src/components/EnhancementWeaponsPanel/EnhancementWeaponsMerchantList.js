import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { currentItemsListSelector } from '../../selectors';

import EnhancementWeaponsItem from './EnhancementWeaponsItem';
import EnhancementWeaponsSeparator from './EnhancementWeaponsSeparator';

const EnhancementWeaponsMerchantList = ({ choosedItem, showEnhancers }) => {
  const { characterEducation, itemsList } = useSelector(store => ({
    characterEducation: store.character.education,
    itemsList: currentItemsListSelector(store),
  }));

  return (
    <>
      <EnhancementWeaponsSeparator text='Proposed weapons :' />
      {Object.keys(itemsList).map(key => {
        const isHidden = characterEducation < itemsList[key].rarity * 9;
        if (itemsList[key].itemType === 'weapons') {
          return (
            <EnhancementWeaponsItem
              key={`item-${itemsList[key].name}-${key}`}
              {...itemsList[key]}
              index={key}
              isHidden={isHidden}
              isSelected={
                choosedItem &&
                choosedItem.isFromMerchant &&
                choosedItem.index === key
              }
              itemAction={() => showEnhancers(true, itemsList[key], key)}
              slot={itemsList[key].slots}
            />
          );
        }
        return null;
      })}
    </>
  );
};

EnhancementWeaponsMerchantList.propTypes = {
  choosedItem: PropTypes.object.isRequired,
  showEnhancers: PropTypes.func.isRequired,
};

export default EnhancementWeaponsMerchantList;
