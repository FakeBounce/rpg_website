import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { heightLeft, widthListPanelBestiary } from '../Utils/StyleConstants';

const styledImage = {
  position: 'relative',
  float: 'left',
  width: 50,
  height: 50,
};

const styledPreview = {
  width: widthListPanelBestiary,
  height: heightLeft - 25,
  overflowY: 'auto',
  display: 'inline-block',
  float: 'left',
};

class BestiaryList extends Component {
  render() {
    const { isGameMaster, filteredBestiary, selectBeast } = this.props;

    return (
      <div style={styledPreview}>
        {filteredBestiary.map((b, i) => {
          if (b.seen || isGameMaster) {
            return (
              <div style={{ height: 50 }} onClick={() => selectBeast(i)}>
                <img
                  src={'./bestiary/' + b.image}
                  style={styledImage}
                  alt={b.image}
                />
                {b.name}
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  }
}

BestiaryList.propTypes = {
  isGameMaster: PropTypes.bool.isRequired,
  filteredBestiary: PropTypes.array.isRequired,
  selectBeast: PropTypes.func.isRequired,
};

export default BestiaryList;
