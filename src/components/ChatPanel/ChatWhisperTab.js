import React from 'react';
import { cursorPointer } from '../Utils/StyleConstants';
import { colors } from '../Utils/Constants';
import { Menu, Button, Icon } from 'semantic-ui-react';
import useChat from '../../hooks/useChat';
import { useChatContext } from '../../contexts/chatContext';

const styledChatMenuItem = {
  maxWidth: 80,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 0,
  color: colors.text,
  cursor: cursorPointer,
  backgroundImage: 'url("/backgrounds/ChatTab_BG.jpg")',
};

const styledChatMenuItemContainer = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const styledChatMenuItemClose = {
  position: 'absolute',
  top: -2,
  left: -5,
  maxWidth: 14,
  maxHeight: 14,
  padding: 0,
  margin: 0,
  cursor: cursorPointer,
  display: 'flex',
};

const ChatWhisperTab = ({ whisperKey }) => {
  const { changeActiveWhisperTab, closeWhisperTab } = useChat();
  const { activeChatTab, whispersTab } = useChatContext();

  if (!whisperKey || !whispersTab[whisperKey]) {
    return null;
  }

  return (
    <Menu.Item
      name={whisperKey}
      active={activeChatTab === whisperKey}
      style={styledChatMenuItem}
      className={
        whispersTab[whisperKey] && whispersTab[whisperKey].message > 0
          ? 'backgroundNotif'
          : 'background'
      }
      onClick={changeActiveWhisperTab(whisperKey)}
    >
      <div style={styledChatMenuItemContainer}>{whisperKey}</div>
      <Button
        circular
        style={styledChatMenuItemClose}
        onClick={closeWhisperTab(whisperKey)}
      >
        <Icon
          circular
          size={'tiny'}
          name={'close'}
          color={'black'}
          style={{ margin: 0 }}
        />
      </Button>
    </Menu.Item>
  );
};

export default ChatWhisperTab;
