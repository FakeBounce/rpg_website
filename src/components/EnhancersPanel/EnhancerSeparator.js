import React, { Component } from 'react';
import PropTypes from 'prop-types';

const styledSeparator = { width: '100%', display: 'block' };

class EnhancerSeparator extends Component {
  render() {
    const { text } = this.props;

    return <div style={styledSeparator}>{text}</div>;
  }
}

EnhancerSeparator.propTypes = {
  text: PropTypes.string.isRequired,
};

export default EnhancerSeparator;
