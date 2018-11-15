import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  heightCameras,
  heightHeader,
  heightLeft,
  widthRightPanel,
  mapWidth,
  widthLeft,
} from '../Utils/StyleConstants';
import firebase from 'firebase';
import EventModalActionHistory from './EventModalActionHistory';
import EventModalItem from './EventModalItem';
import EventModalGold from './EventModalGold';
import EventModalDescription from './EventModalDescription';
import EventModalViewers from './EventModalViewers';
import EventModalDebt from "./EventModalDebt";

const styledEventModal = {
  position: 'absolute',
  zIndex: 99,
  top: `${heightHeader / 2}px`,
  left: `${widthRightPanel / 2}px`,
  width: `${widthLeft + mapWidth}px`,
  height: `${heightHeader / 2 + heightCameras / 2 + heightLeft - 50}px`,
  backgroundColor: 'white',
  border: '2px solid brown',
  borderRadius: 40,
};

const styledEventTitle = {
  width: '100%',
  height: '40px',
  marginTop: 15,
  marginBottom: 15,
  textAlign: 'center',
  fontSize: 25,
  float: 'left',
  position: 'relative',
  display: 'inline-block',
};

class EventModal extends PureComponent {
  state = {
    numberWanted: 0,
  };

  resetCurrentEvent = () => {
    const { currentStory, triggerError } = this.props;
    firebase
      .database()
      .ref('stories/' + currentStory + '/currentEvent')
      .set(-1)
      .catch(error => {
        // Handle Errors here.
        triggerError(error);
      });
  };

  updateCurrentEvent = newEventHistory => {
    const { currentStory, triggerError } = this.props;
    firebase
      .database()
      .ref('stories/' + currentStory + '/events')
      .set(newEventHistory)
      .catch(error => {
        // Handle Errors here.
        triggerError(error);
      });
  };

  updateCharacterGold = goldWanted => {
    const { currentStory, uid, triggerError } = this.props;
    firebase
      .database()
      .ref('stories/' + currentStory + '/characters/' + uid + '/character/gold')
      .set(goldWanted)
      .catch(error => {
        // Handle Errors here.
        triggerError(error);
      });
  };

  addItem = (item, quantity) => {
    const { currentStory, uid, character, triggerError } = this.props;
    const newItemsTab = character.items ? [...character.items] : [];
    let hasAlready = false;
    if (character.items) {
      character.items.map((i, index) => {
        if (i.name === item.name) {
          hasAlready = true;
          newItemsTab[index].quantity =
            parseInt(newItemsTab[index].quantity, 10) + quantity;
        }
        return null;
      });
    }
    if (!hasAlready) {
      newItemsTab.push({ ...item, quantity });
    }
    firebase
      .database()
      .ref('stories/' + currentStory + '/characters/' + uid + '/character')
      .set({
        ...character,
        items: newItemsTab,
      })
      .catch(error => {
        // Handle Errors here.
        triggerError(error);
      });
  };

  takeAllItems = () => {
    const { currentEvent, eventHistory, pseudo } = this.props;
    if (currentEvent > -1 && eventHistory[currentEvent].isActive) {
      const newEvent = { ...eventHistory[currentEvent] };
      const quantityLeft = newEvent.quantityLeft;
      newEvent.quantityLeft = 0;
      if (newEvent.actionHistory && newEvent.actionHistory.length > 0) {
        newEvent.actionHistory.push(
          `@${pseudo} has taken all the items left (${quantityLeft}).`
        );
      } else {
        newEvent.actionHistory = [
          `@${pseudo} has taken all the items left (${quantityLeft}).`,
        ];
      }
      const newEventHistory = [...eventHistory];
      newEventHistory[currentEvent] = { ...newEvent };

      this.addItem(newEvent.item, quantityLeft);
      this.updateCurrentEvent(newEventHistory);
    }
  };

