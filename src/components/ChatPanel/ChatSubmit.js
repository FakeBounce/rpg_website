import React from 'react';
import ButtonLarge from '../Utils/ButtonLarge';
import useChat from '../../hooks/useChat';

const styledChatButton = {
  width: 25,
  height: '26px',
  textAlign: 'center',
  padding: '0px',
};

const ChatSubmit = () => {
  const { talkInChat } = useChat();
  return (
    <ButtonLarge style={styledChatButton} onClick={talkInChat}>
      OK
    </ButtonLarge>
  );
};

export default ChatSubmit;
