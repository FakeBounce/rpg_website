import React, { Component } from "react";
import PropTypes from "prop-types";

const styledEventActionContainer = {
  width: "100%",
  height: 50,
  marginTop: 40,
  marginBottom: 10,
  textAlign: "center",
  float: "left",
  position: "relative",
  display: "inline-block",
};

const styledEventAction = {
  margin: "0px 15px",
  padding: 5,
  textAlign: "center",
  position: "relative",
  display: "inline-block",
};

class EventModalItem extends Component {
  render() {
    const {
      isGameMaster,
      currentEvent,
      eventHistory,
      numberWanted,
      closeEvent,
      takeNothing,
      lastItem,
      onlyOneItem,
      takeXItem,
      takeAllItems,
      onChange,
    } = this.props;

    return (
      <div style={styledEventActionContainer}>
        {eventHistory[currentEvent].quantityLeft > 1 && (
          <button style={styledEventAction} onClick={takeAllItems}>
            Take all
          </button>
        )}
        {eventHistory[currentEvent].quantityLeft > 1 && (
          <div style={styledEventAction}>
            Take
            <input
              type="number"
              value={numberWanted}
              name="numberWanted"
              min={0}
              max={eventHistory[currentEvent].quantityLeft}
              onChange={e => {
                onChange(e.target.name, parseInt(e.target.value, 10));
              }}
            />
            {eventHistory[currentEvent].item.name}
            <button onClick={takeXItem}>Confirm</button>
          </div>
        )}
        {eventHistory[currentEvent].quantityLeft > 1 && (
          <button style={styledEventAction} onClick={onlyOneItem}>
            Take only 1
          </button>
        )}
        {eventHistory[currentEvent].quantityLeft === 1 && (
          <button style={styledEventAction} onClick={lastItem}>
            Take it
          </button>
        )}
        {eventHistory[currentEvent].quantityLeft > 0 && (
          <button style={styledEventAction} onClick={takeNothing}>
            Not interested
          </button>
        )}
        {eventHistory[currentEvent].quantityLeft === 0 &&
          !isGameMaster && (
            <button style={styledEventAction} onClick={closeEvent}>
              Close Event
            </button>
          )}
        {isGameMaster && (
          <button style={styledEventAction} onClick={closeEvent}>
            Delete Event
          </button>
        )}
      </div>
    );
  }
}

EventModalItem.propTypes = {
  isGameMaster: PropTypes.bool.isRequired,
  currentEvent: PropTypes.number.isRequired,
  numberWanted: PropTypes.number.isRequired,
  eventHistory: PropTypes.array.isRequired,
  closeEvent: PropTypes.func.isRequired,
  takeNothing: PropTypes.func.isRequired,
  lastItem: PropTypes.func.isRequired,
  onlyOneItem: PropTypes.func.isRequired,
  takeXItem: PropTypes.func.isRequired,
  takeAllItems: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default EventModalItem;