  takeXItem = () => {
    const { currentEvent, eventHistory, pseudo } = this.props;
    const { numberWanted } = this.state;
    if (currentEvent > -1 && eventHistory[currentEvent].isActive) {
      const newEvent = { ...eventHistory[currentEvent] };
      newEvent.quantityLeft = newEvent.quantityLeft - numberWanted;

      if (newEvent.quantityLeft > 0) {
        if (newEvent.actionHistory && newEvent.actionHistory.length > 0) {
          newEvent.actionHistory.push(
            `@${pseudo} has taken ${numberWanted} items. ${
              newEvent.quantityLeft
            } left)`
          );
        } else {
          newEvent.actionHistory = [
            `@${pseudo} has taken ${numberWanted} items. ${
              newEvent.quantityLeft
            } left)`,
          ];
        }
      } else {
        if (newEvent.actionHistory && newEvent.actionHistory.length > 0) {
          newEvent.actionHistory.push(
            `@${pseudo} has taken the last items (${numberWanted}).`
          );
        } else {
          newEvent.actionHistory = [
            `@${pseudo} has taken the last items (${numberWanted}).`,
          ];
        }
      }

      const newEventHistory = [...eventHistory];
      newEventHistory[currentEvent] = { ...newEvent };

      this.addItem(newEvent.item, numberWanted);
      this.updateCurrentEvent(newEventHistory);
    }
  };

  onlyOneItem = () => {
    const { currentEvent, eventHistory, pseudo } = this.props;
    if (currentEvent > -1 && eventHistory[currentEvent].isActive) {
      const newEvent = { ...eventHistory[currentEvent] };
      newEvent.quantityLeft = newEvent.quantityLeft - 1;

      if (newEvent.quantityLeft > 0) {
        if (newEvent.actionHistory && newEvent.actionHistory.length > 0) {
          newEvent.actionHistory.push(
            `@${pseudo} has taken only one item.(${newEvent.quantityLeft} left)`
          );
        } else {
          newEvent.actionHistory = [
            `@${pseudo} has taken only one item.(${
              newEvent.quantityLeft
            } left)`,
          ];
        }
      } else {
        if (newEvent.actionHistory && newEvent.actionHistory.length > 0) {
          newEvent.actionHistory.push(`@${pseudo} has taken the last item.`);
        } else {
          newEvent.actionHistory = [`@${pseudo} has taken the last item.`];
        }
      }

      const newEventHistory = [...eventHistory];
      newEventHistory[currentEvent] = { ...newEvent };

      this.addItem(newEvent.item, 1);
      this.updateCurrentEvent(newEventHistory);
    }
  };

  lastItem = () => {
    const { currentEvent, eventHistory, pseudo } = this.props;
    if (currentEvent > -1 && eventHistory[currentEvent].isActive) {
      const newEvent = { ...eventHistory[currentEvent] };
      newEvent.quantityLeft = 0;
      if (newEvent.actionHistory && newEvent.actionHistory.length > 0) {
        newEvent.actionHistory.push(`@${pseudo} has taken the last item.`);
      } else {
        newEvent.actionHistory = [`@${pseudo} has taken the last item.`];
      }
      const newEventHistory = [...eventHistory];
      newEventHistory[currentEvent] = { ...newEvent };

      this.addItem(newEvent.item, 1);
      this.updateCurrentEvent(newEventHistory);
    }
  };

  giveAllGold = () => {
    const { currentEvent, eventHistory, pseudo, character } = this.props;
    if (currentEvent > -1 && eventHistory[currentEvent].isActive) {
      const newEvent = { ...eventHistory[currentEvent] };
      const goldGiven = newEvent.gold - newEvent.goldLeft;

      if (parseInt(character.gold, 10) >= goldGiven) {
        newEvent.goldLeft = newEvent.gold;
        if (newEvent.actionHistory && newEvent.actionHistory.length > 0) {
          newEvent.actionHistory.push(
            `@${pseudo} has given all the gold (${goldGiven}). How generous !`
          );
        } else {
          newEvent.actionHistory = [
            `@${pseudo} has given all the gold (${goldGiven}). How generous !`,
          ];
        }
        const newEventHistory = [...eventHistory];
        newEventHistory[currentEvent] = { ...newEvent };

        this.updateCharacterGold(
          parseInt(character.gold, 10) - parseInt(goldGiven, 10)
        );
        this.updateCurrentEvent(newEventHistory);
      } else {
        newEvent.goldLeft = newEvent.goldLeft + parseInt(character.gold, 10);
        if (newEvent.actionHistory && newEvent.actionHistory.length > 0) {
          newEvent.actionHistory.push(
            `@${pseudo} has given all his money (${parseInt(
              character.gold,
              10
            )}). How generous !`
          );
        } else {
          newEvent.actionHistory = [
            `@${pseudo} has given all his money (${parseInt(
              character.gold,
              10
            )}). How generous !`,
          ];
        }
        const newEventHistory = [...eventHistory];
        newEventHistory[currentEvent] = { ...newEvent };

        this.updateCharacterGold(0);
        this.updateCurrentEvent(newEventHistory);
      }
    }
  };

