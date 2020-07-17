import React from 'react';
import PropTypes from 'prop-types';
import { cursorPointer } from '../Utils/StyleConstants';

const styledTownHeader = {
  width: '100%',
  borderBottom: '1px solid white',
  cursor: cursorPointer,
};

const TownsHistoryListHeader = ({ showCity, index, townKey }) => {
  return (
    <div
      style={{
        ...styledTownHeader,
        borderTop: index !== 0 ? '1px solid white' : '',
      }}
      onClick={() => showCity(townKey)}
    >
      {townKey} :
    </div>
  );
};

TownsHistoryListHeader.propTypes = {
  showCity: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  townKey: PropTypes.string.isRequired,
};

export default TownsHistoryListHeader;
