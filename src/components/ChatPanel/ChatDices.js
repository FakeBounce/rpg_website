import React  from "react";
import { chatDices } from "../Utils/Constants";
import ChatDice from "./ChatDice";
import useChat from "../../hooks/useChat";

const ChatDices = () => {
  const { launchCommand } = useChat();

  return chatDices.map(d => {
    return <ChatDice key={d.tip} launchCommand={launchCommand} {...d} />;
  });
};

export default ChatDices;
