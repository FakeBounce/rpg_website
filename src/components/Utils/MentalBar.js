import React from 'react';
import PropTypes from 'prop-types';
import { widthRightPanelLeft } from './StyleConstants';
import { colors } from './Constants';

const styledMentalBar = {
  boxSizing: 'border-box',
  width: `${widthRightPanelLeft}px`,
  height: 20,
  padding: 5,
  background: colors.backgroundMentalbar,
  borderRadius: 5,
  position: 'relative',
  float: 'left',
  display: 'inline-block',
  marginBottom: 2,
};

const styledBar = {
  background: colors.mentalBar,
  position: 'relative',
  height: 10,
  transition: 'width .5s linear',
};

const styledMentalText = {
  width: '100%',
  position: 'absolute',
  textAlign: 'center',
  fontSize: 12,
  marginTop: -12,
  color: colors.mentalBarText,
};

const MentalBar = ({
  width,
  maxWidth = '100%',
  isGM = false,
  mentalState,
  maxMentalState,
}) => {
  const getMentalPointsSeparation = () => {
    const toDisplay = [];

    for (let i = 0; i < maxMentalState - 1 && i < mentalState - 1; i++) {
      toDisplay.push(
        <div
          style={{
            borderRight: '1px solid',
            borderColor: colors.backgroundMentalHit,
            width: (maxMentalState * 14 - 10) / maxMentalState,
            height: 10,
          }}
        />,
      );
    }
    return toDisplay;
  };

  return (
    <div
      style={{
        ...styledMentalBar,
        width: maxWidth,
      }}
    >
      <div
        style={{
          ...styledBar,
          width,
          background: isGM ? colors.purple400 : colors.mentalBar,
        }}
      />
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          zIndex: 3,
          left: 5,
          top: 5,
        }}
      >
        {getMentalPointsSeparation()}
      </div>
    </div>
  );
};

MentalBar.propTypes = {
  width: PropTypes.string.isRequired,
  maxWidth: PropTypes.string,
  isGM: PropTypes.bool,
  mentalState: PropTypes.number.isRequired,
  maxMentalState: PropTypes.number.isRequired,
};

export default MentalBar;
