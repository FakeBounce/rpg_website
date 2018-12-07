import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { heightLeft } from "../Utils/StyleConstants";

const styles = {
  ChatRow: {
    width: '100%',
    float: 'left',
    display: 'inline-block',
    textAlign: 'left',
  },
  ChatImage: {
    maxHeight: `${heightLeft / 2 - (25 + 5) - 25}px`,
    float: 'left',
    display: 'inline-block',
    textAlign: 'left',
  },
};

class ChatRow extends Component {
  render() {
    const { pseudo, message, image, imagePath } = this.props;

    return (
      <div style={styles.ChatRow}>
        {pseudo ? `@${pseudo}: ${message}` : message}
        {image && <img src={image} alt="Chat image" style={styles.ChatImage} />}
      </div>
    );
  }
}

ChatRow.defaultProps = {
  image: null,
  imagePath: null,
};

ChatRow.propTypes = {
  pseudo: PropTypes.string,
  imagePath: PropTypes.string,
  image: PropTypes.string,
  message: PropTypes.string.isRequired,
};

export default ChatRow;
