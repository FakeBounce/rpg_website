import React from "react";
import ReactTooltip from "react-tooltip";
import { heightHeader, heightLeft, widthLeft } from "../Utils/StyleConstants";
import { colors } from "../Utils/Constants";
import ChatBar from "./ChatBar";
import ChatDicesRow from "./ChatDicesRow";
import ChatHistory from "./ChatHistory";
import useChat from "../../hooks/useChat";
import ChatTabsMenu from "./ChatTabsMenu";

const styledChatPanel = {
  width: widthLeft / 2,
  position: "absolute",
  height: heightLeft / 2 + 4,
  top: heightLeft / 2 + heightHeader - 2,
  backgroundColor: colors.background,
  color: colors.text,
  fontSize: 15,
};

const ChatPanel = () => {
  const { activeChatTab } = useChat();
  return (
    <div style={styledChatPanel}>
      <ChatTabsMenu />
      <ChatHistory activeChatTab={activeChatTab} />
      <ChatDicesRow />
      <ChatBar />
      <ReactTooltip />
    </div>
  );
};

export default ChatPanel;
