import React from 'react';
import PropTypes from 'prop-types';
import ButtonLarge from '../Utils/ButtonLarge';

const styledChatButton = {
  width: 25,
  height: '26px',
  textAlign: 'center',
  padding: '0px',
};

const ChatSubmit = ({ talkInChat }) => {
  return (
    <ButtonLarge style={styledChatButton} onClick={talkInChat}>
      OK
    </ButtonLarge>
  );
};

ChatSubmit.propTypes = {
  talkInChat: PropTypes.func.isRequired,
};

export default ChatSubmit;
