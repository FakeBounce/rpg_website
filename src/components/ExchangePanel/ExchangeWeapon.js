import React from 'react';

import PropTypes from 'prop-types';
import { widthExchangeBox } from '../Utils/StyleConstants';
import ButtonLarge from '../Utils/ButtonLarge';

const styledItem = {
  width: `${widthExchangeBox - 40}px`,
  paddingHorizontal: 5,
  position: 'relative',
  float: 'left',
  display: 'inline-block',
  borderBottom: '1px solid white',
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

const ExchangeWeapon = ({ onWeaponExchange, index, item }) => {
  return (
    <div key={`${item}-${index}`} style={styledItem}>
      {item}
      <ButtonLarge
        style={styledExchangeButton}
        onClick={() => onWeaponExchange(index, item)}
      >
        Give
      </ButtonLarge>
    </div>
  );
};

ExchangeWeapon.propTypes = {
  onWeaponExchange: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
};

export default ExchangeWeapon;
