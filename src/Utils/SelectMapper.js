import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SelectMapper extends Component {
  render() {
    const { mapArray, value, onChange } = this.props;

    return (
      <select
        value={value}
        onChange={e => {
          onChange(e.target.value);
        }}
      >
        {mapArray.map(options => {
          return (
            <option key={options} value={options}>
              {options}
            </option>
          );
        })}
      </select>
    );
  }
}

SelectMapper.propTypes = {
  mapArray: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SelectMapper;
