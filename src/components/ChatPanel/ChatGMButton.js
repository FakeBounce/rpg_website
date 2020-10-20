import React from 'react';
import PropTypes from 'prop-types';
import useChat from '../../hooks/useChat';
import { widthLeft } from "../Utils/StyleConstants";
import ButtonLarge from '../Utils/ButtonLarge';
import { useChatContext } from '../../contexts/chatContext';

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

const ChatGMButton = ({ onChangeTab, nameToChange, isActive }) => {
  
  const getButtonName = () => {
    switch (nameToChange) {
      case 'Whisper':
        return "Whisper to GM";
      case 'Gold':
        return "Gold to GM";
      case 'Dice':
        return "Dice to GM";
      default:
        return "Button alone wtf ?";
    }
  };

  const { toggleGMCommands } = useChat();
  const { gmCommands } = useChatContext();

  return (
    <ButtonLarge
      className={isActive ? 'buttonLargeActive' : 'buttonLarge'}
      onClick={() => onChangeTab(nameToChange)}
      style={gmCommands ? styledChatButtonGMActive : styledChatButtonGM}
    >
      {getButtonName()}
    </ButtonLarge>
  );
};

ChatGMButton.propTypes = {
  onChangeTab: PropTypes.func.isRequired,
  tabToChange: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default ChatGMButton;
