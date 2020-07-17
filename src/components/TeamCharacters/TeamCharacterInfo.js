import React from 'react';
import PropTypes from 'prop-types';

import { imageSize, widthRightPanelLeft } from '../Utils/StyleConstants';

const styles = {
  characterTeamHeaderInfo: {
    position: 'relative',
    height: 25,
    float: 'left',
    display: 'inline-block',
  },
};

const TeamCharacterInfo = ({ title, text = '', doubleSized = false }) => {
  return (
    <div
      style={{
        ...styles.characterTeamHeaderInfo,
        width: doubleSized
          ? `${(widthRightPanelLeft - 20 + imageSize / 2) / 2}px`
          : `${(widthRightPanelLeft - 20 + imageSize / 2) / 4}px`,
      }}
    >
      {title}
      {text}
    </div>
  );
};

TeamCharacterInfo.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  doubleSized: PropTypes.bool,
};

export default TeamCharacterInfo;
