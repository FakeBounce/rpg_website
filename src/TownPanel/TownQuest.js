import React, { Component } from "react";
import PropTypes from "prop-types";

const styledTownListItem = {
  width: "75%",
  height: "20px",
  marginBottom: "5px",
  textAlign: "center",
  float: "left",
  display: "inline-block",
  position: "relative",
  cursor: "pointer",
};

const styledTownListDiscover = {
  width: "25%",
  height: "20px",
  textAlign: "center",
  float: "left",
  display: "inline-block",
  position: "relative",
  cursor: "pointer",
};

class TownQuest extends Component {
  render() {
    const { removeQuestFromTown, q, i, validateQuest } = this.props;
    return (
      <div key={`quest-${q.name}`}>
        <div onClick={() => removeQuestFromTown(i)} style={styledTownListItem}>
          {q.name}
        </div>
        <button style={styledTownListDiscover} onClick={() => validateQuest(i)}>
          {q.validated ? "Complete" : "Validate"}
        </button>
      </div>
    );
  }
}

TownQuest.propTypes = {
  q: PropTypes.object.isRequired,
  i: PropTypes.number.isRequired,
  validateQuest: PropTypes.func.isRequired,
  removeQuestFromTown: PropTypes.func.isRequired,
};

export default TownQuest;