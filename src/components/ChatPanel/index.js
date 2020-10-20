import React from "react";
import ReactTooltip from "react-tooltip";
import { heightHeader, heightLeft, widthLeft } from "../Utils/StyleConstants";
import { colors } from "../Utils/Constants";
import ChatBar from "./ChatBar";
import ChatGMButtons from "./ChatGMButtons";
import ChatHistory from "./ChatHistory";
import ChatTabsMenu from "./ChatTabsMenu";
import { useChatContext } from "../../contexts/chatContext";
import "./ChatPanel.css";

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
  const { activeChatTab } = useChatContext();
  return (
    <div style={styledChatPanel}>
      <ChatTabsMenu />
      <ChatHistory activeChatTab={activeChatTab} />
      <ChatBar />
      <ChatGMButtons />
      <ReactTooltip />
    </div>
  );
};

export default ChatPanel;
