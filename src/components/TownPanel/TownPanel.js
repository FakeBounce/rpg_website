import React, { Component } from "react";
import { heightLeft, widthLeft } from "../Utils/StyleConstants";

import PropTypes from "prop-types";
import firebase from "firebase";
import TownMerchants from "./TownMerchants";
import TownQuests from "./TownQuests";
import { colors } from "../Utils/Constants";
import { connect } from "react-redux";

const styledBoxHeader = {
  width: "100%",
  height: 20,
  paddingBottom: 5,
  textAlign: "center",
  float: "left",
  display: "inline-block",
  position: "relative",
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
        return null;
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
      return null;
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
          quests={quests}
          toggleRightPanel={toggleRightPanel}
          removeQuestFromTown={this.removeQuestFromTown}
          validateQuest={this.validateQuest}
        />
        <TownMerchants
          merchants={merchants}
          toggleRightPanel={toggleRightPanel}
          toggleMerchantDiscover={this.toggleMerchantDiscover}
          removeMerchantFromTown={this.removeMerchantFromTown}
        />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  currentStory: store.appState.currentStory,
});

TownPanel.propTypes = {
  towns: PropTypes.array.isRequired,
  quests: PropTypes.array.isRequired,
  merchants: PropTypes.array.isRequired,
  toggleRightPanel: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(TownPanel);
