import React from "react";
import PropTypes from "prop-types";

const SelectMapper = ({ mapArray, value, onChange, style = {} }) => {
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
};

SelectMapper.propTypes = {
  mapArray: PropTypes.array.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.object,
};

export default SelectMapper;
