import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { heightLeft, widthLeft } from '../Utils/StyleConstants';
import ChatRows from './ChatRows';

const styledChatHistoric = {
  width: widthLeft / 2,
  height: `${heightLeft / 2 - (25 + 5) - 25}px`,
  float: 'left',
  display: 'inline-block',
  overflowY: 'auto',
};

class ChatHistory extends PureComponent {
  messagesEnd = null;

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate(prevProps, prevState) {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  };

  render() {
    const { chatHistory, gameMaster, pseudo } = this.props;

    return (
      <div style={styledChatHistoric} className="scrollbar">
        <ChatRows
          gameMaster={gameMaster}
          pseudo={pseudo}
          chatHistory={chatHistory}
        />
        <div
          style={{ float: 'left', clear: 'both' }}
          ref={el => {
            this.messagesEnd = el;
          }}
        />
      </div>
    );
  }
}

ChatHistory.propTypes = {
  gameMaster: PropTypes.string.isRequired,
  pseudo: PropTypes.string.isRequired,
  chatHistory: PropTypes.object.isRequired,
};

export default ChatHistory;