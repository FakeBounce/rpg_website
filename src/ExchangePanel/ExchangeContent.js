import React, { Component } from 'react';

import PropTypes from 'prop-types';
import {
  widthExchangeBox,
  heightExchangeBox,
} from '../Utils/StyleConstants';
import ExchangeHeader from './ExchangeHeader';
import ExchangeItems from './ExchangeItems';

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

class ExchangeContent extends Component {
  render() {
    const {
      character,
      currentExchangeCharacter,
      onItemExchange,
    } = this.props;

    return (
      <div className="scrollbar" style={styledItemContainer}>
        <ExchangeHeader name={currentExchangeCharacter.name} />
        <ExchangeItems
          character={character}
          onItemExchange={onItemExchange}
        />
      </div>
    );
  }
}

ExchangeContent.propTypes = {
  onItemExchange: PropTypes.func.isRequired,
  currentExchangeCharacter: PropTypes.object.isRequired,
  character: PropTypes.object.isRequired,
};

export default ExchangeContent;
