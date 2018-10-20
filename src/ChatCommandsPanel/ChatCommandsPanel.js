import React, { Component } from "react";
import ChatCommand from "./ChatCommand";

const chatCommands = [
  {
    name: "/dX, /diceX",
    action: "Launch dice X, returning random number between 1 and X",
  },
  {
    name: "/gmdX, /gmdiceX",
    action:
      "Launch dice X, returning random number between 1 and X. Only GM and you can see it.",
  },
  {
    name: "/strength, /str, /force, /for...",
    action:
      "Launch dice 100 corresponding to attribute. Says if succeeded or failed.",
  },
  {
    name: "/w Player Message",
    action: "Send Message to Player only.",
  },
  {
    name: "/gmw Message",
    action: "Send Message to GM only.",
  },
  {
    name: "/tmw Message",
    action: "Send Message to team only (GM can't see it).",
  },
  {
    name: "/gold Player X",
    action: "Send Gold to Player only.",
  },
  {
    name: "/goldgm X",
    action: "Send X Gold to GM only.",
  },
  {
    name: "/goldtm X",
    action: "Send X Gold to team.",
  },
];

class ChatCommandsPanel extends Component {
  render() {
    return (
      <div>
        {chatCommands.map((chatCommand, index) => {
          return (
            <ChatCommand
              key={`chat-command-${index}`}
              name={chatCommand.name}
              action={chatCommand.action}
            />
          );
        })}
      </div>
    );
  }
}

export default ChatCommandsPanel;
