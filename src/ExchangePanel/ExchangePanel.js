import React, { Component } from 'react';

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

const styledExchangeContainer = {
  position: 'absolute',
  right: widthRightPanel,
  top: heightHeader,
  color: 'white',
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

class ExchangePanel extends Component {
  render() {
    const {
      character,
      currentExchangeCharacter,
      closeExchange,
      onItemExchange,
    } = this.props;

    return (
      <div style={styledExchangeContainer}>
        <Cadre style={styledCadre} />
        <ExchangeContent
          onItemExchange={onItemExchange}
          character={character}
          currentExchangeCharacter={currentExchangeCharacter}
        />
        <ExchangeExit closeExchange={closeExchange} />
      </div>
    );
  }
}

ExchangePanel.propTypes = {
  closeExchange: PropTypes.func.isRequired,
  onItemExchange: PropTypes.func.isRequired,
  currentExchangeCharacter: PropTypes.object.isRequired,
  character: PropTypes.object.isRequired,
};

export default ExchangePanel;
