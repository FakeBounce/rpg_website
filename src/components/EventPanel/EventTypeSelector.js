import React, { Component } from "react";
import { eventList } from "../Utils/Constants";

import PropTypes from "prop-types";

class EventTypeSelector extends Component {
  render() {
    const { eventType, onChange } = this.props;
    return (
      <div>
        Choose event type :
        <select
          value={eventType}
          name="eventType"
          onChange={e => {
            onChange(e.target.name, e.target.value);
          }}
        >
          {eventList.map(e => {
            return (
              <option key={e} value={e}>
                {e}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

EventTypeSelector.propTypes = {
  eventType: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default EventTypeSelector;
