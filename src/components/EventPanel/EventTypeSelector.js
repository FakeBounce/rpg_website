import React from 'react';
import { eventList, toSemanticUIOptions } from '../Utils/Constants';

import PropTypes from 'prop-types';
import { Select } from 'semantic-ui-react';
import { useEventContext } from '../../contexts/eventContext';

const styledEventTypeContainer = {
  marginTop: 10,
  marginBottom: 10,
  paddingLeft: 10,
  paddingRight: 10,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const EventTypeSelector = () => {
  const { eventType, setEventType } = useEventContext();
  return (
    <div style={styledEventTypeContainer}>
      <div>Event type :</div>
      <Select
        value={eventType}
        onChange={(e, { value }) => {
          console.log('setter', value);
          setEventType(value);
        }}
        placeholder='Select your event type'
        options={toSemanticUIOptions(eventList)}
      />
    </div>
  );
};

EventTypeSelector.propTypes = {
  eventType: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default EventTypeSelector;
