import React from 'react';
import PropTypes from 'prop-types';

import { imageSize, widthRightPanelLeft } from '../Utils/StyleConstants';

const styles = {
  characterTeamHeaderInfo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const TeamCharacterInfo = ({ title, text = '' }) => {
  return (
    <div
      style={{
        ...styles.characterTeamHeaderInfo,
        width: '100%',
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
