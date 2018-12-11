import React, { Component } from 'react';
import PropTypes from 'prop-types';

const styledHeader = { marginBottom: 20 };

class ExchangeHeader extends Component {
  render() {
    const { name } = this.props;

    return <div style={styledHeader}>Exchange tab with {name}</div>;
  }
}

ExchangeHeader.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ExchangeHeader;
