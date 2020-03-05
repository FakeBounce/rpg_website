import React from "react";
import { colors } from "../Utils/Constants";
import useChat from "../../hooks/useChat";

const styledChatButtonGMActive = {
  width: 40,
  height: 26,
  float: "right",
  display: "inline-block",
  textAlign: "center",
  padding: "0px",
  backgroundColor: colors.purple400,
  color: colors.text,
};

const styledChatButtonGM = {
  width: 40,
  height: 26,
  float: "right",
  display: "inline-block",
  textAlign: "center",
  padding: "0px",
};

const ChatGMButton = () => {
  const { gmCommands, toggleGMCommands } = useChat();

  return (
    <button
      style={gmCommands ? styledChatButtonGMActive : styledChatButtonGM}
      onClick={toggleGMCommands}
    >
      GM
    </button>
  );
};

export default ChatGMButton;