  giveXGold = () => {
    const { currentEvent, eventHistory, pseudo, character } = this.props;
    const { numberWanted } = this.state;
    if (currentEvent > -1 && eventHistory[currentEvent].isActive) {
      if (
        numberWanted <
        eventHistory[currentEvent].gold - eventHistory[currentEvent].goldLeft
      ) {
        const newEvent = { ...eventHistory[currentEvent] };
        newEvent.goldLeft = newEvent.goldLeft + numberWanted;
        if (newEvent.actionHistory && newEvent.actionHistory.length > 0) {
          newEvent.actionHistory.push(
            `@${pseudo} has given ${numberWanted} gold.`
          );
        } else {
          newEvent.actionHistory = [
            `@${pseudo} has given ${numberWanted} gold.`,
          ];
        }
        const newEventHistory = [...eventHistory];
        newEventHistory[currentEvent] = { ...newEvent };

        this.updateCurrentEvent(newEventHistory);
        this.updateCharacterGold(
          parseInt(character.gold, 10) - parseInt(numberWanted, 10)
        );
      } else {
        this.giveAllGold();
      }
    }
  };

  giveEquivalentGold = () => {
    const {
      currentEvent,
      eventHistory,
      pseudo,
      storyCharacters,
      character,
    } = this.props;
    if (currentEvent > -1 && eventHistory[currentEvent].isActive) {
      const newEvent = { ...eventHistory[currentEvent] };
      let goldGiven = Math.floor(newEvent.gold / (storyCharacters.length - 1));
      if (newEvent.goldLeft + goldGiven > newEvent.gold) {
        goldGiven = newEvent.gold - newEvent.goldLeft;
      }
      newEvent.goldLeft = newEvent.goldLeft + goldGiven;
      if (newEvent.actionHistory && newEvent.actionHistory.length > 0) {
        newEvent.actionHistory.push(
          `@${pseudo} has given his part (${goldGiven}) of gold.`
        );
      } else {
        newEvent.actionHistory = [
          `@${pseudo} has given his part (${goldGiven}) of gold.`,
        ];
      }
      const newEventHistory = [...eventHistory];
      newEventHistory[currentEvent] = { ...newEvent };

      this.updateCharacterGold(parseInt(character.gold, 10) - goldGiven);
      this.updateCurrentEvent(newEventHistory);
    }
  };

  takeAllGold = () => {
    const { currentEvent, eventHistory, pseudo, character } = this.props;
    if (currentEvent > -1 && eventHistory[currentEvent].isActive) {
      const newEvent = { ...eventHistory[currentEvent] };
      const goldTaken = newEvent.goldLeft;
      newEvent.goldLeft = 0;
      if (newEvent.actionHistory && newEvent.actionHistory.length > 0) {
        newEvent.actionHistory.push(
          `@${pseudo} has taken all the gold left (${goldTaken}).`
        );
      } else {
        newEvent.actionHistory = [
          `@${pseudo} has taken all the gold left (${goldTaken}).`,
        ];
      }
      const newEventHistory = [...eventHistory];
      newEventHistory[currentEvent] = { ...newEvent };

      this.updateCharacterGold(
        parseInt(character.gold, 10) + parseInt(goldTaken, 10)
      );
      this.updateCurrentEvent(newEventHistory);
    }
  };

