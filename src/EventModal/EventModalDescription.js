import React, { Component } from "react";
import PropTypes from "prop-types";

const styledEventImage = {
  width: "100%",
  height: 370,
  marginTop: 10,
  marginBottom: 10,
  textAlign: "center",
  float: "left",
  position: "relative",
  display: "inline-block",
};

const styledBoxHeader = {
  width: "100%",
  height: "20px",
  marginBottom: "5px",
  textAlign: "center",
  float: "left",
  position: "relative",
  display: "inline-block",
};

class EventModalDescription extends Component {
  render() {
    const { currentEvent, eventHistory } = this.props;

    return (
      <div>
        <div style={styledEventImage}>
          <img
            src={
              eventHistory[currentEvent].type === "gold"
                ? "./common/gold_purse.jpg"
                : "./" +
                  eventHistory[currentEvent].item.itemType +
                  "/" +
                  eventHistory[currentEvent].item.icon
            }
            style={{
              width: 350,
              height: 350,
            }}
            alt="Gold bag"
          />
        </div>
        {eventHistory[currentEvent].type === "gold" && (
          <div style={styledBoxHeader}>
            TOTAL : {eventHistory[currentEvent].goldLeft}
            gold
          </div>
        )}
        {eventHistory[currentEvent].type === "item" && (
          <div style={styledBoxHeader}>
            ({eventHistory[currentEvent].quantityLeft} left)
          </div>
        )}
        {eventHistory[currentEvent].description !== "" && (
          <div style={styledBoxHeader}>
            {eventHistory[currentEvent].description}
          </div>
        )}
      </div>
    );
  }
}

EventModalDescription.propTypes = {
  currentEvent: PropTypes.number.isRequired,
  eventHistory: PropTypes.array.isRequired,
};

export default EventModalDescription;
