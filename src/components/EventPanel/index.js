import React, { useState } from 'react';
import EventViewers from './EventViewers';
import EventItemForm from './EventItemForm';
import EventGoldForm from './EventGoldForm';
import EventTypeSelector from './EventTypeSelector';
import { heightLeft } from '../Utils/StyleConstants';
import { colors } from '../Utils/Constants';
import { Button } from 'semantic-ui-react';
import EventHeader from './EventHeader';
import { useEventContext } from '../../contexts/eventContext';

const styledEventContainer = {
  width: '50%',
  height: `${heightLeft / 2}px`,
  position: 'relative',
  float: 'left',
  display: 'inline-block',
  alignItems: 'center',
  backgroundColor: colors.background,
  color: colors.text,
  borderBottom: '1px solid white',
};

const styledEventFormContainer = {
  height: `${heightLeft / 2 - 61}px`,
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
};

const styledEventButtonContainer = {
  marginTop: 10,
  marginBottom: 20,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const EventPanel = () => {
  const { eventType, createEvent } = useEventContext();
  return (
    <div style={styledEventContainer}>
      <EventHeader />
      <div style={styledEventFormContainer} className='scrollbar'>
        <EventTypeSelector />
        {(eventType === 'gold' || eventType === 'debt') && <EventGoldForm />}
        {eventType === 'item' && <EventItemForm />}
        <EventViewers />
        <div style={styledEventButtonContainer}>
          <Button primary onClick={createEvent}>
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventPanel;
