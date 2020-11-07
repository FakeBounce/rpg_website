import React from 'react';
import { widthLeft } from '../Utils/StyleConstants';
import ChatGMButton from './ChatGMButton';
import useChat from '../../hooks/useChat';
import { useChatContext } from '../../contexts/chatContext';
import { GiGoldBar, GiDiceTwentyFacesTwenty } from 'react-icons/gi';

const styledChatButtons = {
  maxWidth: widthLeft,
  height: 26,
  display: 'flex',
  padding: '0px',
};

// const onChangeTab = tab => {
//   setPanelState({
//     ...panelState,
//     infoTab: tab,
//   });
// };

const ChatGMButtons = ({ onChangeTab, infoTab }) => {
  const { toggleGMCommands, sendGMGold } = useChat();
  const { gmCommands } = useChatContext();

  return (
    <div style={styledChatButtons}>
      <ChatGMButton
        icon={'Dice to GM'}
        func={toggleGMCommands}
        isActive={gmCommands}
      >
        <GiDiceTwentyFacesTwenty />
      </ChatGMButton>
      <ChatGMButton func={sendGMGold}>
        <GiGoldBar />
      </ChatGMButton>
    </div>
  );
};

// ChatGMButtons.propTypes = {
//   onChangeTab: PropTypes.func.isRequired,
//   infoTab: PropTypes.string.isRequired,
// };

export default ChatGMButtons;
