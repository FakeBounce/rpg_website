import React, { Component } from "react";
import PropTypes from "prop-types";

const styledEventActionContainer = {
  width: "100%",
  height: 50,
  marginTop: 10,
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

class EventGold extends Component {
  render() {
    const {
      isGameMaster,
      currentEvent,
      eventHistory,
      numberWanted,
      closeEvent,
      takeNothing,
      takeXGold,
      takeAllGold,
      onChange,
      takeEquivalentGold,
    } = this.props;

    return (
      <div style={styledEventActionContainer}>
        {eventHistory[currentEvent].goldLeft > 0 && (
          <div>
            <button style={styledEventAction} onClick={takeAllGold}>
              Take all
            </button>
            <button onClick={takeEquivalentGold} style={styledEventAction}>
              Take your equal part
            </button>
            <div style={styledEventAction}>
              Take
              <input
                type="number"
                value={numberWanted}
                name="numberWanted"
                min={0}
                max={eventHistory[currentEvent].gold}
                onChange={e => {
                  onChange(e.target.name, parseInt(e.target.value, 10));
                }}
              />
              gold
              <button onClick={takeXGold}>Confirm</button>
            </div>
            <button style={styledEventAction} onClick={takeNothing}>
              Don't take any gold
            </button>
          </div>
        )}
        {eventHistory[currentEvent].goldLeft === 0 &&
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

EventGold.propTypes = {
  isGameMaster: PropTypes.bool.isRequired,
  currentEvent: PropTypes.number.isRequired,
  numberWanted: PropTypes.number.isRequired,
  eventHistory: PropTypes.array.isRequired,
  closeEvent: PropTypes.func.isRequired,
  takeNothing: PropTypes.func.isRequired,
  takeXGold: PropTypes.func.isRequired,
  takeAllGold: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  takeEquivalentGold: PropTypes.func.isRequired,
};

export default EventGold;
