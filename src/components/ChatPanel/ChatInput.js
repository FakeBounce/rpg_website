import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { widthLeft } from '../Utils/StyleConstants';

const styledChatInput = {
  width: widthLeft / 2 - 51,
  height: '20px',
  float: 'left',
  display: 'inline-block',
  marginLeft: 20,
};

class ChatInput extends PureComponent {
  chatInputRef = null;

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.chatInput !== this.props.chatInput) {
      this.chatInputRef.focus();
    }
  }

  render() {
    const { chatInput, onChange, handleKeyPress } = this.props;

    return (
      <input
        type="text"
        name="chatInput"
        placeholder="Chat !"
        value={chatInput}
        onChange={e => {
          onChange(e.target.name, e.target.value);
        }}
        style={styledChatInput}
        onKeyPress={handleKeyPress}
        ref={input => {
          this.chatInputRef = input;
        }}
      />
    );
  }
}

ChatInput.propTypes = {
  chatInput: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  handleKeyPress: PropTypes.func.isRequired,
};

export default ChatInput;
