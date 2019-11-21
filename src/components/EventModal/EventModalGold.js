import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ButtonLarge from "../Utils/ButtonLarge";

const styledEventActionContainer = {
  width: '100%',
  height: 50,
  marginTop: 40,
  marginBottom: 10,
  textAlign: 'center',
  float: 'left',
  position: 'relative',
  display: 'inline-block',
};

const styledEventAction = {
  margin: '0px 15px',
  padding: 5,
  textAlign: 'center',
  position: 'relative',
  display: 'inline-block',
};

class EventModalGold extends Component {
  render() {
    const {
      isGameMaster,
      event,
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
        {event.goldLeft > 0 && (
          <div>
            <ButtonLarge style={styledEventAction} onClick={takeAllGold}>
              Take all
            </ButtonLarge>
            <ButtonLarge onClick={takeEquivalentGold} style={styledEventAction}>
              Take your equal part
            </ButtonLarge>
            <div style={styledEventAction}>
              Take
              <input
                type="number"
                value={numberWanted}
                name="numberWanted"
                min={0}
                max={event.gold}
                onChange={e => {
                  onChange(e.target.name, parseInt(e.target.value, 10));
                }}
              />
              gold
              <ButtonLarge onClick={takeXGold}>Confirm</ButtonLarge>
            </div>
            <ButtonLarge style={styledEventAction} onClick={takeNothing}>
              Don't take any gold
            </ButtonLarge>
          </div>
        )}
        {event.goldLeft === 0 &&
          !isGameMaster && (
            <ButtonLarge style={styledEventAction} onClick={closeEvent}>
              Close Event
            </ButtonLarge>
          )}
        {isGameMaster && (
          <ButtonLarge style={styledEventAction} onClick={closeEvent}>
            Delete Event
          </ButtonLarge>
        )}
      </div>
    );
  }
}

EventModalGold.propTypes = {
  isGameMaster: PropTypes.bool.isRequired,
  event: PropTypes.object.isRequired,
  numberWanted: PropTypes.number.isRequired,
  closeEvent: PropTypes.func.isRequired,
  takeNothing: PropTypes.func.isRequired,
  takeXGold: PropTypes.func.isRequired,
  takeAllGold: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  takeEquivalentGold: PropTypes.func.isRequired,
};

export default EventModalGold;
