import React, { Component } from 'react';
import PropTypes from 'prop-types';

const styledEnhancementWeaponsText = { width: '100%', display: 'block' };

class EnhancementWeaponsSeparator extends Component {
  render() {
    const { text } = this.props;

    return <div style={styledEnhancementWeaponsText}>{text}</div>;
  }
}

EnhancementWeaponsSeparator.propTypes = {
  text: PropTypes.string.isRequired,
};

export default EnhancementWeaponsSeparator;
