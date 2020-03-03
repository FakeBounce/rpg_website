import React, { PureComponent } from "react";
import { heightLeft, widthLeft } from "../Utils/StyleConstants";
import ChatRow from "./ChatRow";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { colors } from "../Utils/Constants";

const styledChatHistoric = {
  width: widthLeft / 2,
  height: `${heightLeft / 2 - (25 + 5) - 25}px`,
  float: "left",
  display: "inline-block",
  overflowY: "auto",
};

class ChatHistory extends PureComponent {
  messagesEnd = null;

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate(prevProps, prevState) {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  isAViewer = viewersTab => {
    const { pseudo, isGameMaster, activeChatTab } = this.props;
    let canSeeMessage = false;
    let isFiltered = false;

    viewersTab.map(viewer => {
      if ((viewer === "gm" && isGameMaster) || viewer === pseudo) {
        canSeeMessage = true;
      }
      switch (activeChatTab) {
        case "All":
          isFiltered = true;
          break;
        case "Team":
          if (!isGameMaster) {
            isFiltered = true;
          }
          break;
        case "GM":
          if (isGameMaster || viewer === "gm") {
            isFiltered = true;
          }
          break;
        case `${viewer}`:
          isFiltered = true;
          break;

        default:
          break;
      }
      return null;
    });
    return canSeeMessage && isFiltered;
  };

  getChatColor = () => {
    const { activeChatTab } = this.props;
    let color;
    switch (activeChatTab) {
      case "All":
        color = colors.chatAll;
        break;
      case "Team":
        color = colors.chatTeam;
        break;
      case "GM":
        color = colors.chatGM;
        break;
      default:
        color = colors.chatWhisper;
        break;
    }
    return color;
  };

  render() {
    const { history } = this.props;

    return (
      <div style={styledChatHistoric} className="scrollbar">
        {Object.keys(history).map(key => {
          console.log("history[key]", history[key]);
          if (history[key].viewers && this.isAViewer(history[key].viewers)) {
            return (
              <ChatRow
                key={`chat-row-${key}`}
                {...history[key]}
                color={this.getChatColor()}
              />
            );
          } else if (!history[key].viewers) {
            return (
              <ChatRow
                key={`chat-row-${key}`}
                {...history[key]}
                color={this.getChatColor()}
              />
            );
          }
          return null;
        })}
        <div
          style={{ float: "left", clear: "both" }}
          ref={el => {
            this.messagesEnd = el;
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  isGameMaster: store.appState.isGameMaster,
  pseudo: store.userInfos.pseudo,
  history: store.chat.history,
});

ChatHistory.propTypes = {
  activeChatTab: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(ChatHistory);
