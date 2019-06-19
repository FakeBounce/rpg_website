import React, { Component } from "react";
import PropTypes from "prop-types";

const styledBoxHeader = {
  width: "100%",
  height: 20,
  marginBottom: 5,
  textAlign: "center",
  float: "left",
  display: "inline-block",
  position: "relative",
};

class EventViewers extends Component {
  render() {
    const {
      storyCharacters,
      gameMaster,
      viewers,
      removeToViewer,
      addToViewer,
    } = this.props;

    return (
      <div>
        <div style={styledBoxHeader}> Viewers </div>
        {storyCharacters.map(sc => {
          if (gameMaster !== sc.userUid) {
            let isAViewer = false;
            viewers.map(v => {
              if (v === sc.userUid) {
                isAViewer = true;
              }
              return null;
            });
            return (
              <div
                key={`sc-viewer-${sc.userUid}`}
                onClick={
                  isAViewer
                    ? () => removeToViewer(sc.userUid)
                    : () => addToViewer(sc.userUid)
                }
              >
                {sc.name} {isAViewer ? "V" : "NV"}
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  }
}

EventViewers.propTypes = {
  storyCharacters: PropTypes.array.isRequired,
  gameMaster: PropTypes.string.isRequired,
  viewers: PropTypes.array.isRequired,
  removeToViewer: PropTypes.func.isRequired,
  addToViewer: PropTypes.func.isRequired,
};

export default EventViewers;
