import React, { useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_NEW_EVENT } from '../redux/actionsTypes/actionsTypesEvents';

const EventContext = React.createContext(undefined);

export const useEventContext = () => useContext(EventContext);

function EventProvider(props) {
  const [eventType, setEventType] = useState('');
  const [goldEvent, setGoldEvent] = useState(0);
  const [quantityEvent, setQuantityEvent] = useState(0);
  const [descriptionEvent, setDescriptionEvent] = useState('');
  const [itemEvent, setItemEvent] = useState({});
  const [viewers, setViewers] = useState([]);

  const { gameMaster, storyCharacters } = useSelector(store => ({
    gameMaster: store.appState.gameMaster,
    storyCharacters: store.team.characters,
  }));
  const dispatch = useDispatch();

  const addAllViewers = () => {
    const newViewersTab = storyCharacters.map(sc => {
      return sc.userUid;
    });
    setViewers(newViewersTab);
  };

  const removeAllViewers = () => {
    setViewers([]);
  };

  const addToViewer = uid => {
    const newViewersTab = [...viewers];
    newViewersTab.push(uid);
    setViewers(newViewersTab);
  };

  const removeToViewer = uid => {
    const newViewersTab = [...viewers];
    newViewersTab.map((v, index) => {
      if (v === uid) {
        newViewersTab.splice(index, 1);
      }
      return null;
    });
    setViewers(newViewersTab);
  };

  const onChangeEventType = val => {
    setViewers([]);
    setGoldEvent(0);
    setItemEvent({});
    setEventType(val);
  };

  const createEvent = () => {
    let newEvent = {};
    if (eventType === 'gold' || eventType === 'debt') {
      newEvent = {
        type: eventType,
        gold: parseInt(goldEvent, 10),
        goldLeft: eventType === 'gold' ? parseInt(goldEvent, 10) : 0,
        description: descriptionEvent,
        isActive: true,
        hasViewed: [gameMaster],
        viewers: viewers.length === 0 ? null : viewers,
      };
    } else if (eventType === 'item') {
      newEvent = {
        type: eventType,
        item: itemEvent,
        quantity: parseInt(quantityEvent, 10),
        quantityLeft: parseInt(quantityEvent, 10),
        description: descriptionEvent,
        isActive: true,
        hasViewed: [gameMaster],
        viewers: viewers.length === 0 ? null : viewers,
      };
    } else if (eventType === 'draw') {
      newEvent = {
        type: eventType,
        isActive: true,
        hasViewed: [gameMaster],
        viewers: null,
      };
    }
    addNewEvent(newEvent);
  };

  const addNewEvent = newEvent => {
    dispatch({
      type: ADD_NEW_EVENT,
      payload: newEvent,
    });
  };

  return (
    <EventContext.Provider
      value={{
        eventType,
        setEventType,
        goldEvent,
        setGoldEvent,
        quantityEvent,
        setQuantityEvent,
        descriptionEvent,
        setDescriptionEvent,
        itemEvent,
        setItemEvent,
        viewers,
        addAllViewers,
        removeAllViewers,
        addToViewer,
        removeToViewer,
        onChangeEventType,
        createEvent,
        setQuantityEvent,
        setDescriptionEvent,
      }}
    >
      {props.children}
    </EventContext.Provider>
  );
}

export { EventContext, EventProvider };
