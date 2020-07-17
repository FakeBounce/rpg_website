import React from 'react';
import PropTypes from 'prop-types';

const styledCityHeader = {
  width: '100%',
  height: 25,
  borderBottom: '1px solid white',
  position: 'absolute',
};

const TownsHistoryCityHeader = ({ name }) => {
  return <div style={styledCityHeader}>{name}</div>;
};

TownsHistoryCityHeader.propTypes = {
  name: PropTypes.string.isRequired,
};

export default TownsHistoryCityHeader;
