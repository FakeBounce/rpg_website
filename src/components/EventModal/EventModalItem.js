import React from 'react';
import PropTypes from 'prop-types';
import ButtonLarge from '../Utils/ButtonLarge';
import { useSelector } from 'react-redux';

const styledEventActionContainer = {
  width: '100%',
  height: 50,
  marginTop: 40,
  marginBottom: 10,
  textAlign: 'center',
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

const EventModalItem = ({
  numberWanted,
  closeEvent,
  takeNothing,
  lastItem,
  onlyOneItem,
  takeXItem,
  takeAllItems,
  onChange,
}) => {
  const { isGameMaster, currentEvent, eventHistory } = useSelector(store => ({
    isGameMaster: store.appState.isGameMaster,
    currentEvent: store.events.currentEvent,
    eventHistory: store.events.history,
  }));

  return (
    <div style={styledEventActionContainer}>
      {eventHistory[currentEvent].quantityLeft > 1 && (
        <ButtonLarge style={styledEventAction} onClick={takeAllItems}>
          Take all
        </ButtonLarge>
      )}
      {eventHistory[currentEvent].quantityLeft > 1 && (
        <div style={styledEventAction}>
          Take
          <input
            type='number'
            value={numberWanted}
            name='numberWanted'
            min={0}
            max={eventHistory[currentEvent].quantityLeft}
            onChange={e => {
              onChange(e.target.name, parseInt(e.target.value, 10));
            }}
          />
          {eventHistory[currentEvent].item.name}
          <ButtonLarge onClick={takeXItem}>Confirm</ButtonLarge>
        </div>
      )}
      {eventHistory[currentEvent].quantityLeft > 1 && (
        <ButtonLarge style={styledEventAction} onClick={onlyOneItem}>
          Take only 1
        </ButtonLarge>
      )}
      {eventHistory[currentEvent].quantityLeft === 1 && (
        <ButtonLarge style={styledEventAction} onClick={lastItem}>
          Take it
        </ButtonLarge>
      )}
      {eventHistory[currentEvent].quantityLeft > 0 && (
        <ButtonLarge style={styledEventAction} onClick={takeNothing}>
          Not interested
        </ButtonLarge>
      )}
      {eventHistory[currentEvent].quantityLeft === 0 && !isGameMaster && (
        <ButtonLarge style={styledEventAction} onClick={closeEvent}>
          Close Event
        </ButtonLarge>
      )}
      {isGameMaster && (
        <ButtonLarge style={styledEventAction} onClick={closeEvent}>
          Delete Event
        </ButtonLarge>
      )}
    </div>
  );
};

EventModalItem.propTypes = {
  numberWanted: PropTypes.number.isRequired,
  closeEvent: PropTypes.func.isRequired,
  takeNothing: PropTypes.func.isRequired,
  lastItem: PropTypes.func.isRequired,
  onlyOneItem: PropTypes.func.isRequired,
  takeXItem: PropTypes.func.isRequired,
  takeAllItems: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default EventModalItem;
