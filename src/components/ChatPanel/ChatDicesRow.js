import React from 'react';
import { widthLeft } from '../Utils/StyleConstants';
import { bonusList } from '../Utils/Constants';
import SelectMapper from '../Utils/SelectMapper';
import ChatDices from './ChatDices';
import ChatGMButton from './ChatGMButton';
import useChat from '../../hooks/useChat';
import { useChatContext } from '../../contexts/chatContext';

const styledChatDices = {
  width: widthLeft / 2,
  height: '25px',
  float: 'left',
  display: 'inline-block',
  position: 'relative',
};

const styledChatSelect = {
  display: 'inline-block',
  float: 'left',
  width: 40,
};

const ChatDicesRow = () => {
  const { onChangeDice } = useChat();
  const { bonus } = useChatContext();

  return (
    <div style={styledChatDices}>
      <ChatDices />
      <SelectMapper
        mapArray={bonusList}
        value={bonus}
        onChange={onChangeDice}
        style={styledChatSelect}
      />
      <ChatGMButton />
    </div>
  );
};

export default ChatDicesRow;
