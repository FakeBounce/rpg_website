import React, { PureComponent } from "react";
import { heightLeft, widthLeft } from "../Utils/StyleConstants";
import ChatRow from "./ChatRow";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { colors } from "../Utils/Constants";

const styledChatHistoric = {
  width: widthLeft / 2,
  height: `${heightLeft / 2 - (25 + 5) - 25 - 40}px`,
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
    const { pseudo, isGameMaster } = this.props;
    let canSeeMessage = false;
    let isFiltered = false;

    viewersTab.map(viewer => {
      if ((viewer === "gm" && isGameMaster) || viewer === pseudo) {
        canSeeMessage = true;
      }
      if (!this.isFiltered(viewer)) isFiltered = true;
      return null;
    });
    return canSeeMessage && isFiltered;
  };

  getChatColor = row => {
    let color = colors.chatAll;
    if (row.channel) {
      switch (row.channel) {
        case "Team":
          color = colors.chatTeam;
          break;
        case "Dices":
          color = colors.yellow300;
          break;
        case "Private":
          let hasGM = false;
          row.viewers.map(v => {
            if (v === "gm") hasGM = true;
            return null;
          });
          color = hasGM ? colors.chatGM : colors.pink300;
          break;
        default:
          color = colors.chatAll;
          break;
      }
    }
    return color;
  };

  isFiltered = row => {
    const { activeChatTab, isGameMaster, pseudo } = this.props;
    let isFiltered = true;
    switch (activeChatTab) {
      case "All":
        isFiltered = false;
        break;
      case "Team":
        if (row.channel === "Team" && !isGameMaster) {
          isFiltered = false;
        }
        break;
      case "GM":
        if (
          row.channel === "GM" &&
          (isGameMaster || (row.viewers && row.viewers.indexOf(pseudo) > -1))
        ) {
          isFiltered = false;
        }
        break;
      case "Dices":
        if (row.channel === "Dices") {
          isFiltered = false;
        }
        break;
      default:
        if (row.channel === "Private") {
          if (
            row.viewers &&
            row.viewers.indexOf(activeChatTab) > -1 &&
            (row.viewers.indexOf(pseudo) > -1 ||
              (isGameMaster && row.viewers.indexOf("gm") > -1))
          ) {
            isFiltered = false;
          }
        }
        break;
    }
    return isFiltered;
  };

  render() {
    const { history } = this.props;

    return (
      <div style={styledChatHistoric} className="scrollbar">
        {Object.keys(history).map(key => {
          if (!this.isFiltered(history[key])) {
            if (history[key].viewers && this.isAViewer(history[key].viewers)) {
              return (
                <ChatRow
                  key={`chat-row-${key}`}
                  {...history[key]}
                  color={this.getChatColor(history[key])}
                />
              );
            }
            return (
              <ChatRow
                key={`chat-row-${key}`}
                {...history[key]}
                color={this.getChatColor(history[key])}
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
