import React, { Component } from "react";

import Quest from "./Quest";
import PropTypes from "prop-types";
import { widthLeft, heightLeft } from "../Utils/StyleConstants";
import QuestFullscreen from "./QuestFullscreen";

const styledBoxHeader = {
  width: "100%",
  height: "20px",
  marginBottom: "5px",
  textAlign: "center",
};

const styledMapSide = {
  border: "1px solid brown",
  width: `${widthLeft / 2 - 11}px`,
  height: `${heightLeft / 2 - 1}px`,
  display: "inline-block",
  float: "left",
  textAlign: "left",
  position: "relative",
};

class QuestPanel extends Component {
  positionList = [];

  // For GM quest positionning
  getPosition = () => {
    let hasPosition = false;
    const i = Math.floor(Math.random() * 8);
    if (this.positionList.indexOf(i) === -1) {
      const newPositionList = this.positionList;
      hasPosition = true;
      newPositionList.push(i);
      this.positionList = newPositionList;
    }
    if (hasPosition || this.positionList.length === 8)
      return this.positionList[this.positionList.length - 1];

    return this.getPosition();
  };

  showQuest = index => {
    this.props.doSetState({
      isQuestShowed: true,
      currentQuest: index,
    });
  };

  hideQuest = () => {
    this.props.doSetState({
      isQuestShowed: false,
      currentQuest: -1,
    });
  };

  render() {
    const { quests, questsList, currentQuest, isQuestShowed } = this.props;

    if (isQuestShowed) {
      return (
        <div
          style={{
            ...styledMapSide,
            backgroundImage: `url(./quests/quest_panel.jpg)`,
            backgroundSize: "cover",
          }}
        >
          <QuestFullscreen
            {...quests[currentQuest]}
            hideQuest={this.hideQuest}
          />
        </div>
      );
    }
    return (
      <div
        style={{
          ...styledMapSide,
          backgroundImage: `url(./quests/quest_panel.jpg)`,
          backgroundSize: "cover",
        }}
      >
        <div style={styledBoxHeader}>Liste des quêtes</div>
        {questsList.map(q => {
          if (!quests[q].validated) {
            return (
              <Quest
                key={`merchant-${quests[q].name}`}
                {...quests[q]}
                index={q}
                showQuest={this.showQuest}
              />
            );
          }
          return null;
        })}
      </div>
    );
  }
}

QuestPanel.propTypes = {
  isQuestShowed: PropTypes.bool.isRequired,
  currentQuest: PropTypes.number.isRequired,
  quests: PropTypes.array.isRequired,
  questsList: PropTypes.array.isRequired,
  doSetState: PropTypes.func.isRequired,
};

export default QuestPanel;
