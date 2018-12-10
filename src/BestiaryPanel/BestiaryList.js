import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  cursorPointer,
  heightLeft,
  widthListPanelBestiary,
} from '../Utils/StyleConstants';
import ButtonLarge from '../Utils/ButtonLarge';

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
    const {
      isGameMaster,
      filteredBestiary,
      selectBeast,
      toggleSeenBeast,
    } = this.props;

    return (
      <div style={styledPreview}>
        {filteredBestiary.map((b, i) => {
          if (b.seen || isGameMaster) {
            return (
              <div
                style={{
                  height: 50,
                  position: 'relative',
                  cursor: cursorPointer,
                }}
                onClick={() => selectBeast(i)}
              >
                <img
                  src={'./bestiary/' + b.image}
                  style={styledImage}
                  alt={b.image}
                />
                {b.name}
                {isGameMaster && `(${b.seen ? 'Seen' : 'Unknown'})`}
                <ButtonLarge
                  style={{
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                    zIndex: 1,
                    maxWidth: 100,
                    cursor: cursorPointer,
                  }}
                  onClick={() => toggleSeenBeast(i)}
                >
                  Toggle Seen
                </ButtonLarge>
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
  toggleSeenBeast: PropTypes.func.isRequired,
};

export default BestiaryList;
