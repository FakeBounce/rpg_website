import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SelectMapper extends Component {
  render() {
    const { mapArray, value, onChange, style } = this.props;

    return (
      <select
        value={value}
        onChange={e => {
          onChange(e.target.value);
        }}
        style={style}
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

SelectMapper.defaultProps = {
  style: {},
};

SelectMapper.propTypes = {
  mapArray: PropTypes.array.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.object,
};

export default SelectMapper;
