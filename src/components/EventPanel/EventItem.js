import React from 'react';
import PropTypes from 'prop-types';
import { cursorPointer } from '../Utils/StyleConstants';
import { useEventContext } from '../../contexts/eventContext';

const styledItem = {
  width: '100%',
  display: 'inline-block',
  float: 'left',
  position: 'relative',
  cursor: cursorPointer,
  borderBottom: '1px solid black',
};

const styledItemIcon = {
  width: 20,
  height: 20,
  display: 'inline-block',
  float: 'left',
  position: 'relative',
};

const EventItem = ({ i, ikey }) => {
  const { itemEvent, setItemEvent } = useEventContext();

  return (
    <div
      key={`event-item-${i.name}`}
      className={`${itemEvent.name === i.name ? 'selected' : ''}`}
      style={styledItem}
      onClick={() =>
        setItemEvent({
          ...i,
          itemType: ikey,
        })
      }
    >
      <img
        src={'./' + ikey + '/' + i.icon}
        style={styledItemIcon}
        alt={i.name}
      />
      {i.name}
    </div>
  );
};

EventItem.propTypes = {
  i: PropTypes.object.isRequired,
  ikey: PropTypes.string.isRequired,
};

export default EventItem;
