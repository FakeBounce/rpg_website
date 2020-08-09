import React from 'react';

import PropTypes from 'prop-types';
import { widthExchangeBox, heightExchangeBox } from '../Utils/StyleConstants';
import ExchangeItems from './ExchangeItems';
import ExchangeWeapons from './ExchangeWeapons';
import { useSelector } from 'react-redux';

const styledItemContainer = {
  position: 'absolute',
  left: 20,
  top: 20,
  width: widthExchangeBox - 40,
  height: heightExchangeBox - 40,
  zIndex: 2,
  overflowY: 'auto',
  overflowX: 'hidden',
};

const styledSeparator = { marginBottom: 10 };
const styledSeparator2 = { marginTop: 20, display: 'inline-block' };

const ExchangeContent = ({ onItemExchange, onWeaponExchange }) => {
  const { characterWeapons } = useSelector(store => ({
    characterWeapons: store.character.weapons,
  }));

  return (
    <div className='scrollbar' style={styledItemContainer}>
      {characterWeapons.length > 0 && (
        <>
          <div style={styledSeparator}>Weapons : </div>
          <ExchangeWeapons onWeaponExchange={onWeaponExchange} />
        </>
      )}
      <div style={styledSeparator2}>Items : </div>
      <ExchangeItems onItemExchange={onItemExchange} />
    </div>
  );
};

ExchangeContent.propTypes = {
  onItemExchange: PropTypes.func.isRequired,
  onWeaponExchange: PropTypes.func.isRequired,
};

export default ExchangeContent;
