import React from 'react';

import PropTypes from 'prop-types';
import {
  widthRightPanel,
  heightHeader,
  widthExchangeBox,
  heightExchangeBox,
} from '../Utils/StyleConstants';
import ExchangeExit from './ExchangeExit';
import Cadre from '../Utils/Cadre';
import ExchangeContent from './ExchangeContent';
import ExchangeHeader from './ExchangeHeader';
import { colors } from '../Utils/Constants';

const styledExchangeContainer = {
  position: 'absolute',
  right: widthRightPanel,
  top: heightHeader,
  color: colors.text,
  width: widthExchangeBox,
  height: heightExchangeBox,
  zIndex: 2,
};

const styledCadre = {
  position: 'absolute',
  right: 0,
  top: 0,
  width: widthExchangeBox,
  height: heightExchangeBox,
};

const ExchangePanel = ({
  currentExchangeCharacter,
  closeExchange,
  onItemExchange,
  onWeaponExchange,
}) => {
  return (
    <div style={styledExchangeContainer}>
      <Cadre style={styledCadre} />
      <ExchangeHeader name={currentExchangeCharacter.name} />
      <ExchangeContent
        onItemExchange={onItemExchange}
        onWeaponExchange={onWeaponExchange}
      />
      <ExchangeExit closeExchange={closeExchange} />
    </div>
  );
};

ExchangePanel.propTypes = {
  closeExchange: PropTypes.func.isRequired,
  onItemExchange: PropTypes.func.isRequired,
  onWeaponExchange: PropTypes.func.isRequired,
  currentExchangeCharacter: PropTypes.object.isRequired,
};

export default ExchangePanel;
