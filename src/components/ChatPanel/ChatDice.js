import React from 'react';
import PropTypes from 'prop-types';
import { cursorPointer } from '../Utils/StyleConstants';

const styledChatDice = {
  padding: '1px 5px',
  width: '23px',
  height: '23px',
  float: 'left',
  display: 'inline-block',
  position: 'relative',
  cursor: cursorPointer,
};

const ChatDice = ({ tip, image, alt, attribute, launchCommand }) => {
  return (
    <img
      src={image}
      alt={alt}
      style={styledChatDice}
      onClick={() => launchCommand(attribute)}
      data-tip={tip}
    />
  );
};

ChatDice.propTypes = {
  launchCommand: PropTypes.func.isRequired,
  tip: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  attribute: PropTypes.string.isRequired,
};

export default ChatDice;
