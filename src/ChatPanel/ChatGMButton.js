import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const styledChatButtonGMActive = {
  width: 40,
  height: 26,
  float: 'right',
  display: 'inline-block',
  textAlign: 'center',
  padding: '0px',
  backgroundColor: 'purple',
  color: 'white',
};

const styledChatButtonGM = {
  width: 40,
  height: 26,
  float: 'right',
  display: 'inline-block',
  textAlign: 'center',
  padding: '0px',
};

class ChatGMButton extends PureComponent {
  render() {
    const { gmCommands, toggleGMCommands } = this.props;

    return (
      <button
        style={gmCommands ? styledChatButtonGMActive : styledChatButtonGM}
        onClick={toggleGMCommands}
      >
        GM
      </button>
    );
  }
}

ChatGMButton.propTypes = {
  gmCommands: PropTypes.bool.isRequired,
  toggleGMCommands: PropTypes.func.isRequired,
};

export default ChatGMButton;
