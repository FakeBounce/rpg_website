import React, { useState, useContext } from "react";

const ChatInputContext = React.createContext(undefined);

export const useChatInputContext = () => useContext(ChatInputContext);

function ChatInputProvider(props) {
  const [chatInput, setChatInput] = useState("");

  return (
    <ChatInputContext.Provider value={{ chatInput, setChatInput }}>
      {props.children}
    </ChatInputContext.Provider>
  );
}

export { ChatInputContext, ChatInputProvider };
