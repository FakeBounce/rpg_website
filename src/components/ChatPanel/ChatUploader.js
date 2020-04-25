import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { cursorPointer } from "../Utils/StyleConstants";
import FileUploader from "../CharacterCreation/FileUploader";

const styledChatImageContainer = {
  width: 20,
  height: 20,
};

const styledFileUploaderButton = {
  width: 20,
  padding: 0,
  margin: 0,
  border: "2px solid #3f4257",
  cursor: cursorPointer,
};

const styledFileUploader = { padding: 0, margin: 0, display: "block" };

class ChatUploader extends PureComponent {
  render() {
    const { onDrop } = this.props;

    return (
      <div style={styledChatImageContainer}>
        <FileUploader
          onDrop={onDrop}
          buttonText="+"
          fileContainerStyle={styledFileUploader}
          buttonStyles={styledFileUploaderButton}
          withIcon={false}
          label=""
          noLabel
        />
      </div>
    );
  }
}

ChatUploader.propTypes = {
  onDrop: PropTypes.func.isRequired,
};

export default ChatUploader;
