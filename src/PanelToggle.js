import React from 'react';
import PropTypes from 'prop-types';

const styledSemiBoxHeader = {
  width: '50%',
  height: 20,
  marginBottom: 5,
  textAlign: 'center',
  float: 'left',
  display: 'inline-block',
  position: 'relative',
};

const PanelToggle = ({ toggleIsOnMap, toggleIsOnSpell }) => {
  return (
    <div>
      <div
        style={styledSemiBoxHeader}
        onClick={() => {
          toggleIsOnMap(true);
          toggleIsOnSpell(false);
        }}
      >
        Modifier la carte
      </div>
      <div style={styledSemiBoxHeader} onClick={() => toggleIsOnSpell(true)}>
        Générateur de sorts
      </div>
    </div>
  );
};

PanelToggle.propTypes = {
  toggleIsOnMap: PropTypes.func.isRequired,
  toggleIsOnSpell: PropTypes.func.isRequired,
};

export default PanelToggle;
