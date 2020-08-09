import React from 'react';
import PropTypes from 'prop-types';
import ExchangeItem from './ExchangeItem';
import { useSelector } from 'react-redux';

const ExchangeItems = ({ onItemExchange }) => {
  const { characterItems } = useSelector(store => ({
    characterItems: store.character.items,
  }));

  return characterItems.map((item, index) => {
    return (
      <ExchangeItem onItemExchange={onItemExchange} index={index} item={item} />
    );
  });
};

ExchangeItems.propTypes = {
  onItemExchange: PropTypes.func.isRequired,
};

export default ExchangeItems;
