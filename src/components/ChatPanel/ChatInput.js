import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { widthLeft } from "../Utils/StyleConstants";
import { useChatInputContext } from "../../contexts/chatInputContext";

const styledChatInput = {
  width: widthLeft / 2 - 51,
  height: "20px",
  float: "left",
  display: "inline-block",
  marginLeft: 20,
};

const ChatInput = ({ handleKeyPress }) => {
  let chatInputRef = useRef(null);
  const { chatInput, setChatInput } = useChatInputContext();

  useEffect(() => {
    if (chatInput.trim() !== "" && chatInputRef !== null) {
      chatInputRef.current.focus();
    }
  }, [chatInput, chatInputRef]);

  return (
    <input
      type="text"
      name="chatInput"
      placeholder="Chat !"
      value={chatInput}
      onChange={e => {
        setChatInput(e.target.value);
      }}
      style={styledChatInput}
      onKeyPress={handleKeyPress}
      ref={chatInputRef}
    />
  );
};

ChatInput.propTypes = {
  handleKeyPress: PropTypes.func.isRequired,
};

export default ChatInput;
