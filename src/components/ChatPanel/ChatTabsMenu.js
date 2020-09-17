import React from 'react';
import { cursorPointer } from '../Utils/StyleConstants';
import { chatTabs, colors } from '../Utils/Constants';
import { useSelector } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import useChat from '../../hooks/useChat';
import ChatWhisperTab from './ChatWhisperTab';

const styledChatMenuItem = {
  maxWidth: 80,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 0,
  backgroundColor: colors.background,
  color: colors.text,
  cursor: cursorPointer,
};

const ChatTabsMenu = () => {
  const { activeChatTab, changeActiveChatTab, whispersTab } = useChat();
  const { isGameMaster } = useSelector(store => ({
    isGameMaster: store.appState.isGameMaster,
  }));

  return (
    <Menu
      attached='top'
      tabular
      className='menuTabChatScrollbar'
      style={{ overflowX: 'auto', overflowY: 'hidden' }}
    >
      {chatTabs.map((ct, index) => {
        if (isGameMaster && ct === 'Team') return null;
        return (
          <Menu.Item
            key={`${ct}-${index}`}
            name={ct}
            active={activeChatTab === ct}
            onClick={changeActiveChatTab(ct)}
            style={styledChatMenuItem}
          />
        );
      })}
      {Object.keys(whispersTab).map((ctKey, index) => {
        return <ChatWhisperTab key={`${ctKey}-${index}`} whisperKey={ctKey} />;
      })}
    </Menu>
  );
};

export default ChatTabsMenu;
