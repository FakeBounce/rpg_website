import React from 'react';

import PropTypes from 'prop-types';
import { styledCadre } from './StyleConstants';

const Cadre = ({ style = styledCadre }) => {
  return <img src={'./common/cadre.png'} style={{ ...style }} alt='Cadre' />;
};

Cadre.propTypes = {
  style: PropTypes.object,
};

export default Cadre;
