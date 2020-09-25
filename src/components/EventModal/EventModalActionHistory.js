import React from 'react';
import { useSelector } from 'react-redux';

const styledActionHistory = {
  width: '100%',
  height: 20,
  marginBottom: 5,
  textAlign: 'center',
  float: 'left',
  position: 'relative',
  display: 'inline-block',
};

const styledActionHistoryContainer = {
  width: '50%',
  height: 180,
  marginTop: 40,
  marginBottom: 10,
  textAlign: 'center',
  float: 'left',
  position: 'relative',
  display: 'inline-block',
  overflowY: 'auto',
};

const EventModalActionHistory = () => {
  const { currentEvent, eventHistory } = useSelector(store => ({
    currentEvent: store.events.currentEvent,
    eventHistory: store.events.history,
  }));

  return (
    <div style={styledActionHistoryContainer}>
      {eventHistory[currentEvent].actionHistory &&
        eventHistory[currentEvent].actionHistory.length > 0 &&
        eventHistory[currentEvent].actionHistory.map(ah => {
          return (
            <div key={`action-history-${ah}`} style={styledActionHistory}>
              {ah}
            </div>
          );
        })}
    </div>
  );
};

export default EventModalActionHistory;
