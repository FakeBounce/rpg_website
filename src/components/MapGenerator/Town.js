import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { cursorPointer } from '../Utils/StyleConstants';

const styledItem = {
  display: 'flex',
  cursor: cursorPointer,
  flex: 1,
  height: '100%',
};
const styledIcon = {
  width: '100%',
  height: '100%',
};

const Town = ({ town, showTownList, cancelTownList, isCurrent }) => {
  return (
    <div
      style={styledItem}
      onClick={() => {
        if (isCurrent) {
          showTownList(town);
        } else {
          cancelTownList();
        }
      }}
      data-tip={town.name}
    >
      <img
        src={'./map/town-size-' + town.size + '.jpg'}
        style={styledIcon}
        alt={town.name}
      />
      <ReactTooltip />
    </div>
  );
};

Town.defaultProps = {
  cancelTownList: () => {},
};

Town.propTypes = {
  town: PropTypes.object.isRequired,
  showTownList: PropTypes.func.isRequired,
  cancelTownList: PropTypes.func,
  isCurrent: PropTypes.bool.isRequired,
};

export default Town;
