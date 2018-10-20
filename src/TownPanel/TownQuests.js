import React, { Component } from "react";
import { heightLeft } from "../Utils/StyleConstants";

import PropTypes from "prop-types";
import TownQuest from "./TownQuest";

const styledBoxHeader = {
  width: "100%",
  height: "20px",
  marginBottom: "5px",
  textAlign: "center",
  float: "left",
  display: "inline-block",
  position: "relative",
};

const styledSemiContainer = {
  width: "100%",
  height: `${heightLeft / 4 - 40}px`,
  display: "inline-block",
  float: "left",
  position: "relative",
  overflowY: "auto",
};

class TownQuests extends Component {
  render() {
    const {
      currentTown,
      quests,
      toggleRightPanel,
      validateQuest,
      removeQuestFromTown,
    } = this.props;
    return (
      <div>
        <div onClick={() => toggleRightPanel(true)} style={styledBoxHeader}>
          Quests
        </div>
        <div style={styledSemiContainer}>
          {quests.map((q, i) => {
            if (q.town === currentTown) {
              return (
                <TownQuest
                  q={q}
                  i={i}
                  validateQuest={validateQuest}
                  removeQuestFromTown={removeQuestFromTown}
                />
              );
            }
          })}
        </div>
      </div>
    );
  }
}

TownQuests.propTypes = {
  currentTown: PropTypes.number.isRequired,
  quests: PropTypes.array.isRequired,
  toggleRightPanel: PropTypes.func.isRequired,
  removeQuestFromTown: PropTypes.func.isRequired,
  validateQuest: PropTypes.func.isRequired,
};

export default TownQuests;
