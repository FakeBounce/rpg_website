import React from 'react';
import PropTypes from 'prop-types';

const styledSeparator = { width: '100%', display: 'block' };

const EnhancerSeparator = ({ text }) => {
  return <div style={styledSeparator}>{text}</div>;
};

EnhancerSeparator.propTypes = {
  text: PropTypes.string.isRequired,
};

export default EnhancerSeparator;
