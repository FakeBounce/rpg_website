import React, { useState, useContext } from "react";

const ActiveChatTabContext = React.createContext(undefined);

export const useActiveChatTabContext = () => useContext(ActiveChatTabContext);

function ActiveChatTabProvider(props) {
  const [activeChatTab, setActiveChatTab] = useState("All");

  return (
    <ActiveChatTabContext.Provider value={{ activeChatTab, setActiveChatTab }}>
      {props.children}
    </ActiveChatTabContext.Provider>
  );
}

export { ActiveChatTabContext, ActiveChatTabProvider };
