import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExchangeWeapon from './ExchangeWeapon';
import { useSelector } from 'react-redux';

const ExchangeWeapons = ({ onWeaponExchange }) => {
  const { characterWeapons } = useSelector(store => ({
    characterWeapons: store.character.weapons,
  }));

  if (characterWeapons.length > 0) {
    return characterWeapons.map((item, index) => {
      return (
        <ExchangeWeapon
          onWeaponExchange={onWeaponExchange}
          index={index}
          item={item}
        />
      );
    });
  } else return null;
};

ExchangeWeapons.propTypes = {
  onWeaponExchange: PropTypes.func.isRequired,
};

export default ExchangeWeapons;
