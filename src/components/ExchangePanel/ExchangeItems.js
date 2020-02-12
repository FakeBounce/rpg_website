import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExchangeItem from './ExchangeItem';
import { connect } from "react-redux";

class ExchangeItems extends Component {
  render() {
    const { characterItems, onItemExchange } = this.props;

    return characterItems.map((item, index) => {
      return (
        <ExchangeItem
          onItemExchange={onItemExchange}
          index={index}
          item={item}
        />
      );
    });
  }
}

const mapStateToProps = store => ({
  characterItems: store.character.items,
});

ExchangeItems.propTypes = {
  onItemExchange: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(ExchangeItems);
