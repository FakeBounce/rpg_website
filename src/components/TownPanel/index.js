import React, { Component } from 'react';
import { heightLeft, widthLeft } from '../Utils/StyleConstants';

import PropTypes from 'prop-types';
import firebase from 'firebase';
import TownMerchants from './TownMerchants';
import TownQuests from './TownQuests';
import { colors } from '../Utils/Constants';
import { useSelector, useDispatch } from 'react-redux';

const styledBoxHeader = {
  width: '100%',
  height: 20,
  paddingBottom: 5,
  textAlign: 'center',
  float: 'left',
  display: 'inline-block',
  position: 'relative',
  backgroundColor: colors.background,
  color: 'white',
};
const styledMapSide = {
  width: `${widthLeft / 2}px`,
  height: `${heightLeft / 2}px`,
  display: 'inline-block',
  float: 'left',
  textAlign: 'left',
  position: 'relative',
};

// @TODO check for currentTown
const TownPanel = ({ toggleRightPanel }) => {
  const dispatch = useDispatch();
  const { currentStory, towns, quests, merchants } = useSelector(store => ({
    currentTown: store.mapInfos.currentTown,
    currentStory: store.appState.currentStory,
    towns: store.mapInfos.towns,
    quests: store.mapInfos.quests,
    merchants: store.mapInfos.merchants,
  }));

  const dispatchCallPrintError = payload => {
    dispatch({ type: CALL_PRINT_ERROR, payload });
  };

  const toggleMerchantDiscover = i => {
    const newMerchant = { ...merchants[i] };
    newMerchant.isDiscovered = !newMerchant.isDiscovered;
    firebase
      .database()
      .ref('stories/' + currentStory + '/merchants/' + i)
      .set(newMerchant)
      .catch(error => {
        // Handle Errors here.
        dispatchCallPrintError(error);
      });
  };

  const validateQuest = i => {
    const newQuest = { ...quests[i] };
    newQuest.validated = !newQuest.validated;
    firebase
      .database()
      .ref('stories/' + currentStory + '/quests/' + i)
      .set(newQuest)
      .catch(error => {
        // Handle Errors here.
        dispatchCallPrintError(error);
      });
  };

  const removeQuestFromTown = i => {
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
        .ref('stories/' + currentStory + '/towns/' + currentTown)
        .set(newTown)
        .catch(error => {
          // Handle Errors here.
          dispatchCallPrintError(error);
        });

      const newQuest = { ...quests[i] };
      newQuest.town = null;
      firebase
        .database()
        .ref('stories/' + currentStory + '/quests/' + i)
        .set(newQuest)
        .catch(error => {
          // Handle Errors here.
          dispatchCallPrintError(error);
        });
    }
  };

  const removeMerchantFromTown = i => {
    const newTown = { ...towns[currentTown] };
    newTown.merchantsList.map((ql, index) => {
      if (ql === i) {
        newTown.merchantsList.splice(index, 1);
      }
      return null;
    });

    firebase
      .database()
      .ref('stories/' + currentStory + '/towns/' + currentTown)
      .set(newTown)
      .catch(error => {
        // Handle Errors here.
        dispatchCallPrintError(error);
      });

    const newMerchant = { ...merchants[i] };
    newMerchant.town = null;
    firebase
      .database()
      .ref('stories/' + currentStory + '/merchants/' + i)
      .set(newMerchant)
      .catch(error => {
        // Handle Errors here.
        dispatchCallPrintError(error);
      });
  };

  return (
    <div style={styledMapSide}>
      <div style={styledBoxHeader}>{towns[currentTown].name}</div>
      <TownQuests
        toggleRightPanel={toggleRightPanel}
        removeQuestFromTown={removeQuestFromTown}
        validateQuest={validateQuest}
      />
      <TownMerchants
        toggleRightPanel={toggleRightPanel}
        toggleMerchantDiscover={toggleMerchantDiscover}
        removeMerchantFromTown={removeMerchantFromTown}
      />
    </div>
  );
};

TownPanel.propTypes = {
  toggleRightPanel: PropTypes.func.isRequired,
};

export default TownPanel;
