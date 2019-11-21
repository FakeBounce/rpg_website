import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { heightLeft } from "../Utils/StyleConstants";

const styles = {
  ChatRow: {
    width: "100%",
    float: "left",
    display: "inline-block",
    textAlign: "left",
  },
  ChatImage: {
    maxHeight: `${heightLeft / 2 - (25 + 5) - 25}px`,
    float: "left",
    display: "inline-block",
    textAlign: "left",
  },
};

class ChatRow extends PureComponent {
  render() {
    const { pseudo, message, image, characterName } = this.props;

    return (
      <div style={styles.ChatRow}>
        {characterName
          ? `@${characterName}: ${message}`
          : pseudo
            ? `@${pseudo}: ${message}`
            : message}
        {image && <img src={image} alt="Chat" style={styles.ChatImage} />}
      </div>
    );
  }
}

ChatRow.defaultProps = {
  image: null,
  imagePath: null,
  characterName: null,
};

ChatRow.propTypes = {
  characterName: PropTypes.string,
  pseudo: PropTypes.string,
  image: PropTypes.string,
  message: PropTypes.string.isRequired,
};

export default ChatRow;
