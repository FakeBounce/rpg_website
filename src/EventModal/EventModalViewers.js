import React, { Component } from "react";
import PropTypes from "prop-types";

const styledBoxHeader = {
  width: "100%",
  height: "20px",
  marginBottom: "5px",
  textAlign: "center",
  float: "left",
  position: "relative",
  display: "inline-block",
};

const styledViewer = {
  height: 20,
  marginLeft: 20,
  marginRight: 20,
  textAlign: "center",
  position: "relative",
  display: "inline-block",
};

const styledNoViewer = {
  border: "1px solid red",
};

class EventModalViewers extends Component {
  render() {
    const {
      isGameMaster,
      currentEvent,
      eventHistory,
      storyCharacters,
      removeViewerFromEvent,
      addViewerToEvent,
    } = this.props;

    return (
      <div style={styledBoxHeader}>
        {`(`}
        {eventHistory[currentEvent].viewers
          ? storyCharacters.map(sc => {
              let isAViewer = false;
              eventHistory[currentEvent].viewers.map(v => {
                if (sc.userUid === v) {
                  isAViewer = true;
                }
                return null;
              });
              if (isAViewer) {
                return (
                  <div
                    onClick={() => removeViewerFromEvent(sc.userUid)}
                    style={styledViewer}
                  >
                    {sc.name}
                  </div>
                );
              } else if (isGameMaster) {
                return (
                  <div
                    onClick={() => addViewerToEvent(sc.userUid)}
                    style={{
                      ...styledViewer,
                      ...styledNoViewer,
                    }}
                  >
                    {sc.name}
                  </div>
                );
              }
              return null;
            })
          : storyCharacters.map(sc => {
              return (
                <div
                  onClick={() => removeViewerFromEvent(sc.userUid)}
                  style={styledViewer}
                >
                  {sc.name}
                </div>
              );
            })}
        {`)`}
      </div>
    );
  }
}

EventModalViewers.propTypes = {
  isGameMaster: PropTypes.bool.isRequired,
  currentEvent: PropTypes.number.isRequired,
  eventHistory: PropTypes.array.isRequired,
  storyCharacters: PropTypes.array.isRequired,
  removeViewerFromEvent: PropTypes.func.isRequired,
  addViewerToEvent: PropTypes.func.isRequired,
};

export default EventModalViewers;
