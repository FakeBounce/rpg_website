import React from 'react';
import { widthLeft } from '../Utils/StyleConstants';
import ButtonLarge from '../Utils/ButtonLarge';

const styledChatButtonGMDiceActive = {
  height: 26,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0px',
};

const styledChatButtonGMDice = {
  height: 26,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0px',
};

const ChatGMButton = ({ func, isActive, children }) => {
  return (
    <ButtonLarge
      className={isActive ? 'buttonLargeActive' : 'buttonLarge'}
      style={isActive ? styledChatButtonGMDiceActive : styledChatButtonGMDice}
      onClick={func}
    >
      {children}
    </ButtonLarge>
  );
};

export default ChatGMButton;
