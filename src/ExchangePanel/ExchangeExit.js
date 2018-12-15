import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { cursorPointer } from '../Utils/StyleConstants';

const styledExitExchange = {
  position: 'absolute',
  right: 0,
  top: 0,
  width: 15,
  height: 15,
  backgroundColor: 'grey',
  cursor: cursorPointer,
};

class ExchangeExit extends Component {
  render() {
    const { closeExchange } = this.props;

    return (
      <div style={styledExitExchange} onClick={closeExchange}>
        X
      </div>
    );
  }
}

ExchangeExit.propTypes = {
  closeExchange: PropTypes.func.isRequired,
};

export default ExchangeExit;
