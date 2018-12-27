import React, { Component } from 'react';
import ChatCommand from './ChatCommand';
import { chatCommands, colors } from '../Utils/Constants';
import { heightLeft } from '../Utils/StyleConstants';

const styledCommandsContainer = {
  height: heightLeft,
  width: '100%',
  position: 'relative',
  backgroundColor: colors.background,
  color: colors.text,
  overflowY: 'auto',
};

class ChatCommandsPanel extends Component {
  render() {
    return (
      <div style={styledCommandsContainer}>
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
