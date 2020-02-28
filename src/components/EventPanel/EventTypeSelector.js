import React, { Component } from "react";
import { eventList, toSemanticUIOptions } from "../Utils/Constants";

import PropTypes from "prop-types";
import { Select } from "semantic-ui-react";

const styledEventTypeContainer = {
  marginTop: 10,
  marginBottom: 10,
  paddingLeft: 10,
  paddingRight: 10,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

class EventTypeSelector extends Component {
  render() {
    const { eventType, onChange } = this.props;
    return (
      <div style={styledEventTypeContainer}>
        <div>Event type :</div>
        <Select
          value={eventType}
          onChange={(e, { value }) => {
            onChange("eventType", value);
          }}
          placeholder="Select your event type"
          options={toSemanticUIOptions(eventList)}
        />
      </div>
    );
  }
}

EventTypeSelector.propTypes = {
  eventType: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default EventTypeSelector;
