import React from 'react';
import PropTypes from 'prop-types';
import './Buttons.css';

const ButtonLarge = ({ className, children, style, onClick, disabled }) => {
  return (
    <button
      className={'styledButtonLarge ' + className}
      style={{
        width: 167,
        height: 25,
        padding: '5px 15px',
        ...style,
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

ButtonLarge.defaultProps = {
  className: '',
  style: {},
  disabled: false,
};

ButtonLarge.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default ButtonLarge;
