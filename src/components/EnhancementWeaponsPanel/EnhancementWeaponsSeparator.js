import React from 'react';
import PropTypes from 'prop-types';

const styledEnhancementWeaponsText = { width: '100%', display: 'block' };

const EnhancementWeaponsSeparator = ({ text }) => {
  return <div style={styledEnhancementWeaponsText}>{text}</div>;
};

EnhancementWeaponsSeparator.propTypes = {
  text: PropTypes.string.isRequired,
};

export default EnhancementWeaponsSeparator;
