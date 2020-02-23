import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { widthLeft } from "../Utils/StyleConstants";
import ChatUploader from "./ChatUploader";
import ChatInput from "./ChatInput";
import ChatSubmit from "./ChatSubmit";

const styledChatBar = {
  width: widthLeft / 2,
  height: "20px",
  float: "left",
  display: "inline-block",
  marginTop: "5px",
};

class ChatBar extends PureComponent {
  render() {
    const { talkInChat, onDrop, handleKeyPress } = this.props;

    return (
      <div style={styledChatBar}>
        <ChatUploader onDrop={onDrop} />
        <ChatInput handleKeyPress={handleKeyPress} />
        <ChatSubmit talkInChat={talkInChat} />
      </div>
    );
  }
}

ChatBar.propTypes = {
  talkInChat: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  handleKeyPress: PropTypes.func.isRequired,
};

export default ChatBar;
