import React, { Component } from 'react';

import PropTypes from 'prop-types';

class EventGoldForm extends Component {
  render() {
    const { goldEvent, descriptionEvent, onChange, eventType } = this.props;
    return (
      <div>
        <input
          type="number"
          value={goldEvent}
          name="goldEvent"
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

EventGoldForm.propTypes = {
  goldEvent: PropTypes.number.isRequired,
  descriptionEvent: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  eventType: PropTypes.string.isRequired,
};

export default EventGoldForm;
