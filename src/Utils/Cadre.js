import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { styledCadre } from './StyleConstants';

class Cadre extends Component {
  render() {
    const { style } = this.props;

    return <img src={'./common/cadre.png'} style={{ ...style }} alt="Cadre" />;
  }
}

Cadre.defaultProps = {
  style: styledCadre,
};

Cadre.propTypes = {
  style: PropTypes.object,
};

export default Cadre;
