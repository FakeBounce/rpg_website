import React, { Component } from "react";
import PropTypes from "prop-types";

const styledActionHistory = {
  width: "100%",
  height: "20px",
  marginBottom: "5px",
  textAlign: "center",
  float: "left",
  position: "relative",
  display: "inline-block",
};

const styledActionHistoryContainer = {
  width: "60%",
  left: "20%",
  height: 150,
  marginTop: 10,
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
