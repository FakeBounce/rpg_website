import React, { Component } from 'react';
import PropTypes from 'prop-types';

const styledCityHeader = {
  width: '100%',
  height: 25,
  borderBottom: '1px solid white',
  position: 'relative',
};

class TownsHistoryCityHeader extends Component {
  render() {
    const { name } = this.props;
    return <div style={styledCityHeader}>{name}</div>;
  }
}

TownsHistoryCityHeader.propTypes = {
  name: PropTypes.string.isRequired,
};

export default TownsHistoryCityHeader;
