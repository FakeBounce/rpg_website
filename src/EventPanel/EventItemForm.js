import React, { Component } from "react";
import PropTypes from "prop-types";
import EventItem from "./EventItem";

const styledItemList = {
  width: "100%",
  height: 210,
  display: "inline-block",
  float: "left",
  position: "relative",
  overflowY: "auto",
};

class EventItemForm extends Component {
  render() {
    const {
      items,
      descriptionEvent,
      quantityEvent,
      itemEvent,
      onChange,
    } = this.props;

    return (
      <div>
        <div style={styledItemList}>
          {Object.keys(items).map(ikey => {
            return items[ikey].map(i => {
              return (
                <EventItem
                  key={`event-item-${i.name}`}
                  itemEvent={itemEvent}
                  onChange={onChange}
                  i={i}
                  ikey={ikey}
                />
              );
            });
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
