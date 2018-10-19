import React, { Component } from "react";
import { heightLeft, widthLeft } from "./Utils/StyleConstants";

import PropTypes from "prop-types";
import firebase from "firebase";
import MerchantList from "./MerchantList";
import QuestList from "./QuestList";

const styledBoxHeader = {
  width: "100%",
  height: "20px",
  marginBottom: "5px",
  textAlign: "center",
  float: "left",
  display: "inline-block",
  position: "relative",
};

const styledMapSide = {
  border: "1px solid brown",
  width: `${widthLeft / 2 - 3}px`,
  height: `${heightLeft / 2 - 1}px`,
  display: "inline-block",
  float: "left",
  textAlign: "left",
  position: "relative",
};

class StoryQuestsAndMerchantsPanel extends Component {
  addQuestToTown = i => {
    const {
      currentStory,
      currentTown,
      towns,
      quests,
      triggerError,
    } = this.props;
    if (!quests[i].validated) {
      const newTown = { ...towns[currentTown] };
      newTown.questsList
        ? newTown.questsList.push(i)
        : (newTown.questsList = [i]);
      firebase
        .database()
        .ref("stories/" + currentStory + "/towns/" + currentTown)
        .set(newTown)
        .catch(error => {
          // Handle Errors here.
          triggerError(error);
        });

      const newQuest = { ...quests[i] };
      newQuest.town = currentTown;
      firebase
        .database()
        .ref("stories/" + currentStory + "/quests/" + i)
        .set(newQuest)
        .catch(error => {
          // Handle Errors here.
          triggerError(error);
        });
    }
  };

  addMerchantToTown = i => {
    const { currentStory, currentTown, towns, merchants } = this.props;
    const newTown = { ...towns[currentTown] };
    newTown.merchantsList
      ? newTown.merchantsList.push(i)
      : (newTown.merchantsList = [i]);
    firebase
      .database()
      .ref("stories/" + currentStory + "/towns/" + currentTown)
      .set(newTown)
      .catch(error => {
        // Handle Errors here.
        this.props.triggerError(error);
      });

    const newMerchant = { ...merchants[i] };
    newMerchant.town = currentTown;
    newMerchant.isDiscovered = false;
    firebase
      .database()
      .ref("stories/" + currentStory + "/merchants/" + i)
      .set(newMerchant)
      .catch(error => {
        // Handle Errors here.
        this.props.triggerError(error);
      });
  };

  render() {
    const { towns, quests, merchants, isOnQuest } = this.props;
    return (
      <div style={styledMapSide}>
        <div style={styledBoxHeader}>{isOnQuest ? "Quests" : "Merchants"}</div>
        {isOnQuest ? (
          <QuestList
            addQuestToTown={this.addQuestToTown}
            towns={towns}
            quests={quests}
          />
        ) : (
          <MerchantList
            addMerchantToTown={this.addMerchantToTown}
            towns={towns}
            merchants={merchants}
          />
        )}
      </div>
    );
  }
}

StoryQuestsAndMerchantsPanel.propTypes = {
  triggerError: PropTypes.func.isRequired,
  currentTown: PropTypes.number.isRequired,
  currentStory: PropTypes.number.isRequired,
  towns: PropTypes.array.isRequired,
  quests: PropTypes.array.isRequired,
  merchants: PropTypes.array.isRequired,
  isOnQuest: PropTypes.bool.isRequired,
};

export default StoryQuestsAndMerchantsPanel;