  takeXGold = () => {
    const { currentEvent, eventHistory, pseudo, character } = this.props;
    const { numberWanted } = this.state;
    if (currentEvent > -1 && eventHistory[currentEvent].isActive) {
      if (numberWanted <= eventHistory[currentEvent].goldLeft) {
        const newEvent = { ...eventHistory[currentEvent] };
        newEvent.goldLeft = newEvent.goldLeft - numberWanted;
        if (newEvent.actionHistory && newEvent.actionHistory.length > 0) {
          newEvent.actionHistory.push(
            `@${pseudo} has taken ${numberWanted} gold.`
          );
        } else {
          newEvent.actionHistory = [
            `@${pseudo} has taken ${numberWanted} gold.`,
          ];
        }
        const newEventHistory = [...eventHistory];
        newEventHistory[currentEvent] = { ...newEvent };

        this.updateCurrentEvent(newEventHistory);
        this.updateCharacterGold(
          parseInt(character.gold, 10) + parseInt(numberWanted, 10)
        );
      }
    }
  };

  takeEquivalentGold = () => {
    const {
      currentEvent,
      eventHistory,
      pseudo,
      storyCharacters,
      character,
    } = this.props;
    if (currentEvent > -1 && eventHistory[currentEvent].isActive) {
      const newEvent = { ...eventHistory[currentEvent] };
      let goldTaken = Math.floor(newEvent.gold / (storyCharacters.length - 1));
      if (newEvent.goldLeft - goldTaken < 0) {
        goldTaken = newEvent.goldLeft;
      }
      newEvent.goldLeft = newEvent.goldLeft - goldTaken;
      if (newEvent.actionHistory && newEvent.actionHistory.length > 0) {
        newEvent.actionHistory.push(
          `@${pseudo} has taken his part (${goldTaken}) of gold.`
        );
      } else {
        newEvent.actionHistory = [
          `@${pseudo} has taken his part (${goldTaken}) of gold.`,
        ];
      }
      const newEventHistory = [...eventHistory];
      newEventHistory[currentEvent] = { ...newEvent };

      this.updateCharacterGold(parseInt(character.gold, 10) + goldTaken);
      this.updateCurrentEvent(newEventHistory);
    }
  };

  takeNothing = () => {
    const { currentEvent, eventHistory, pseudo, doSetState } = this.props;
    if (currentEvent > -1 && eventHistory[currentEvent].isActive) {
      const newEvent = { ...eventHistory[currentEvent] };
      if (newEvent.actionHistory && newEvent.actionHistory.length > 0) {
        newEvent.actionHistory.push(`@${pseudo} choosed to take nothing.`);
      } else {
        newEvent.actionHistory = [`@${pseudo} choosed to take nothing.`];
      }
      const newEventHistory = [...eventHistory];
      newEventHistory[currentEvent] = { ...newEvent };

      this.updateCurrentEvent(newEventHistory);
      doSetState({
        currentEvent: -1,
      });
    }
  };

  closeEvent = () => {
    const {
      currentEvent,
      eventHistory,
      doSetState,
      isGameMaster,
      uid,
      storyCharacters,
    } = this.props;
    if (currentEvent > -1 && eventHistory[currentEvent].isActive) {
      if (isGameMaster) {
        const newEvent = { ...eventHistory[currentEvent] };
        newEvent.isActive = false;
        const newEventHistory = [...eventHistory];
        newEventHistory[currentEvent] = { ...newEvent };

        this.updateCurrentEvent(newEventHistory);
        this.resetCurrentEvent();
      } else {
        const newEvent = { ...eventHistory[currentEvent] };
        newEvent.hasViewed.push(uid);
        if (newEvent.viewers && newEvent.viewers.length > 0) {
          if (newEvent.hasViewed.length === newEvent.viewers.length + 1) {
            newEvent.isActive = false;
          }
        } else if (newEvent.hasViewed.length === storyCharacters.length) {
          newEvent.isActive = false;
        }
        const newEventHistory = [...eventHistory];
        newEventHistory[currentEvent] = { ...newEvent };

        this.updateCurrentEvent(newEventHistory);

        if (!newEvent.isActive) {
          this.resetCurrentEvent();
        } else {
          doSetState({
            currentEvent: -1,
          });
        }
      }
    }
  };

  onChange = (name, value) => {
    const obj = {};
    obj[name] = value;
    this.setState(state => ({
      ...state,
      ...obj,
    }));
  };

