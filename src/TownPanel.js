import React, { Component } from "react";
import { heightLeft, widthLeft } from "./Utils/StyleConstants";

import PropTypes from "prop-types";
import firebase from "firebase";
import TownMerchant from "./TownMerchant";
import TownQuest from "./TownQuest";
import TownMerchants from "./TownMerchants";
import TownQuests from "./TownQuests";

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

const styledSemiContainer = {
  width: "100%",
  height: `${heightLeft / 4 - 40}px`,
  display: "inline-block",
  float: "left",
  position: "relative",
  overflowY: "auto",
};

class TownPanel extends Component {
  toggleMerchantDiscover = i => {
    const { currentStory, merchants } = this.props;

    const newMerchant = { ...merchants[i] };
    newMerchant.isDiscovered = !newMerchant.isDiscovered;
    firebase
      .database()
      .ref("stories/" + currentStory + "/merchants/" + i)
      .set(newMerchant)
      .catch(error => {
        // Handle Errors here.
        this.props.triggerError(error);
      });
  };

  validateQuest = i => {
    const { currentStory, quests } = this.props;

    const newQuest = { ...quests[i] };
    newQuest.validated = !newQuest.validated;
    firebase
      .database()
      .ref("stories/" + currentStory + "/quests/" + i)
      .set(newQuest)
      .catch(error => {
        // Handle Errors here.
        this.props.triggerError(error);
      });
  };

  removeQuestFromTown = i => {
    const { currentStory, currentTown, towns, quests } = this.props;
    const newTown = { ...towns[currentTown] };
    if (!quests[i].validated) {
      newTown.questsList.map((ql, index) => {
        if (ql === i) {
          newTown.questsList.splice(index, 1);
        }
      });

      firebase
        .database()
        .ref("stories/" + currentStory + "/towns/" + currentTown)
        .set(newTown)
        .catch(error => {
          // Handle Errors here.
          this.props.triggerError(error);
        });

      const newQuest = { ...quests[i] };
      newQuest.town = null;
      firebase
        .database()
        .ref("stories/" + currentStory + "/quests/" + i)
        .set(newQuest)
        .catch(error => {
          // Handle Errors here.
          this.props.triggerError(error);
        });
    }
  };

  removeMerchantFromTown = i => {
    const { currentStory, currentTown, towns, merchants } = this.props;
    const newTown = { ...towns[currentTown] };
    newTown.merchantsList.map((ql, index) => {
      if (ql === i) {
        newTown.merchantsList.splice(index, 1);
      }
    });

    firebase
      .database()
      .ref("stories/" + currentStory + "/towns/" + currentTown)
      .set(newTown)
      .catch(error => {
        // Handle Errors here.
        this.props.triggerError(error);
      });

    const newMerchant = { ...merchants[i] };
    newMerchant.town = null;
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
    const {
      currentTown,
      towns,
      quests,
      merchants,
      toggleRightPanel,
    } = this.props;
    return (
      <div style={styledMapSide}>
        <div style={styledBoxHeader}>{towns[currentTown].name}</div>
        <TownQuests
          currentTown={currentTown}
          quests={quests}
          toggleRightPanel={toggleRightPanel}
          removeQuestFromTown={this.removeQuestFromTown}
          validateQuest={this.validateQuest}
        />
        <TownMerchants
          currentTown={currentTown}
          merchants={merchants}
          toggleRightPanel={toggleRightPanel}
          toggleMerchantDiscover={this.toggleMerchantDiscover}
          removeMerchantFromTown={this.removeMerchantFromTown}
        />
      </div>
    );
  }
}

TownPanel.propTypes = {
  currentTown: PropTypes.number.isRequired,
  towns: PropTypes.array.isRequired,
  quests: PropTypes.array.isRequired,
  merchants: PropTypes.array.isRequired,
  toggleRightPanel: PropTypes.func.isRequired,
  currentStory: PropTypes.number.isRequired,
};

export default TownPanel;
