import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  cursorPointer,
  heightLeft,
  widthListPanelBestiary,
} from '../Utils/StyleConstants';
import ButtonLarge from '../Utils/ButtonLarge';
import { colors } from '../Utils/Constants';

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
      displayMonsterForm,
    } = this.props;

    return (
      <div style={styledPreview} className="scrollbar">
        {Object.keys(filteredBestiary).map(bKey => {
          if (filteredBestiary[bKey].seen || isGameMaster) {
            return (
              <div
                style={{
                  height: 50,
                  position: 'relative',
                  cursor: cursorPointer,
                  borderBottom: isGameMaster ? '1px solid black' : 'none',
                  color:
                    isGameMaster && filteredBestiary[bKey].seen
                      ? colors.textSeen
                      : colors.text,
                }}
                onClick={() => selectBeast(bKey)}
              >
                <img
                  src={'./bestiary/' + filteredBestiary[bKey].image}
                  style={styledImage}
                  alt={filteredBestiary[bKey].image}
                />
                {filteredBestiary[bKey].name}
                {isGameMaster &&
                  ` (${filteredBestiary[bKey].seen ? 'S' : 'U'})`}
                {isGameMaster && (
                  <ButtonLarge
                    style={{
                      position: 'absolute',
                      right: 0,
                      bottom: 0,
                      zIndex: 1,
                      maxWidth: 50,
                      cursor: cursorPointer,
                    }}
                    onClick={() => toggleSeenBeast(bKey)}
                  >
                    TS
                  </ButtonLarge>
                )}
              </div>
            );
          }
          return null;
        })}
        {isGameMaster && (
          <div
            style={{
              height: 50,
              position: 'relative',
              cursor: cursorPointer,
            }}
            onClick={displayMonsterForm}
          >
            <img
              src={'./common/unknown_image_white.png'}
              style={styledImage}
              alt={'Unknown'}
            />
            Add a monster
          </div>
        )}
      </div>
    );
  }
}

BestiaryList.propTypes = {
  isGameMaster: PropTypes.bool.isRequired,
  filteredBestiary: PropTypes.array.isRequired,
  selectBeast: PropTypes.func.isRequired,
  toggleSeenBeast: PropTypes.func.isRequired,
  displayMonsterForm: PropTypes.func.isRequired,
};

export default BestiaryList;
