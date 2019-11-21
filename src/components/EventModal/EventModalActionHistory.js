import React, { Component } from "react";
import PropTypes from "prop-types";

const styledActionHistory = {
  width: "100%",
  height: 20,
  marginBottom: 5,
  textAlign: "center",
  float: "left",
  position: "relative",
  display: "inline-block",
};

const styledActionHistoryContainer = {
  width: "50%",
  height: 180,
  marginTop: 40,
  marginBottom: 10,
  textAlign: "center",
  float: "left",
  position: "relative",
  display: "inline-block",
  overflowY: "auto",
};

class EventModalActionHistory extends Component {
  render() {
    const { currentEvent, eventHistory } = this.props;

    return (
      <div style={styledActionHistoryContainer}>
        {eventHistory[currentEvent].actionHistory &&
          eventHistory[currentEvent].actionHistory.length > 0 &&
          eventHistory[currentEvent].actionHistory.map(ah => {
            return (
              <div key={`action-history-${ah}`} style={styledActionHistory}>
                {ah}
              </div>
            );
          })}
      </div>
    );
  }
}

EventModalActionHistory.propTypes = {
  currentEvent: PropTypes.number.isRequired,
  eventHistory: PropTypes.array.isRequired,
};

export default EventModalActionHistory;