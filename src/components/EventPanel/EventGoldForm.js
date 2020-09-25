import React from 'react';
import { Input } from 'semantic-ui-react';
import { useEventContext } from '../../contexts/eventContext';

const styledEventGoldFormContainer = {
  marginTop: 10,
  marginBottom: 10,
  paddingLeft: 10,
  paddingRight: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const EventGoldForm = () => {
  const { goldEvent, setGoldEvent, descriptionEvent, setDescriptionEvent } = useEventContext();
  return (
    <div style={styledEventGoldFormContainer}>
      <Input
        type='number'
        placeholder='Total gold'
        name='goldEvent'
        value={goldEvent}
        onChange={e => {
          setGoldEvent(parseInt(e.target.value, 10));
        }}
        style={{ maxWidth: '40%' }}
      />
      <Input
        type='text'
        placeholder='Description'
        name='descriptionEvent'
        value={descriptionEvent}
        onChange={e => {
          setDescriptionEvent(e.target.value);
        }}
        style={{ maxWidth: '50%' }}
      />
    </div>
  );
};

export default EventGoldForm;
