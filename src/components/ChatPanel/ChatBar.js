import React from "react";
import { widthLeft } from "../Utils/StyleConstants";
import ChatUploader from "./ChatUploader";
import ChatInput from "./ChatInput";
import ChatSubmit from "./ChatSubmit";
import useChat from "../../hooks/useChat";

const styledChatBar = {
  width: widthLeft / 2,
  height: "30px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingTop: "5px",
};

const ChatBar = () => {
  const { talkInChat, onDrop, handleKeyPress } = useChat();

  return (
    <div style={styledChatBar}>
      <ChatUploader onDrop={onDrop} />
      <ChatInput handleKeyPress={handleKeyPress} />
      <ChatSubmit talkInChat={talkInChat} />
    </div>
  );
};

export default ChatBar;
