import React from 'react';
import PropTypes from 'prop-types';
import { cursorPointer } from '../Utils/StyleConstants';

const styledAttrDice = {
  paddingBottom: '1px',
  marginRight: '3px',
  width: '23px',
  height: '23px',
  float: 'left',
  display: 'inline-block',
  position: 'relative',
  cursor: cursorPointer,
};

const AttributeDice = ({ tip, image, alt, attribute, launchCommand }) => {
  return (
    <img
      src={image}
      alt={alt}
      style={styledAttrDice}
      onClick={() => launchCommand(attribute)}
      data-tip={tip}
    />
  );
};

AttributeDice.propTypes = {
  launchCommand: PropTypes.func.isRequired,
  tip: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  attribute: PropTypes.string.isRequired,
};

export default AttributeDice;
