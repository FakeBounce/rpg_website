import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import ButtonLarge from '../Utils/ButtonLarge';

const styledEnhanceButton = {
  display: 'block',
  float: 'right',
  position: 'relative',
  marginTop: 20,
  marginRight: 20,
};

const EnhanceButton = ({ enhanceWeapon, enhancePrice }) => {
  const { characterGold } = useSelector(store => ({
    characterEducation: store.character.gold,
  }));

  return (
    <ButtonLarge
      onClick={() => {
        if (characterGold >= enhancePrice) {
          enhanceWeapon();
        }
      }}
      style={styledEnhanceButton}
      className={`${characterGold < enhancePrice ? 'noGold' : ''}`}
    >
      Enhance item ({enhancePrice}
      g)
    </ButtonLarge>
  );
};

EnhanceButton.propTypes = {
  enhanceWeapon: PropTypes.func.isRequired,
  enhancePrice: PropTypes.number.isRequired,
};

export default EnhanceButton;
