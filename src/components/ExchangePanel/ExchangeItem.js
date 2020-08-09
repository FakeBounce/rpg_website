import React from 'react';

import PropTypes from 'prop-types';
import { widthExchangeBox } from '../Utils/StyleConstants';
import ButtonLarge from '../Utils/ButtonLarge';
import { useSelector } from 'react-redux';

const styledItem = {
  width: `${widthExchangeBox - 40}px`,
  paddingHorizontal: 5,
  position: 'relative',
  float: 'left',
  display: 'inline-block',
  borderBottom: '1px solid white',
};

const styledItemName = {
  width: `${widthExchangeBox - 130}px`,
  position: 'relative',
  float: 'left',
  display: 'inline-block',
};

const styledExchangeButton = {
  width: 90,
  height: 30,
  position: 'relative',
  float: 'right',
  display: 'inline-block',
  padding: 0,
  margin: 0,
  textAlign: 'center',
};

const ExchangeItem = ({ onItemExchange, index, item }) => {
  const { characterEducation } = useSelector(store => ({
    characterEducation: store.character.education,
  }));

  return (
    <div key={`${item.name}-${index}`} style={styledItem}>
      <div style={styledItemName}>
        {characterEducation < item.rarity * 9 ? '???' : item.name}
      </div>
      <ButtonLarge
        style={styledExchangeButton}
        onClick={() => onItemExchange(index, item.quantity - 1, item)}
      >
        Give 1 ({item.quantity} left)
      </ButtonLarge>
    </div>
  );
};

ExchangeItem.propTypes = {
  onItemExchange: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
};

export default ExchangeItem;
