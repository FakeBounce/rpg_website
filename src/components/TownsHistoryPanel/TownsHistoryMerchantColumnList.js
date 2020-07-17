import React from 'react';
import PropTypes from 'prop-types';
import Item from '../ItemPanel/Item';
import { heightLeft } from '../Utils/StyleConstants';
import { useSelector } from 'react-redux';

const styledMerchantList = {
  width: '100%',
  height: heightLeft - 52,
  position: 'relative',
  overflowY: 'auto',
  overflowX: 'hidden',
};

const TownsHistoryMerchantColumnList = ({
  characterEducation,
  showItemDescription,
  merchants,
  currentMerchant,
}) => {
  const {
    characterEducation,
    characterEducation,
    merchants,
    currentMerchant,
  } = useSelector(store => ({
    characterEducation: store.character.education,
    merchants: store.merchants.merchantList,
    currentMerchant: store.merchants.currentMerchant,
  }));

  return (
    <>
      <div style={styledMerchantList} className='scrollbar'>
        {Object.keys(merchants[currentMerchant].items).map(iKey => {
          return (
            <Item
              key={'town-list-column-merchant-item-' + iKey}
              index={iKey}
              showItemDescription={showItemDescription}
              isHidden={
                characterEducation <
                parseInt(merchants[currentMerchant].items[iKey].rarity, 10) * 9
              }
              {...merchants[currentMerchant].items[iKey]}
            />
          );
        })}
      </div>
    </>
  );
};

TownsHistoryMerchantColumnList.propTypes = {
  showItemDescription: PropTypes.func.isRequired,
};

export default TownsHistoryMerchantColumnList;
