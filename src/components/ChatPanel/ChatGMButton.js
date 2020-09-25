import React from 'react';
import useChat from '../../hooks/useChat';
import { widthLeft } from "../Utils/StyleConstants";
import ButtonLarge from '../Utils/ButtonLarge';

const styledChatButtonGMActive = {
  width: widthLeft / 6,
  height: 26,
  float: 'left',
  display: 'inline-block',
  textAlign: 'center',
  padding: '0px',
};

const styledChatButtonGM = {
  width: widthLeft / 6,
  height: 26,
  float: 'left',
  display: 'inline-block',
  textAlign: 'center',
  padding: '0px',
};

const ChatGMButton = () => {
  const { gmCommands, toggleGMCommands } = useChat();

  return (
    <ButtonLarge
      className={gmCommands ? 'buttonLargeActive' : 'buttonLarge'}
      style={gmCommands ? styledChatButtonGMActive : styledChatButtonGM}
      onClick={toggleGMCommands}
    >
      Dice to GM
    </ButtonLarge>
  );
};

export default ChatGMButton;
