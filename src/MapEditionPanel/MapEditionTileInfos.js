import React, { Component } from "react";
import PropTypes from "prop-types";
import { towns } from "../Utils/Constants";

const styledBoxHeader = {
  width: "100%",
  height: "20px",
  marginBottom: "5px",
  textAlign: "center",
  float: "left",
  display: "inline-block",
  position: "relative",
};

class MapEditionTileInfos extends Component {
  render() {
    const {
      currentTile,
      onChange,
      toggleIsCurrent,
      toggleHasTown,
      townToAssign,
    } = this.props;
    return (
      <div>
        <div style={styledBoxHeader}>Modifier la case :</div>
        {Object.keys(currentTile).length > 0 && (
          <div>
            environment : {currentTile.environment}
            <br />
            hasFog : {currentTile.hasFog}
            <br />
            hasTown : {currentTile.hasTown}
            <input
              type="number"
              name="townToAssign"
              value={townToAssign}
              onChange={e => onChange(parseInt(e.target.value, 10))}
            />
            {
              currentTile.hasTown > -1 && <div>
                Town name : {towns[currentTile.hasTown].name}
                <br /></div>
            }
            <button onClick={() => toggleHasTown}>Validate</button>
            <br />
            isCurrent : {currentTile.isCurrent}
            <button onClick={toggleIsCurrent}>Toggle current</button>
            <br />x :{currentTile.x}
            <br />y : {currentTile.y}
          </div>
        )}
      </div>
    );
  }
}

MapEditionTileInfos.propTypes = {
  currentTile: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  toggleIsCurrent: PropTypes.func.isRequired,
  toggleHasTown: PropTypes.func.isRequired,
  townToAssign: PropTypes.number.isRequired,
};

export default MapEditionTileInfos;
