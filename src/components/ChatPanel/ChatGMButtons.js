import React from 'react';
import PropTypes from 'prop-types';
import { widthLeft } from '../Utils/StyleConstants';
import ChatGMButton from './ChatGMButton';
import ChatGMDiceButton from './ChatGMDiceButton';
import ChatGMGoldButton from './ChatGMGoldButton';

const styledChatButtons = {
  width: widthLeft,
  height: 26,
  display: 'inline-block',
  padding: '0px',
};

// const onChangeTab = tab => {
//   setPanelState({
//     ...panelState,
//     infoTab: tab,
//   });
// };

const ChatGMButtons = ({ onChangeTab, infoTab }) => {
  return (
    <div style={styledChatButtons}>
      <ChatGMDiceButton />
      {/* <ChatGMButton
        onChangeTab={onChangeTab}
        nameToChange='Whisper'
        isActive={infoTab === 'Whisper'}
      /> */}
      <ChatGMDiceButton />
      <ChatGMGoldButton />
    </div>
  );
};

// ChatGMButtons.propTypes = {
//   onChangeTab: PropTypes.func.isRequired,
//   infoTab: PropTypes.string.isRequired,
// };

export default ChatGMButtons;
