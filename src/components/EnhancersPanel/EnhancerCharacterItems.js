import React from 'react';
import PropTypes from 'prop-types';

import EnhancerItem from './EnhancerItem';
import EnhancerSeparator from './EnhancerSeparator';
import { useSelector } from 'react-redux';
import { currentMerchantRawLevelSelector } from '../../selectors';

const EnhancerCharacterItems = ({
  chooseEnhancer1,
  chooseEnhancer2,
  choosedEnhancer1,
  choosedEnhancer2,
  slots,
}) => {
  const { characterEducation, characterItems, merchantRawLevel } = useSelector(
    store => ({
      characterEducation: store.character.education,
      characterItems: store.character.items,
      merchantRawLevel: currentMerchantRawLevelSelector(store),
    }),
  );

  return (
    <>
      <EnhancerSeparator text='In your inventory :' />
      {characterItems.length > 0 &&
        characterItems.map((item, index) => {
          const isHidden = characterEducation < item.rarity * 9;
          if (
            item.itemType === 'enhancements' &&
            item.slot <= slots &&
            item.slot <= parseInt(merchantRawLevel, 10)
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
    </>
  );
};

EnhancerCharacterItems.propTypes = {
  chooseEnhancer1: PropTypes.func.isRequired,
  chooseEnhancer2: PropTypes.func.isRequired,
  choosedEnhancer1: PropTypes.object.isRequired,
  choosedEnhancer2: PropTypes.object.isRequired,
  slots: PropTypes.number.isRequired,
};

export default EnhancerCharacterItems;
