import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

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
      gameMaster,
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
                if (sc.userUid !== gameMaster) {
                  return (
                    <div
                      key={"viewer-" + sc.userUid}
                      onClick={() => removeViewerFromEvent(sc.userUid)}
                      style={styledViewer}
                    >
                      {sc.name}
                    </div>
                  );
                }
              } else if (isGameMaster) {
                if (sc.userUid !== gameMaster) {
                  return (
                    <div
                      key={"viewer-" + sc.userUid}
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
              }
              return null;
            })
          : storyCharacters.map(sc => {
              if (sc.userUid !== gameMaster) {
                return (
                  <div
                    onClick={() => removeViewerFromEvent(sc.userUid)}
                    style={styledViewer}
                    key={"character-viewer-" + sc.userUid}
                  >
                    {sc.name}
                  </div>
                );
              }
              return null;
            })}
        {`)`}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  isGameMaster: store.appState.isGameMaster,
  gameMaster: store.appState.gameMaster,
  currentEvent: store.events.currentEvent,
  eventHistory: store.events.history,
  storyCharacters: store.team.characters,
});

EventModalViewers.propTypes = {
  removeViewerFromEvent: PropTypes.func.isRequired,
  addViewerToEvent: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(EventModalViewers);
