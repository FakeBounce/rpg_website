import React from 'react';
import Merchant from './Merchant';
import PropTypes from 'prop-types';
import { heightLeft, widthLeft } from '../Utils/StyleConstants';
import { useSelector } from 'react-redux';

const styledItemContainer = {
  display: 'inline-block',
  float: 'left',
  position: 'absolute',
  top: 30,
  left: 26,
  overflowY: 'auto',
  height: `${heightLeft / 2 - 60}px`,
  width: `${widthLeft / 2 - 46}px`,
};

const MerchantList = ({ merchantsList }) => {
  const { merchants } = useSelector(store => ({
    merchants: store.merchants.merchantList,
  }));

  return (
    <div style={styledItemContainer} className='scrollbar'>
      {merchantsList.map(index => {
        return (
          <Merchant
            key={`merchant-${merchants[index].name}`}
            {...merchants[index]}
            index={index}
          />
        );
      })}
    </div>
  );
};

MerchantList.propTypes = {
  merchantsList: PropTypes.array.isRequired,
};

export default MerchantList;
