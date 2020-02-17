import React, { Component } from "react";
import { connect } from "react-redux";

const styledEventDescription = {
  width: "50%",
  height: 210,
  marginTop: 10,
  marginBottom: 10,
  textAlign: "center",
  float: "left",
  position: "relative",
  display: "inline-block",
};

const styledEventImage = {
  width: "100%",
  height: 185,
  marginTop: 10,
  marginBottom: 10,
  textAlign: "center",
  float: "left",
  position: "relative",
  display: "inline-block",
};

const styledBoxHeader = {
  width: "100%",
  height: 20,
  marginBottom: 5,
  textAlign: "center",
  float: "left",
  position: "relative",
  display: "inline-block",
};

class EventModalDescription extends Component {
  render() {
    const { currentEvent, eventHistory } = this.props;

    return (
      <div style={styledEventDescription}>
        <div style={styledEventImage}>
          <img
            src={
              eventHistory[currentEvent].type === "gold" ||
              eventHistory[currentEvent].type === "debt"
                ? "./common/gold_purse.jpg"
                : "./" +
                  eventHistory[currentEvent].item.itemType +
                  "/" +
                  eventHistory[currentEvent].item.icon
            }
            style={{
              width: 185,
              height: 185,
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
        {eventHistory[currentEvent].type === "debt" && (
          <div style={styledBoxHeader}>
            CURRENT : {eventHistory[currentEvent].goldLeft} gold /{" "}
            {eventHistory[currentEvent].gold} gold
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

const mapStateToProps = store => ({
  currentEvent: store.events.currentEvent,
  eventHistory: store.events.history,
});

export default connect(mapStateToProps)(EventModalDescription);
