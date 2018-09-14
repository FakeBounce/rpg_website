import React, { Component } from 'react';
import PropTypes from "prop-types";

class HasNoPseudo extends Component {
  render() {
    const {
      pseudoInput,
      onChange,
      choosePseudo,
    } = this.props;
    
    return (
      <div>
        <input
          type="text"
          name="pseudoInput"
          placeholder="pseudo"
          value={pseudoInput}
          onChange={e => {
            onChange(
              e.target.name,
              e.target.value
            );
          }}
        />
        <button onClick={choosePseudo}>
          Choisir un pseudo
        </button>
      </div>
    );
  }
}

HasNoPseudo.propTypes = {
  pseudoInput: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  choosePseudo: PropTypes.func.isRequired,
};

export default HasNoPseudo;
