import React, { Component } from 'react';
import ChatCommand from './ChatCommand';

const chatCommands = [
    {
        name: '/dX, /diceX',
        action: 'Launch dice X, returning random number between 1 and X',
    },
    {
        name: '/gmdX, /gmdiceX',
        action:
            'Launch dice X, returning random number between 1 and X. Only GM and you can see it.',
    },
    {
        name: '/strength, /str, /force, /for...',
        action:
            'Launch dice 100 corresponding to attribute. Says if succeeded or failed.',
    },
    {
        name: '/w Player Message',
        action: 'Send Message to Player only.',
    },
    {
        name: '/gmw Message',
        action: 'Send Message to GM only.',
    },
    {
        name: '/tmw Message',
        action: "Send Message to team only (GM can't see it).",
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
