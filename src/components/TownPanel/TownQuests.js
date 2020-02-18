import React, { Component } from "react";
import { heightLeft } from "../Utils/StyleConstants";

import PropTypes from "prop-types";
import TownQuest from "./TownQuest";
import ButtonLarge from "../Utils/ButtonLarge";
import { colors } from "../Utils/Constants";
import { connect } from "react-redux";

const styledBoxHeader = {
  width: "100%",
  height: 30,
  paddingBottom: 5,
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
  backgroundColor: colors.background,
  color: "white",
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
        <ButtonLarge
          onClick={() => toggleRightPanel(true)}
          style={styledBoxHeader}
        >
          Quests
        </ButtonLarge>
        <div style={styledSemiContainer} className="scrollbar">
          {quests &&
            quests.map((q, i) => {
              if (q.town === currentTown) {
                return (
                  <TownQuest
                    key={`quests-list-${q.name}`}
                    q={q}
                    i={i}
                    validateQuest={validateQuest}
                    removeQuestFromTown={removeQuestFromTown}
                  />
                );
              }
              return null;
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  currentTown: store.mapInfos.currentTown,
  quests: store.mapInfos.quests,
});

TownQuests.propTypes = {
  toggleRightPanel: PropTypes.func.isRequired,
  removeQuestFromTown: PropTypes.func.isRequired,
  validateQuest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(TownQuests);
