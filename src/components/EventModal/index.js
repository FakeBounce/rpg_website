import React, { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import EventModalDebt from './EventModalDebt';
import Draw from './Draw';
import { colors } from '../Utils/Constants';
import ButtonLarge from '../Utils/ButtonLarge';
import { SET_CURRENT_EVENT } from '../../redux/actionsTypes/actionsTypesEvents';
import useApp from '../../hooks/useApp';

const styledEventModal = {
  position: 'absolute',
  zIndex: 99,
  top: `${heightHeader / 2}px`,
  left: `${widthRightPanel / 2}px`,
  width: `${widthLeft + mapWidth}px`,
  height: `${heightHeader / 2 + heightCameras / 2 + heightLeft - 50}px`,
  border: '2px solid brown',
  borderRadius: 40,
  backgroundColor: colors.background,
  color: colors.text,
};

const styledEventTitle = {
  width: '100%',
  height: 40,
  marginTop: 15,
  marginBottom: 15,
  textAlign: 'center',
  fontSize: 25,
  float: 'left',
  position: 'relative',
  display: 'inline-block',
};

const styledEventAction = {
  margin: '0px 15px',
  padding: 5,
  textAlign: 'center',
  position: 'relative',
  display: 'inline-block',
};

const EventModal = () => {
  const [numberWanted, setNumberWanted] = useState(0);

  const {
    gameMaster,
    isGameMaster,
    uid,
    currentStory,
    eventHistory,
    currentEvent,
    character,
    storyCharacters,
  } = useSelector(store => ({
    uid: store.userInfos.uid,
    currentStory: store.appState.currentStory,
    gameMaster: store.appState.gameMaster,
    isGameMaster: store.appState.isGameMaster,
    eventHistory: store.events.history,
    currentEvent: store.events.currentEvent,
    character: store.character,
    storyCharacters: store.team.characters,
  }));
  const { triggerError } = useApp();
  const dispatch = useDispatch();

  const resetCurrentEvent = () => {
    firebase
      .database()
      .ref('stories/' + currentStory + '/currentEvent')
      .set(-1)
      .catch(error => {
        // Handle Errors here.
        triggerError(error);
      });
  };

  const updateCurrentEvent = newEventHistory => {
    firebase
      .database()
      .ref('stories/' + currentStory + '/events')
      .set(newEventHistory)
      .catch(error => {
        // Handle Errors here.
        triggerError(error);
      });
  };

  const updateCharacterGold = goldWanted => {
    firebase
      .database()
      .ref('stories/' + currentStory + '/characters/' + uid + '/character/gold')
      .set(goldWanted)
      .catch(error => {
        // Handle Errors here.
        triggerError(error);
      });
  };

  const addItem = (item, quantity) => {
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

  const takeAllItems = () => {
    const realPseudo = isGameMaster ? 'GM' : character.name;
    if (currentEvent !== '' && eventHistory[currentEvent].isActive) {
      const newEvent = { ...eventHistory[currentEvent] };
      const quantityLeft = newEvent.quantityLeft;
      newEvent.quantityLeft = 0;
      if (newEvent.actionHistory && newEvent.actionHistory.length > 0) {
        newEvent.actionHistory.push(
          `@${realPseudo} has taken all the items left (${quantityLeft}).`,
        );
      } else {
        newEvent.actionHistory = [
          `@${realPseudo} has taken all the items left (${quantityLeft}).`,
        ];
      }
      const newEventHistory = { ...eventHistory };
      newEventHistory[currentEvent] = { ...newEvent };

      addItem(newEvent.item, quantityLeft);
      updateCurrentEvent(newEventHistory);
    }
  };

  const takeXItem = () => {
    const realPseudo = isGameMaster ? 'GM' : character.name;
    if (currentEvent !== '' && eventHistory[currentEvent].isActive) {
      const newEvent = { ...eventHistory[currentEvent] };
      newEvent.quantityLeft = newEvent.quantityLeft - numberWanted;

      if (newEvent.quantityLeft > 0) {
        if (newEvent.actionHistory && newEvent.actionHistory.length > 0) {
          newEvent.actionHistory.push(
            `@${realPseudo} has taken ${numberWanted} items. ${newEvent.quantityLeft} left)`,
          );
        } else {
          newEvent.actionHistory = [
            `@${realPseudo} has taken ${numberWanted} items. ${newEvent.quantityLeft} left)`,
          ];
        }
      } else {
        if (newEvent.actionHistory && newEvent.actionHistory.length > 0) {
          newEvent.actionHistory.push(
            `@${realPseudo} has taken the last items (${numberWanted}).`,
          );
        } else {
          newEvent.actionHistory = [
            `@${realPseudo} has taken the last items (${numberWanted}).`,
          ];
        }
      }

      const newEventHistory = { ...eventHistory };
      newEventHistory[currentEvent] = { ...newEvent };

      addItem(newEvent.item, numberWanted);
      updateCurrentEvent(newEventHistory);
    }
  };

  const onlyOneItem = () => {
    const realPseudo = isGameMaster ? 'GM' : character.name;
    if (currentEvent !== '' && eventHistory[currentEvent].isActive) {
      const newEvent = { ...eventHistory[currentEvent] };
      newEvent.quantityLeft = newEvent.quantityLeft - 1;

      if (newEvent.quantityLeft > 0) {
        if (newEvent.actionHistory && newEvent.actionHistory.length > 0) {
          newEvent.actionHistory.push(
            `@${realPseudo} has taken only one item.(${newEvent.quantityLeft} left)`,
          );
        } else {
          newEvent.actionHistory = [
            `@${realPseudo} has taken only one item.(${newEvent.quantityLeft} left)`,
          ];
        }
      } else {
        if (newEvent.actionHistory && newEvent.actionHistory.length > 0) {
          newEvent.actionHistory.push(
            `@${realPseudo} has taken the last item.`,
          );
        } else {
          newEvent.actionHistory = [`@${realPseudo} has taken the last item.`];
        }
      }

      const newEventHistory = { ...eventHistory };
      newEventHistory[currentEvent] = { ...newEvent };

      addItem(newEvent.item, 1);
      updateCurrentEvent(newEventHistory);
    }
  };

  const lastItem = () => {
    const realPseudo = isGameMaster ? 'GM' : character.name;
    if (currentEvent !== '' && eventHistory[currentEvent].isActive) {
      const newEvent = { ...eventHistory[currentEvent] };
      newEvent.quantityLeft = 0;
      if (newEvent.actionHistory && newEvent.actionHistory.length > 0) {
        newEvent.actionHistory.push(`@${realPseudo} has taken the last item.`);
      } else {
        newEvent.actionHistory = [`@${realPseudo} has taken the last item.`];
      }
      const newEventHistory = { ...eventHistory };
      newEventHistory[currentEvent] = { ...newEvent };

      addItem(newEvent.item, 1);
      updateCurrentEvent(newEventHistory);
    }
  };

  const giveAllGold = () => {
    const realPseudo = isGameMaster ? 'GM' : character.name;
    if (currentEvent !== '' && eventHistory[currentEvent].isActive) {
      const newEvent = { ...eventHistory[currentEvent] };
      const goldGiven = newEvent.gold - newEvent.goldLeft;

      if (parseInt(character.gold, 10) >= goldGiven) {
        newEvent.goldLeft = newEvent.gold;
        if (newEvent.actionHistory && newEvent.actionHistory.length > 0) {
          newEvent.actionHistory.push(
            `@${realPseudo} has given all the gold (${goldGiven}). How generous !`,
          );
        } else {
          newEvent.actionHistory = [
            `@${realPseudo} has given all the gold (${goldGiven}). How generous !`,
          ];
        }
        const newEventHistory = { ...eventHistory };
        newEventHistory[currentEvent] = { ...newEvent };

        updateCharacterGold(
          parseInt(character.gold, 10) - parseInt(goldGiven, 10),
        );
        updateCurrentEvent(newEventHistory);
      } else {
        newEvent.goldLeft = newEvent.goldLeft + parseInt(character.gold, 10);
        if (newEvent.actionHistory && newEvent.actionHistory.length > 0) {
          newEvent.actionHistory.push(
            `@${realPseudo} has given all his money (${parseInt(
              character.gold,
              10,
            )}). How generous !`,
          );
        } else {
          newEvent.actionHistory = [
            `@${realPseudo} has given all his money (${parseInt(
              character.gold,
              10,
            )}). How generous !`,
          ];
        }
        const newEventHistory = { ...eventHistory };
        newEventHistory[currentEvent] = { ...newEvent };

        updateCharacterGold(0);
        updateCurrentEvent(newEventHistory);
      }
    }
  };

  const giveXGold = () => {
    const realPseudo = isGameMaster ? 'GM' : character.name;
    if (currentEvent !== '' && eventHistory[currentEvent].isActive) {
      if (
        numberWanted <
        eventHistory[currentEvent].gold - eventHistory[currentEvent].goldLeft
      ) {
        const newEvent = { ...eventHistory[currentEvent] };
        newEvent.goldLeft = newEvent.goldLeft + numberWanted;
        if (newEvent.actionHistory && newEvent.actionHistory.length > 0) {
          newEvent.actionHistory.push(
            `@${realPseudo} has given ${numberWanted} gold.`,
          );
        } else {
          newEvent.actionHistory = [
            `@${realPseudo} has given ${numberWanted} gold.`,
          ];
        }
        const newEventHistory = { ...eventHistory };
        newEventHistory[currentEvent] = { ...newEvent };

        updateCurrentEvent(newEventHistory);
        updateCharacterGold(
          parseInt(character.gold, 10) - parseInt(numberWanted, 10),
        );
      } else {
        giveAllGold();
      }
    }
  };

  const giveEquivalentGold = () => {
    const realPseudo = isGameMaster ? 'GM' : character.name;
    if (currentEvent !== '' && eventHistory[currentEvent].isActive) {
      const newEvent = { ...eventHistory[currentEvent] };

      let charactersLeft = 0;
      storyCharacters.map(storyCharacter => {
        if (
          storyCharacter.status !== 'Dead' &&
          storyCharacter.status !== 'Inactive' &&
          storyCharacter.userUid !== gameMaster
        ) {
          ++charactersLeft;
        }
        return null;
      });

      if (charactersLeft > 0) {
        let goldGiven = Math.floor(newEvent.gold / charactersLeft);
        if (newEvent.goldLeft + goldGiven > newEvent.gold) {
          goldGiven = newEvent.gold - newEvent.goldLeft;
        }
        newEvent.goldLeft = newEvent.goldLeft + goldGiven;
        if (newEvent.actionHistory && newEvent.actionHistory.length > 0) {
          newEvent.actionHistory.push(
            `@${realPseudo} has given his part (${goldGiven}) of gold.`,
          );
        } else {
          newEvent.actionHistory = [
            `@${realPseudo} has given his part (${goldGiven}) of gold.`,
          ];
        }
        const newEventHistory = { ...eventHistory };
        newEventHistory[currentEvent] = { ...newEvent };

        updateCharacterGold(parseInt(character.gold, 10) - goldGiven);
        updateCurrentEvent(newEventHistory);
      }
    }
  };

  const takeAllGold = () => {
    const realPseudo = isGameMaster ? 'GM' : character.name;
    if (currentEvent !== '' && eventHistory[currentEvent].isActive) {
      const newEvent = { ...eventHistory[currentEvent] };
      const goldTaken = newEvent.goldLeft;
      newEvent.goldLeft = 0;
      if (newEvent.actionHistory && newEvent.actionHistory.length > 0) {
        newEvent.actionHistory.push(
          `@${realPseudo} has taken all the gold left (${goldTaken}).`,
        );
      } else {
        newEvent.actionHistory = [
          `@${realPseudo} has taken all the gold left (${goldTaken}).`,
        ];
      }
      const newEventHistory = { ...eventHistory };
      newEventHistory[currentEvent] = { ...newEvent };

      updateCharacterGold(
        parseInt(character.gold, 10) + parseInt(goldTaken, 10),
      );
      updateCurrentEvent(newEventHistory);
    }
  };

  const takeXGold = () => {
    const realPseudo = isGameMaster ? 'GM' : character.name;
    if (currentEvent !== '' && eventHistory[currentEvent].isActive) {
      if (numberWanted <= eventHistory[currentEvent].goldLeft) {
        const newEvent = { ...eventHistory[currentEvent] };
        newEvent.goldLeft = newEvent.goldLeft - numberWanted;
        if (newEvent.actionHistory && newEvent.actionHistory.length > 0) {
          newEvent.actionHistory.push(
            `@${realPseudo} has taken ${numberWanted} gold.`,
          );
        } else {
          newEvent.actionHistory = [
            `@${realPseudo} has taken ${numberWanted} gold.`,
          ];
        }
        const newEventHistory = { ...eventHistory };
        newEventHistory[currentEvent] = { ...newEvent };

        updateCurrentEvent(newEventHistory);
        updateCharacterGold(
          parseInt(character.gold, 10) + parseInt(numberWanted, 10),
        );
      }
    }
  };

  const takeEquivalentGold = () => {
    const realPseudo = isGameMaster ? 'GM' : character.name;
    if (currentEvent !== '' && eventHistory[currentEvent].isActive) {
      const newEvent = { ...eventHistory[currentEvent] };

      let charactersLeft = 0;
      storyCharacters.map(storyCharacter => {
        if (
          storyCharacter.status !== 'Dead' &&
          storyCharacter.status !== 'Inactive' &&
          storyCharacter.userUid !== gameMaster
        ) {
          ++charactersLeft;
        }
        return null;
      });

      if (charactersLeft > 0) {
        let goldTaken = Math.floor(newEvent.gold / charactersLeft);
        if (newEvent.goldLeft - goldTaken < 0) {
          goldTaken = newEvent.goldLeft;
        }
        newEvent.goldLeft = newEvent.goldLeft - goldTaken;
        if (newEvent.actionHistory && newEvent.actionHistory.length > 0) {
          newEvent.actionHistory.push(
            `@${realPseudo} has taken his part (${goldTaken}) of gold.`,
          );
        } else {
          newEvent.actionHistory = [
            `@${realPseudo} has taken his part (${goldTaken}) of gold.`,
          ];
        }
        const newEventHistory = { ...eventHistory };
        newEventHistory[currentEvent] = { ...newEvent };

        updateCharacterGold(parseInt(character.gold, 10) + goldTaken);
        updateCurrentEvent(newEventHistory);
      }
    }
  };

  const takeNothing = () => {
    const realPseudo = isGameMaster ? 'GM' : character.name;
    if (currentEvent !== '' && eventHistory[currentEvent].isActive) {
      const newEvent = { ...eventHistory[currentEvent] };
      if (newEvent.actionHistory && newEvent.actionHistory.length > 0) {
        newEvent.actionHistory.push(`@${realPseudo} choosed to take nothing.`);
      } else {
        newEvent.actionHistory = [`@${realPseudo} choosed to take nothing.`];
      }
      const newEventHistory = { ...eventHistory };
      newEventHistory[currentEvent] = { ...newEvent };

      updateCurrentEvent(newEventHistory);
      setCurrentEvent(-1);
    }
  };

  const closeEvent = () => {
    if (currentEvent !== '' && eventHistory[currentEvent].isActive) {
      if (isGameMaster) {
        const newEvent = { ...eventHistory[currentEvent] };
        newEvent.isActive = false;
        const newEventHistory = { ...eventHistory };
        newEventHistory[currentEvent] = { ...newEvent };

        updateCurrentEvent(newEventHistory);
        resetCurrentEvent();
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
        const newEventHistory = { ...eventHistory };
        newEventHistory[currentEvent] = { ...newEvent };

        updateCurrentEvent(newEventHistory);

        if (!newEvent.isActive) {
          resetCurrentEvent();
        } else {
          setCurrentEvent(-1);
        }
      }
    }
  };

  const addViewerToEvent = eventUserUid => {
    if (currentEvent !== '' && eventHistory[currentEvent].isActive) {
      const newEvent = { ...eventHistory[currentEvent] };
      newEvent.viewers.push(eventUserUid);
      const newEventHistory = { ...eventHistory };
      newEventHistory[currentEvent] = { ...newEvent };

      updateCurrentEvent(newEventHistory);
    }
  };

  const removeViewerFromEvent = eventUserUid => {
    if (currentEvent !== '' && eventHistory[currentEvent].isActive) {
      const newEvent = { ...eventHistory[currentEvent] };

      if (newEvent.viewers && newEvent.viewers.length > 0) {
        newEvent.viewers.map((ql, index) => {
          if (ql === eventUserUid) {
            newEvent.viewers.splice(index, 1);
          }
          return null;
        });
      } else {
        const userIds = [];
        storyCharacters.map(sc => {
          if (sc.userUid !== eventUserUid && sc.userUid !== gameMaster) {
            userIds.push(sc.userUid);
          }
          return null;
        });
        newEvent.viewers = [...userIds];
      }
      const newEventHistory = { ...eventHistory };
      newEventHistory[currentEvent] = { ...newEvent };

      updateCurrentEvent(newEventHistory);
    }
  };

  const setCurrentEvent = payload => {
    dispatch({
      type: SET_CURRENT_EVENT,
      payload,
    });
  };

  return (
    <div style={styledEventModal}>
      <div style={styledEventTitle}>EVENEMENT !</div>
      {eventHistory[currentEvent].type !== 'draw' && (
        <EventModalViewers
          removeViewerFromEvent={removeViewerFromEvent}
          addViewerToEvent={addViewerToEvent}
        />
      )}
      {eventHistory[currentEvent].type !== 'draw' && <EventModalDescription />}
      {eventHistory[currentEvent].type !== 'draw' && (
        <EventModalActionHistory />
      )}
      {eventHistory[currentEvent].type === 'gold' && (
        <EventModalGold
          event={eventHistory[currentEvent]}
          numberWanted={numberWanted}
          closeEvent={closeEvent}
          takeNothing={takeNothing}
          takeXGold={takeXGold}
          takeAllGold={takeAllGold}
          onChange={setNumberWanted}
          takeEquivalentGold={takeEquivalentGold}
        />
      )}
      {eventHistory[currentEvent].type === 'debt' && (
        <EventModalDebt
          event={eventHistory[currentEvent]}
          numberWanted={numberWanted}
          closeEvent={closeEvent}
          onChange={setNumberWanted}
          giveXGold={giveXGold}
          giveAllGold={giveAllGold}
          giveEquivalentGold={giveEquivalentGold}
        />
      )}
      {eventHistory[currentEvent].type === 'item' && (
        <EventModalItem
          numberWanted={numberWanted}
          closeEvent={closeEvent}
          takeNothing={takeNothing}
          lastItem={lastItem}
          onlyOneItem={onlyOneItem}
          takeXItem={takeXItem}
          takeAllItems={takeAllItems}
          onChange={setNumberWanted}
        />
      )}
      {eventHistory[currentEvent].type === 'draw' && (
        <Fragment>
          <Draw
            key={'gm-drawer'}
            name={'GameMaster'}
            disabled={!isGameMaster}
          />
          {storyCharacters.map(sc => {
            return (
              <Draw
                key={'drawer-' + sc.userUid}
                drawUid={sc.userUid}
                disabled={uid !== sc.userUid}
                name={sc.name}
              />
            );
          })}
          {isGameMaster && (
            <ButtonLarge style={styledEventAction} onClick={closeEvent}>
              Delete Event
            </ButtonLarge>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default EventModal;
