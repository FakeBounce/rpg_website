import React, { Component } from "react";
import PropTypes from "prop-types";
import { attributes as namedAttributes } from "../Utils/Constants";

const styledBoxHeader = {
  width: "100%",
  height: 20,
  marginBottom: 5,
  textAlign: "center",
};

class CharacterCreationAttributes extends Component {
  render() {
    const { attributes, onChange, totalPointsleft } = this.props;

    return (
      <div>
        <div style={styledBoxHeader}>Attributes :</div>
        {namedAttributes.map(a => {
          return (
            <div key={`attribute-${a}`}>
              {a} :
              <input
                type="number"
                name={a}
                placeholder={a}
                value={attributes[a]}
                onChange={e => {
                  onChange(e.target.name, e.target.value);
                }}
                min="5"
                max="75"
              />
            </div>
          );
        })}
        <div>Total points left : {totalPointsleft}</div>
      </div>
    );
  }
}

CharacterCreationAttributes.propTypes = {
  attributes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  totalPointsleft: PropTypes.func.isRequired,
};

export default CharacterCreationAttributes;
