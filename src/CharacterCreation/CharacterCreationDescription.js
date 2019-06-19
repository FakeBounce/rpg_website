import React, { Component } from "react";
import PropTypes from "prop-types";

class CharacterCreationDescription extends Component {
  render() {
    const { description, onChange } = this.props;

    return (
      <div>
        <textarea
          name="description"
          placeholder="description"
          value={description}
          onChange={e => {
            onChange(e.target.name, e.target.value);
          }}
        />
      </div>
    );
  }
}

CharacterCreationDescription.propTypes = {
  description: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CharacterCreationDescription;
