import React, { Component } from "react";
import PropTypes from "prop-types";

class CharacterCreationName extends Component {
  render() {
    const { name, onChange } = this.props;

    return (
      <div>
        <input
          type="text"
          name="name"
          placeholder="name"
          value={name}
          onChange={e => {
            onChange(e.target.name, e.target.value);
          }}
        />
      </div>
    );
  }
}

CharacterCreationName.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CharacterCreationName;
