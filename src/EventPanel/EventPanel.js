import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import EventViewers from './EventViewers';
import EventItemForm from './EventItemForm';
import EventGoldForm from './EventGoldForm';
import EventTypeSelector from './EventTypeSelector';
import { heightLeft } from '../Utils/StyleConstants';

const styledEventContainer = {
  height: `${heightLeft / 2 - 26}px`,
  position: 'relative',
  float: 'left',
  display: 'inline-block',
  overflowY: 'auto',
};

class EventPanel extends Component {
  state = {
    eventType: '',
    goldEvent: 0,
    quantityEvent: 0,
    descriptionEvent: '',
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

    if (name === 'eventType') {
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
    if (eventType === 'gold') {
      newEventHistory.push({
        type: eventType,
        gold: parseInt(goldEvent, 10),
        goldLeft: parseInt(goldEvent, 10),
        description: descriptionEvent,
        isActive: true,
        hasViewed: [gameMaster],
        viewers: viewers.length === 0 ? null : viewers,
      });
    } else if (eventType === 'item') {
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
    }

    firebase
      .database()
      .ref('stories/' + currentStory + '/events')
      .set(newEventHistory)
      .catch(error => {
        // Handle Errors here.
        this.props.triggerError(error);
      });
    firebase
      .database()
      .ref('stories/' + currentStory + '/currentEvent')
      .set(newEventHistory.length - 1)
      .catch(error => {
        // Handle Errors here.
        this.props.triggerError(error);
      });
  };

  render() {
    const { storyCharacters, gameMaster, items } = this.props;
    const {
      eventType,
      goldEvent,
      descriptionEvent,
      quantityEvent,
      itemEvent,
      viewers,
    } = this.state;
    return (
      <div style={styledEventContainer}>
        <EventTypeSelector eventType={eventType} onChange={this.onChange} />
        {eventType === 'gold' && (
          <EventGoldForm
            goldEvent={goldEvent}
            descriptionEvent={descriptionEvent}
            onChange={this.onChange}
          />
        )}
        {eventType === 'item' && (
          <EventItemForm
            items={items}
            descriptionEvent={descriptionEvent}
            quantityEvent={quantityEvent}
            itemEvent={itemEvent}
            onChange={this.onChange}
          />
        )}
        <EventViewers
          storyCharacters={storyCharacters}
          gameMaster={gameMaster}
          viewers={viewers}
          removeToViewer={this.removeToViewer}
          addToViewer={this.addToViewer}
        />
        <button onClick={this.createEvent}>Create</button>
      </div>
    );
  }
}

EventPanel.propTypes = {
  items: PropTypes.object.isRequired,
  currentStory: PropTypes.number.isRequired,
  eventHistory: PropTypes.array.isRequired,
  storyCharacters: PropTypes.array.isRequired,
  gameMaster: PropTypes.string.isRequired,
};

export default EventPanel;
