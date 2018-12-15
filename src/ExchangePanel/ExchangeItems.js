import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExchangeItem from './ExchangeItem';

class ExchangeItems extends Component {
  render() {
    const { character, onItemExchange } = this.props;

    return character.items.map((item, index) => {
      return (
        <ExchangeItem
          onItemExchange={onItemExchange}
          character={character}
          index={index}
          item={item}
        />
      );
    });
  }
}

ExchangeItems.propTypes = {
  onItemExchange: PropTypes.func.isRequired,
  character: PropTypes.object.isRequired,
};

export default ExchangeItems;
