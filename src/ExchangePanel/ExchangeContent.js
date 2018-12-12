import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { widthExchangeBox, heightExchangeBox } from '../Utils/StyleConstants';
import ExchangeItems from './ExchangeItems';
import ExchangeWeapons from './ExchangeWeapons';

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

class ExchangeContent extends Component {
  render() {
    const { character, onItemExchange, onWeaponExchange } = this.props;

    return (
      <div className="scrollbar" style={styledItemContainer}>
        <div style={styledSeparator}>Weapons : </div>
        <ExchangeWeapons
          character={character}
          onWeaponExchange={onWeaponExchange}
        />
        <div style={styledSeparator2}>Items : </div>
        <ExchangeItems character={character} onItemExchange={onItemExchange} />
      </div>
    );
  }
}

ExchangeContent.propTypes = {
  onItemExchange: PropTypes.func.isRequired,
  onWeaponExchange: PropTypes.func.isRequired,
  character: PropTypes.object.isRequired,
};

export default ExchangeContent;
