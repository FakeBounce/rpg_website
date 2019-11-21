import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { chatDices } from '../Utils/Constants';
import ChatDice from './ChatDice';

class ChatDices extends PureComponent {
  render() {
    const { launchCommand } = this.props;

    return chatDices.map(d => {
      return <ChatDice key={d.tip} launchCommand={launchCommand} {...d} />;
    });
  }
}

ChatDices.propTypes = {
  launchCommand: PropTypes.func.isRequired,
};

export default ChatDices;
