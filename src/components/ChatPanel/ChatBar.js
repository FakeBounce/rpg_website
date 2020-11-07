import React from 'react';
import { widthLeft } from '../Utils/StyleConstants';
import ChatUploader from './ChatUploader';
import ChatInput from './ChatInput';
import ChatSubmit from './ChatSubmit';

const styledChatBar = {
  width: widthLeft / 2,
  height: '30px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundImage: 'url("./backgrounds/ChatBox_BG.jpg")',
  borderTop: '1px solid white',
  borderRadius: '0 0 .28571429rem .28571429rem',
  paddingRight: '3px',
};

const ChatBar = () => {

  return (
    <div style={styledChatBar}>
      <ChatUploader />
      <ChatInput />
      <ChatSubmit />
    </div>
  );
};

export default ChatBar;
