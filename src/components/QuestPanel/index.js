import React, { PureComponent } from "react";

import Quest from "./Quest";
import PropTypes from "prop-types";
import { widthLeft, heightLeft } from "../Utils/StyleConstants";
import QuestFullscreen from "./QuestFullscreen";
import { connect } from "react-redux";
import { hideQuest, showQuest } from "../../redux/actions/actionsMapInfos";

const styledMapSide = {
  width: `${widthLeft / 2}px`,
  height: `${heightLeft / 2}px`,
  display: "inline-block",
  float: "left",
  textAlign: "left",
  position: "relative",
};

class QuestPanel extends PureComponent {
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
    const { dispatchShowQuest } = this.props;
    dispatchShowQuest(index);
  };

  hideQuest = () => {
    const { dispatchHideQuest } = this.props;
    dispatchHideQuest();
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
        {questsList.map((q, i) => {
          if (!quests[q].validated) {
            return (
              <Quest
                key={`merchant-${quests[q].name} -${i}`}
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

const mapDispatchToProps = dispatch => {
  return {
    dispatchShowQuest: payload => {
      dispatch(showQuest(payload));
    },
    dispatchHideQuest: () => {
      dispatch(hideQuest());
    },
  };
};

const mapStateToProps = store => ({
  currentQuest: store.mapInfos.currentQuest,
  isQuestShowed: store.mapInfos.isQuestShowed,
  quests: store.mapInfos.quests,
  questsList: store.mapInfos.townInfos.questsList,
});

QuestPanel.propTypes = {
  dispatchShowQuest: PropTypes.func.isRequired,
  dispatchHideQuest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestPanel);
