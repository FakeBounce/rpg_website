import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import EventViewers from "./EventViewers";
import EventItemForm from "./EventItemForm";
import EventGoldForm from "./EventGoldForm";
import EventTypeSelector from "./EventTypeSelector";
import { heightLeft } from "../Utils/StyleConstants";
import { colors } from "../Utils/Constants";
import { connect } from "react-redux";

const styledEventContainer = {
  width: "50%",
  height: `${heightLeft / 2}px`,
  position: "relative",
  float: "left",
  display: "inline-block",
  overflowY: "auto",
  alignItems: "center",
  backgroundColor: colors.background,
  color: colors.text,
  borderBottom: "1px solid white",
};

class EventPanel extends Component {
  state = {
    eventType: "",
    goldEvent: 0,
    quantityEvent: 0,
    descriptionEvent: "",
    itemEvent: {},
    viewers: [],
  };

  addToViewer = uid => {
    const { viewers } = this.state;
    const newViewersTab = [...viewers];
    newViewersTab.push(uid);
    this.setState(state => ({
      ...state,
      viewers: newViewersTab,
    }));
  };

  removeToViewer = uid => {
    const { viewers } = this.state;
    const newViewersTab = [...viewers];
    newViewersTab.map((v, index) => {
      if (v === uid) {
        newViewersTab.splice(index, 1);
      }
      return null;
    });
    this.setState(state => ({
      ...state,
      viewers: newViewersTab,
    }));
  };

  onChange = (name, value) => {
    const obj = {};
    obj[name] = value;

    if (name === "eventType") {
      this.setState(state => ({
        ...state,
        ...obj,
        viewers: [],
        goldEvent: 0,
        itemEvent: {},
      }));
    } else {
      this.setState(state => ({
        ...state,
        ...obj,
      }));
    }
  };

  createEvent = () => {
    const { eventHistory, currentStory, gameMaster } = this.props;
    const {
      eventType,
      goldEvent,
      descriptionEvent,
      itemEvent,
      quantityEvent,
      viewers,
    } = this.state;
    const newEventHistory = [...eventHistory];
    if (eventType === "gold" || eventType === "debt") {
      newEventHistory.push({
        type: eventType,
        gold: parseInt(goldEvent, 10),
        goldLeft: eventType === "gold" ? parseInt(goldEvent, 10) : 0,
        description: descriptionEvent,
        isActive: true,
        hasViewed: [gameMaster],
        viewers: viewers.length === 0 ? null : viewers,
      });
    } else if (eventType === "item") {
      newEventHistory.push({
        type: eventType,
        item: itemEvent,
        quantity: parseInt(quantityEvent, 10),
        quantityLeft: parseInt(quantityEvent, 10),
        description: descriptionEvent,
        isActive: true,
        hasViewed: [gameMaster],
        viewers: viewers.length === 0 ? null : viewers,
      });
    } else if (eventType === "draw") {
      newEventHistory.push({
        type: eventType,
        isActive: true,
        hasViewed: [gameMaster],
        viewers: null,
      });
    }

    firebase
      .database()
      .ref("stories/" + currentStory + "/events")
      .set(newEventHistory)
      .catch(error => {
        // Handle Errors here.
        this.props.triggerError(error);
      });
    firebase
      .database()
      .ref("stories/" + currentStory + "/currentEvent")
      .set(newEventHistory.length - 1)
      .catch(error => {
        // Handle Errors here.
        this.props.triggerError(error);
      });
  };

  render() {
    const { items } = this.props;
    const {
      eventType,
      goldEvent,
      descriptionEvent,
      quantityEvent,
      itemEvent,
      viewers,
    } = this.state;
    return (
      <div style={styledEventContainer} className="scrollbar">
        <EventTypeSelector eventType={eventType} onChange={this.onChange} />
        {(eventType === "gold" || eventType === "debt") && (
          <EventGoldForm
            goldEvent={goldEvent}
            descriptionEvent={descriptionEvent}
            onChange={this.onChange}
            eventType={eventType}
          />
        )}
        {eventType === "item" && (
          <EventItemForm
            items={items}
            descriptionEvent={descriptionEvent}
            quantityEvent={quantityEvent}
            itemEvent={itemEvent}
            onChange={this.onChange}
          />
        )}
        {eventType === "draw" && <Fragment />}
        <EventViewers
          viewers={viewers}
          removeToViewer={this.removeToViewer}
          addToViewer={this.addToViewer}
        />
        <button onClick={this.createEvent}>Create</button>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  currentStory: store.appState.currentStory,
  gameMaster: store.appState.gameMaster,
  eventHistory: store.events.history,
});

EventPanel.defaultProps = {
  items: null,
};

EventPanel.propTypes = {
  items: PropTypes.object,
};

export default connect(mapStateToProps)(EventPanel);
