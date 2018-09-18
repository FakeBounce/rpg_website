import React, { Component } from "react";
import ChatCommand from "./ChatCommand";
import PropTypes from "prop-types";

const styledSignOut = {
    float: "right",
};

const styledBoxHeader = {
    width: "100%",
    height: "20px",
    marginBottom: "5px",
    textAlign: "center",
};

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
];

class ChatCommandsPanel extends Component {
    render() {
        const { signOut, accessChatHelp } = this.props;

        return (
            <div>
                <div style={styledBoxHeader}>Chat commands</div>
                <button style={styledSignOut} onClick={signOut}>
                    Sign Out
                </button>
                <button style={styledSignOut} onClick={accessChatHelp}>
                    Return to map
                </button>
                {chatCommands.map((chatCommand,index) => {
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

ChatCommandsPanel.propTypes = {
    signOut: PropTypes.func.isRequired,
    accessChatHelp: PropTypes.func.isRequired,
};

export default ChatCommandsPanel;
