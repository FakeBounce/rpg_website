import React from 'react';
import PropTypes from 'prop-types';
import { widthRightPanelLeft } from './StyleConstants';
import { colors } from './Constants';

const styledHealthBar = {
  boxSizing: 'border-box',
  width: `${widthRightPanelLeft}px`,
  height: 20,
  padding: 5,
  background: colors.backgroundHealthbar,
  borderRadius: 5,
  position: 'relative',
  float: 'left',
  display: 'inline-block',
  marginBottom: 5,
};

const styledBar = {
  background: colors.backgroundBar,
  position: 'relative',
  height: 10,
  transition: 'width .5s linear',
};

const styledHealthText = {
  width: '100%',
  position: 'absolute',
  textAlign: 'center',
  fontSize: 12,
  marginTop: -12,
  color: colors.healthBarText,
};

const HealthBar = ({
  width,
  maxWidth = '100%',
  isGM = false,
  health = -1,
  maxHealth = -1,
}) => {
  return (
    <div
      style={{
        ...styledHealthBar,
        width: maxWidth,
      }}
    >
      <div
        style={{
          ...styledBar,
          width,
          background: isGM ? colors.purple400 : colors.backgroundBar,
        }}
      />

      {health > -1 && maxHealth > -1 && (
        <div style={styledHealthText}>
          {health} / {maxHealth}
        </div>
      )}
    </div>
  );
};

HealthBar.propTypes = {
  width: PropTypes.string.isRequired,
  maxWidth: PropTypes.string,
  isGM: PropTypes.bool,
  health: PropTypes.number,
  maxHealth: PropTypes.number,
};

export default HealthBar;
