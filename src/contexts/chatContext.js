import React, { useState, useContext } from 'react';

const ChatContext = React.createContext(undefined);

export const useChatContext = () => useContext(ChatContext);

function ChatProvider(props) {
  const [chatInput, setChatInput] = useState('');
  const [activeChatTab, setActiveChatTab] = useState('All');
  const [gmCommands, setGmCommands] = useState(false);
  const [lastKey, setLastKey] = useState('');
  const [whispersTab, setWhispersTab] = useState({});
  const [bonus, setBonus] = useState(0);

  return (
    <ChatContext.Provider
      value={{
        chatInput,
        setChatInput,
        activeChatTab,
        setActiveChatTab,
        gmCommands,
        setGmCommands,
        lastKey,
        setLastKey,
        whispersTab,
        setWhispersTab,
        bonus,
        setBonus,
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
}

export { ChatContext, ChatProvider };
