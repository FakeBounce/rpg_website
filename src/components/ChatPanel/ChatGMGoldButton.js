import React from 'react';
import useChat from '../../hooks/useChat';
import { widthLeft } from "../Utils/StyleConstants";
import ButtonLarge from '../Utils/ButtonLarge';
import { useChatContext } from '../../contexts/chatContext';

const styledChatButtonGMGoldActive = {
  width: widthLeft / 6,
  height: 26,
  float: 'left',
  display: 'inline-block',
  textAlign: 'center',
  padding: '0px',
};

const styledChatButtonGMGold = {
  width: widthLeft / 6,
  height: 26,
  float: 'left',
  display: 'inline-block',
  textAlign: 'center',
  padding: '0px',
};

const ChatGMGoldButton = () => {
  const { toggleGMCommands } = useChat();
  const { gmCommands } = useChatContext();

  return (
    <ButtonLarge
      className={gmCommands ? 'buttonLargeActive' : 'buttonLarge'}
      style={gmCommands ? styledChatButtonGMGoldActive : styledChatButtonGMGold}
      onClick={toggleGMCommands}
    >
      Gold to GM
    </ButtonLarge>
  );
};

export default ChatGMGoldButton;
