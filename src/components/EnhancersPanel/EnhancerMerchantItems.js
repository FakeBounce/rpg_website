import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import EnhancerItem from './EnhancerItem';
import EnhancerSeparator from './EnhancerSeparator';
import {
  currentMerchantEnhancementLevelSelector,
  currentMerchantRawLevelSelector,
  currentItemsListSelector,
} from '../../selectors';

const EnhancerMerchantItems = ({
  chooseEnhancer1,
  chooseEnhancer2,
  choosedEnhancer1,
  choosedEnhancer2,
  slots,
  currentTab,
}) => {
  const {
    characterEducation,
    itemsList,
    merchantRawLevel,
    merchantEnhancementLevel,
  } = useSelector(store => ({
    characterEducation: store.character.education,
    merchantRawLevel: currentMerchantRawLevelSelector(store),
    merchantEnhancementLevel: currentMerchantEnhancementLevelSelector(store),
    itemsList: currentItemsListSelector(store),
  }));

  return (
    <>
      <EnhancerSeparator
        text={
          currentTab === 'enhancements'
            ? 'Choose enhancement (temporary) :'
            : 'Choose enhancement (permanent) :'
        }
      />
      {parseInt(merchantEnhancementLevel, 10) > 0 &&
        Object.keys(itemsList).map(key => {
          const isHidden = characterEducation < itemsList[key].rarity * 9;
          if (
            itemsList[key].itemType === 'enhancements' &&
            itemsList[key].slot <= slots &&
            itemsList[key].slot <= parseInt(merchantRawLevel, 10)
          ) {
            return (
              <EnhancerItem
                key={`item-${itemsList[key].name}-${key}`}
                {...itemsList[key]}
                index={key}
                isHidden={isHidden}
                isSelected={
                  (choosedEnhancer1 &&
                    choosedEnhancer1.isFromMerchant &&
                    choosedEnhancer1.index === key) ||
                  (choosedEnhancer2 &&
                    choosedEnhancer2.isFromMerchant &&
                    choosedEnhancer2.index === key)
                }
                itemAction={() => {
                  if (parseInt(itemsList[key].slot, 10) === 1) {
                    chooseEnhancer1(true, itemsList[key], key);
                  } else {
                    chooseEnhancer2(true, itemsList[key], key);
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

EnhancerMerchantItems.propTypes = {
  chooseEnhancer1: PropTypes.func.isRequired,
  chooseEnhancer2: PropTypes.func.isRequired,
  choosedEnhancer1: PropTypes.object.isRequired,
  choosedEnhancer2: PropTypes.object.isRequired,
  slots: PropTypes.number.isRequired,
  currentTab: PropTypes.string.isRequired,
};

export default EnhancerMerchantItems;
