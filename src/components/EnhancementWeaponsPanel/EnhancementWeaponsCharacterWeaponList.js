import React from 'react';
import PropTypes from 'prop-types';

import EnhancementWeaponsItem from './EnhancementWeaponsItem';
import EnhancementWeaponsSeparator from './EnhancementWeaponsSeparator';
import { useSelector } from 'react-redux';

const EnhancementWeaponsCharacterWeaponList = ({
  choosedItem,
  showEnhancers,
}) => {
  const { characterWeapons } = useSelector(store => ({
    characterWeapons: store.character.weapons,
  }));
  return (
    <>
      <EnhancementWeaponsSeparator text='Your weapons :' />
      {characterWeapons.map((item, index) => {
        if (item.indexOf('(') === -1) {
          return (
            <EnhancementWeaponsItem
              key={`item-${item.name}-${index}`}
              index={index}
              isHidden={false}
              isSelected={
                choosedItem &&
                !choosedItem.isFromMerchant &&
                choosedItem.index === index
              }
              itemAction={() =>
                showEnhancers(
                  false,
                  { name: item.name ? item.name : item },
                  index,
                )
              }
              name={item}
            />
          );
        }
        return null;
      })}
    </>
  );
};

EnhancementWeaponsCharacterWeaponList.propTypes = {
  choosedItem: PropTypes.object.isRequired,
  showEnhancers: PropTypes.func.isRequired,
};

export default EnhancementWeaponsCharacterWeaponList;
