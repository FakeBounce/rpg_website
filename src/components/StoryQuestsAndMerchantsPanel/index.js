import React, { Component } from "react";
import { heightLeft, widthLeft } from "../Utils/StyleConstants";

import PropTypes from "prop-types";
import firebase from "firebase";
import StoryMerchantList from "./StoryMerchantList";
import StoryQuestList from "./StoryQuestList";
import { colors } from "../Utils/Constants";
import { connect } from "react-redux";

const styledBoxHeader = {
  width: "100%",
  height: 20,
  textAlign: "center",
  float: "left",
  display: "inline-block",
  position: "relative",
  borderBottom: "1px solid white",
  backgroundColor: colors.background,
  color: "white",
};

const styledMapSide = {
  width: `${widthLeft / 2}px`,
  height: `${heightLeft / 2}px`,
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
    const {
      currentStory,
      currentTown,
      towns,
      merchants,
      triggerError,
    } = this.props;
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
        triggerError(error);
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
        triggerError(error);
      });
  };

  render() {
    const { isOnQuest } = this.props;
    return (
      <div style={styledMapSide}>
        <div style={styledBoxHeader}>{isOnQuest ? "Quests" : "Merchants"}</div>
        {isOnQuest ? (
          <StoryQuestList addQuestToTown={this.addQuestToTown} />
        ) : (
          <StoryMerchantList addMerchantToTown={this.addMerchantToTown} />
        )}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  currentStory: store.appState.currentStory,
  currentTown: store.mapInfos.currentTown,
  towns: store.mapInfos.towns,
  quests: store.mapInfos.quests,
  merchants: store.mapInfos.merchants,
});

StoryQuestsAndMerchantsPanel.propTypes = {
  triggerError: PropTypes.func.isRequired,
  isOnQuest: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(StoryQuestsAndMerchantsPanel);