import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import ChatRow from "./ChatRow";
import { connect } from "react-redux";

class ChatRows extends PureComponent {
  isAViewer = viewersTab => {
    const { pseudo, isGameMaster } = this.props;
    let canSeeMessage = false;

    viewersTab.map(viewer => {
      if (viewer === "gm" && isGameMaster) canSeeMessage = true;
      if (viewer === pseudo) canSeeMessage = true;
      return null;
    });
    return canSeeMessage;
  };

  render() {
    const { chatHistory } = this.props;

    return Object.keys(chatHistory).map(key => {
      if (
        chatHistory[key].viewers &&
        this.isAViewer(chatHistory[key].viewers)
      ) {
        return <ChatRow key={`chat-row-${key}`} {...chatHistory[key]} />;
      } else if (!chatHistory[key].viewers) {
        return <ChatRow key={`chat-row-${key}`} {...chatHistory[key]} />;
      }
      return null;
    });
  }
}

const mapStateToProps = store => ({
  isGameMaster: store.appState.isGameMaster,
  pseudo: store.userInfos.pseudo,
});

ChatRows.propTypes = {
  chatHistory: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(ChatRows);
