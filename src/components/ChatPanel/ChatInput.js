import React, { useEffect, useRef } from 'react';
import { widthLeft } from '../Utils/StyleConstants';
import { useChatContext } from '../../contexts/chatContext';
import useChat from '../../hooks/useChat';

const styledChatInput = {
  width: widthLeft / 2 - 51,
  height: '20px',
  display: 'flex',
};

const ChatInput = () => {
  let chatInputRef = useRef(null);
  const { chatInput, setChatInput } = useChatContext();
  const { handleKeyPress } = useChat();

  useEffect(() => {
    if (chatInput.trim() !== '' && chatInputRef !== null) {
      chatInputRef.current.focus();
    }
  }, [chatInput, chatInputRef]);

  return (
    <input
      type='text'
      name='chatInput'
      placeholder='Chat !'
      value={chatInput}
      onChange={e => {
        setChatInput(e.target.value);
      }}
      style={styledChatInput}
      onKeyPress={handleKeyPress}
      ref={chatInputRef}
    />
  );
};

export default ChatInput;
