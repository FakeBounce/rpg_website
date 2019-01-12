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

class EventModalDebt extends Component {
  render() {
    const {
      isGameMaster,
      event,
      numberWanted,
      closeEvent,
      giveXGold,
      giveAllGold,
      onChange,
      giveEquivalentGold,
    } = this.props;

    return (
      <div style={styledEventActionContainer}>
        {event.goldLeft < event.gold && (
          <div>
            <ButtonLarge style={styledEventAction} onClick={giveAllGold}>
              Give all
            </ButtonLarge>
            <ButtonLarge onClick={giveEquivalentGold} style={styledEventAction}>
              Give your equal part
            </ButtonLarge>
            <div style={styledEventAction}>
              Give
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
              <ButtonLarge onClick={giveXGold}>Confirm</ButtonLarge>
            </div>
          </div>
        )}
        {event.goldLeft === event.gold &&
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

EventModalDebt.propTypes = {
  isGameMaster: PropTypes.bool.isRequired,
  event: PropTypes.object.isRequired,
  numberWanted: PropTypes.number.isRequired,
  closeEvent: PropTypes.func.isRequired,
  giveXGold: PropTypes.func.isRequired,
  giveAllGold: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  giveEquivalentGold: PropTypes.func.isRequired,
};

export default EventModalDebt;
