import React from "react";
import PropTypes from "prop-types";
import { heightLeft } from "../Utils/StyleConstants";
import { useSelector } from "react-redux";

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

const ChatRow = props => {
  const {
    pseudo,
    message,
    image,
    characterName,
    color,
    channel,
    sender,
    receiver,
  } = props;
  const { userPseudo, isGameMaster } = useSelector(store => ({
    userPseudo: store.userInfos.pseudo,
    isGameMaster: store.appState.isGameMaster,
  }));

  const getDiceSuccess = diceStatus => {
    if (diceStatus.toLowerCase().indexOf("success") > -1) return true;

    return false;
  };

  const getMessage = () => {
    let hasDices = false;
    let finalMessage = message;
    if (message.split("Result : ").length > 1) {
      hasDices = true;
    }
    if (channel === "Private" && !hasDices) {
      if (sender === userPseudo || (isGameMaster && sender === "gm")) {
        finalMessage = `To @${receiver}: ${message}`;
      } else {
        finalMessage = `From @${sender === "gm" ? "GM" : sender}: ${message}`;
      }
    } else {
      if (characterName) {
        finalMessage = `@${characterName}: ${message}`;
      } else if (pseudo) {
        finalMessage = `@${pseudo}: ${message}`;
      }
    }

    if (hasDices) {
      const splittedResult = finalMessage.split("Result : ");
      const splittedStatus = splittedResult[1].split("(");
      const diceSuccess = getDiceSuccess(splittedResult[1]);
      return (
        <>
          {splittedResult[0]} Result :{" "}
          <span
            className={diceSuccess ? "dice-result-success" : "dice-result-fail"}
          >
            {splittedStatus[0]}
          </span>
          (
          <span
            className={diceSuccess ? "dice-status-success" : "dice-status-fail"}
          >
            {splittedStatus[1].substring(0, splittedStatus[1].length - 1)}
          </span>
          )
        </>
      );
    }
    return finalMessage;
  };

  return (
    <div style={{ ...styles.ChatRow, color }}>
      {getMessage()}
      {image && <img src={image} alt="Chat" style={styles.ChatImage} />}
    </div>
  );
};

ChatRow.defaultProps = {
  image: null,
  imagePath: null,
  characterName: null,
  pseudo: null,
  channel: null,
  sender: null,
  receiver: null,
};

ChatRow.propTypes = {
  color: PropTypes.string,
  characterName: PropTypes.string,
  pseudo: PropTypes.string,
  image: PropTypes.string,
  channel: PropTypes.string,
  sender: PropTypes.string,
  receiver: PropTypes.string,
  message: PropTypes.string.isRequired,
};

export default ChatRow;
