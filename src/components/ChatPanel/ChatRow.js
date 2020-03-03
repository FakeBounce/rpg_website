import React, { Component } from "react";
import PropTypes from "prop-types";
import { heightLeft } from "../Utils/StyleConstants";
import { connect } from "react-redux";

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

class ChatRow extends Component {
  render() {
    const { pseudo, message, image, characterName, color } = this.props;

    return (
      <div style={{ ...styles.ChatRow, color }}>
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

const mapStateToProps = store => ({
  pseudo: store.userInfos.pseudo,
});

ChatRow.defaultProps = {
  image: null,
  imagePath: null,
  characterName: null,
};

ChatRow.propTypes = {
  color: PropTypes.string,
  characterName: PropTypes.string,
  image: PropTypes.string,
  message: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(ChatRow);
