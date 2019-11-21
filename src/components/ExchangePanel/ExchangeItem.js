import React, { Component } from 'react';

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

class ExchangeItem extends Component {
  render() {
    const { character, onItemExchange, index, item } = this.props;

    return (
      <div key={`${item.name}-${index}`} style={styledItem}>
        <div style={styledItemName}>
          {character.education < item.rarity * 9 ? '???' : item.name}
        </div>
        <ButtonLarge
          style={styledExchangeButton}
          onClick={() => onItemExchange(index, item.quantity - 1, item)}
        >
          Give 1 ({item.quantity} left)
        </ButtonLarge>
      </div>
    );
  }
}

ExchangeItem.propTypes = {
  character: PropTypes.object.isRequired,
  onItemExchange: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
};

export default ExchangeItem;
