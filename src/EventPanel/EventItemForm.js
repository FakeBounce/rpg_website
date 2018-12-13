import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import EventItem from './EventItem';
import { sortAlphabetical } from '../Utils/Functions';

const styledItemList = {
  width: '100%',
  height: 210,
  display: 'inline-block',
  float: 'left',
  position: 'relative',
  overflowY: 'auto',
};

class EventItemForm extends PureComponent {
  state = {
    filteredItems: [],
  };

  componentDidMount() {
    const { items } = this.props;
    const filteredItems = [];
    Object.keys(items).map(ikey => {
      if (ikey !== 'runes' && ikey !== 'enhancements') {
        Object.keys(items[ikey]).map(key => {
          return filteredItems.push({ ...items[ikey][key], itemType: ikey });
        });
      }
      return null;
    });

    sortAlphabetical(filteredItems);
    this.setState(state => ({
      ...state,
      filteredItems,
    }));
  }

  render() {
    const { descriptionEvent, quantityEvent, itemEvent, onChange } = this.props;
    const { filteredItems } = this.state;

    return (
      <div>
        <div style={styledItemList}>
          {filteredItems.map(i => {
            return (
              <EventItem
                key={`event-item-${i.itemType}-${i.name}`}
                itemEvent={itemEvent}
                onChange={onChange}
                i={i}
                ikey={i.itemType}
              />
            );
          })}
        </div>
        <input
          type="number"
          value={quantityEvent}
          name="quantityEvent"
          onChange={e => {
            onChange(e.target.name, e.target.value);
          }}
        />
        <input
          type="text"
          value={descriptionEvent}
          name="descriptionEvent"
          onChange={e => {
            onChange(e.target.name, e.target.value);
          }}
        />
      </div>
    );
  }
}

EventItemForm.propTypes = {
  items: PropTypes.object.isRequired,
  descriptionEvent: PropTypes.string.isRequired,
  quantityEvent: PropTypes.number.isRequired,
  itemEvent: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default EventItemForm;
