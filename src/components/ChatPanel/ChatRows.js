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
    const { history } = this.props;

    return Object.keys(history).map(key => {
      if (
        history[key].viewers &&
        this.isAViewer(history[key].viewers)
      ) {
        return <ChatRow key={`chat-row-${key}`} {...history[key]} />;
      } else if (!history[key].viewers) {
        return <ChatRow key={`chat-row-${key}`} {...history[key]} />;
      }
      return null;
    });
  }
}

const mapStateToProps = store => ({
  isGameMaster: store.appState.isGameMaster,
  pseudo: store.userInfos.pseudo,
  history: store.chat.history,
});

export default connect(mapStateToProps)(ChatRows);
