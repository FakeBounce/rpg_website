import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { cursorPointer } from '../Utils/StyleConstants';
import FileUploader from '../CharacterCreation/FileUploader';

const styledChatImageContainer = {
  width: 20,
  height: 25,
  position: 'absolute',
  bottom: 3,
  left: 0,
};

const styledFileUploaderButton = {
  width: 20,
  padding: 0,
  margin: 0,
  border: '1px solid #3f4257',
  cursor: cursorPointer,
};

const styledFileUploader = { padding: 0, margin: 0, display: 'block' };

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
        />
      </div>
    );
  }
}

ChatUploader.propTypes = {
  onDrop: PropTypes.func.isRequired,
};

export default ChatUploader;
