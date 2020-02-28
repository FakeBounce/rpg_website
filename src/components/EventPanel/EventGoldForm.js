import React, { Component } from "react";

import PropTypes from "prop-types";
import { Input } from "semantic-ui-react";

const styledEventGoldFormContainer = {
  marginTop: 10,
  marginBottom: 10,
  paddingLeft: 10,
  paddingRight: 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

class EventGoldForm extends Component {
  render() {
    const { goldEvent, descriptionEvent, onChange } = this.props;
    return (
      <div style={styledEventGoldFormContainer}>
        <Input
          type="number"
          placeholder="Total gold"
          name="goldEvent"
          value={goldEvent}
          onChange={e => {
            onChange(e.target.name, parseInt(e.target.value, 10));
          }}
          style={{ maxWidth: "40%" }}
        />
        <Input
          type="text"
          placeholder="Description"
          name="descriptionEvent"
          value={descriptionEvent}
          onChange={e => {
            onChange(e.target.name, e.target.value, 10);
          }}
          style={{ maxWidth: "50%" }}
        />
      </div>
    );
  }
}

EventGoldForm.propTypes = {
  goldEvent: PropTypes.number.isRequired,
  descriptionEvent: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default EventGoldForm;