  addViewerToEvent = uid => {
    const { currentEvent, eventHistory } = this.props;
    if (currentEvent > -1 && eventHistory[currentEvent].isActive) {
      const newEvent = { ...eventHistory[currentEvent] };
      newEvent.viewers.push(uid);
      const newEventHistory = [...eventHistory];
      newEventHistory[currentEvent] = { ...newEvent };

      this.updateCurrentEvent(newEventHistory);
    }
  };

  removeViewerFromEvent = uid => {
    const {
      currentEvent,
      eventHistory,
      storyCharacters,
      gameMaster,
    } = this.props;
    if (currentEvent > -1 && eventHistory[currentEvent].isActive) {
      const newEvent = { ...eventHistory[currentEvent] };

      if (newEvent.viewers && newEvent.viewers.length > 0) {
        newEvent.viewers.map((ql, index) => {
          if (ql === uid) {
            newEvent.viewers.splice(index, 1);
          }
          return null;
        });
      } else {
        const userIds = [];
        storyCharacters.map(sc => {
          if (sc.userUid !== uid && sc.userUid !== gameMaster) {
            userIds.push(sc.userUid);
          }
          return null;
        });
        newEvent.viewers = [...userIds];
      }
      const newEventHistory = [...eventHistory];
      newEventHistory[currentEvent] = { ...newEvent };

      this.updateCurrentEvent(newEventHistory);
    }
  };

  render() {
    const {
      isGameMaster,
      currentEvent,
      eventHistory,
      storyCharacters,
    } = this.props;

    const { numberWanted } = this.state;

    return (
      <div style={styledEventModal}>
        <div style={styledEventTitle}>EVENEMENT !</div>
        <EventModalViewers
          isGameMaster={isGameMaster}
          currentEvent={currentEvent}
          eventHistory={eventHistory}
          storyCharacters={storyCharacters}
          removeViewerFromEvent={this.removeViewerFromEvent}
          addViewerToEvent={this.addViewerToEvent}
        />
        <EventModalDescription
          currentEvent={currentEvent}
          eventHistory={eventHistory}
        />
        <EventModalActionHistory
          currentEvent={currentEvent}
          eventHistory={eventHistory}
        />
        {eventHistory[currentEvent].type === 'gold' && (
          <EventModalGold
            isGameMaster={isGameMaster}
            event={eventHistory[currentEvent]}
            numberWanted={numberWanted}
            closeEvent={this.closeEvent}
            takeNothing={this.takeNothing}
            takeXGold={this.takeXGold}
            takeAllGold={this.takeAllGold}
            onChange={this.onChange}
            takeEquivalentGold={this.takeEquivalentGold}
          />
        )}
        {eventHistory[currentEvent].type === 'debt' && (
          <EventModalDebt
            isGameMaster={isGameMaster}
            event={eventHistory[currentEvent]}
            numberWanted={numberWanted}
            closeEvent={this.closeEvent}
            onChange={this.onChange}
            giveXGold={this.giveXGold}
            giveAllGold={this.giveAllGold}
            giveEquivalentGold={this.giveEquivalentGold}
          />
        )}
        {eventHistory[currentEvent].type === 'item' && (
          <EventModalItem
            isGameMaster={isGameMaster}
            currentEvent={currentEvent}
            numberWanted={numberWanted}
            eventHistory={eventHistory}
            closeEvent={this.closeEvent}
            takeNothing={this.takeNothing}
            lastItem={this.lastItem}
            onlyOneItem={this.onlyOneItem}
            takeXItem={this.takeXItem}
            takeAllItems={this.takeAllItems}
            onChange={this.onChange}
          />
        )}
      </div>
    );
  }
}

EventModal.propTypes = {
  currentStory: PropTypes.number.isRequired,
  isGameMaster: PropTypes.bool.isRequired,
  currentEvent: PropTypes.number.isRequired,
  eventHistory: PropTypes.array.isRequired,
  storyCharacters: PropTypes.array.isRequired,
  uid: PropTypes.string.isRequired,
  pseudo: PropTypes.string.isRequired,
  doSetState: PropTypes.func.isRequired,
  character: PropTypes.object.isRequired,
  gameMaster: PropTypes.string.isRequired,
  triggerError: PropTypes.func.isRequired,
};

export default EventModal;
