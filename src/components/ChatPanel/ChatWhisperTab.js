import React from "react";
import { cursorPointer } from "../Utils/StyleConstants";
import { colors } from "../Utils/Constants";
import { Menu, Button, Icon } from "semantic-ui-react";
import useChat from "../../hooks/useChat";

const styledChatMenuItem = {
  maxWidth: 80,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 0,
  backgroundColor: colors.background,
  color: colors.text,
  cursor: cursorPointer,
};

const styledChatMenuItemContainer = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const styledChatMenuItemNotif = {
  color: colors.text,
  backgroundColor: colors.red300,
  padding: 2,
  fontSize: 10,
  borderRadius: 50,
  width: 15,
  height: 15,
  cursor: cursorPointer,
};
const styledChatMenuItemClose = {
  position: "absolute",
  top: -2,
  left: -5,
  maxWidth: 14,
  maxHeight: 14,
  padding: 0,
  margin: 0,
  cursor: cursorPointer,
  display: "flex",
};

const ChatWhisperTab = ({ whisperKey }) => {
  const {
    activeChatTab,
    whispersTab,
    changeActiveWhisperTab,
    closeWhisperTab,
  } = useChat();

  if (!whisperKey || !whispersTab[whisperKey]) {
    return null;
  }
  return (
    <Menu.Item
      name={whisperKey}
      active={activeChatTab === whisperKey}
      style={styledChatMenuItem}
    >
      <div
        onClick={changeActiveWhisperTab(whisperKey)}
        style={styledChatMenuItemContainer}
      >
        {whispersTab[whisperKey] && whispersTab[whisperKey].message > 0 && (
          <Button circular style={styledChatMenuItemNotif}>
            {whispersTab[whisperKey].message}
          </Button>
        )}
        {whisperKey}
      </div>
      <Button
        circular
        style={styledChatMenuItemClose}
        onClick={closeWhisperTab(whisperKey)}
      >
        <Icon
          circular
          size={"tiny"}
          name={"close"}
          color={"black"}
          style={{ margin: 0 }}
        />
      </Button>
    </Menu.Item>
  );
};

export default ChatWhisperTab;
