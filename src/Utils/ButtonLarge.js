import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ButtonLarge extends Component {
  render() {
    const { className, text, style, onClick, disabled } = this.props;

    return (
      <button
        className={className}
        style={style}
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </button>
    );
  }
}

ButtonLarge.defaultProps = {
  className: '',
  style: {},
  disabled: false,
};

ButtonLarge.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  style: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default ButtonLarge;
