import React from 'react';
import PropTypes from 'prop-types';
import {
  bestiaryFilters,
  bestiaryOrderBy,
  bestiaryOrderByType,
} from '../Utils/Constants';
import SelectMapper from '../Utils/SelectMapper';

const styledBestiaryHeader = {
  height: 25,
  width: '100%',
  marginTop: "10px",
};

const styledFilterContainer = {
  width: (window.innerWidth - 100) / 4,
  textAlign: 'center',
  display: 'inline-block',
};

const BestiaryHeader = ({
  selectedFilter,
  selectedOrderBy,
  selectedOrderByType,
  onChangeFilter,
  onChangeOrderByType,
  onChangeOrderBy,
}) => {
  return (
    <div style={styledBestiaryHeader}>
      <div style={styledFilterContainer}>
        Filter by :
        <SelectMapper
          mapArray={bestiaryFilters}
          value={selectedFilter}
          onChange={onChangeFilter}
        />
      </div>
      <div style={styledFilterContainer}>
        Order by type :
        <SelectMapper
          mapArray={bestiaryOrderByType}
          value={selectedOrderByType}
          onChange={onChangeOrderByType}
        />
      </div>
      <div style={styledFilterContainer}>
        Order by :
        <SelectMapper
          mapArray={bestiaryOrderBy}
          value={selectedOrderBy}
          onChange={onChangeOrderBy}
        />
      </div>
    </div>
  );
};

BestiaryHeader.propTypes = {
  selectedFilter: PropTypes.string.isRequired,
  selectedOrderBy: PropTypes.string.isRequired,
  selectedOrderByType: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.bool.isRequired,
  onChangeOrderByType: PropTypes.bool.isRequired,
  onChangeOrderBy: PropTypes.bool.isRequired,
};

export default BestiaryHeader;
