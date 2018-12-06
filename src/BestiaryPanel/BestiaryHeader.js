import React, { Component } from 'react';
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
};

class BestiaryHeader extends Component {
  render() {
    const {
      selectedFilter,
      selectedOrderBy,
      selectedOrderByType,
      onChangeFilter,
      onChangeOrderByType,
      onChangeOrderBy,
    } = this.props;

    return (
      <div style={styledBestiaryHeader}>
        <SelectMapper
          mapArray={bestiaryFilters}
          value={selectedFilter}
          onChange={onChangeFilter}
        />
        <SelectMapper
          mapArray={bestiaryOrderByType}
          value={selectedOrderByType}
          onChange={onChangeOrderByType}
        />
        <SelectMapper
          mapArray={bestiaryOrderBy}
          value={selectedOrderBy}
          onChange={onChangeOrderBy}
        />
      </div>
    );
  }
}

BestiaryHeader.propTypes = {
  selectedFilter: PropTypes.string.isRequired,
  selectedOrderBy: PropTypes.string.isRequired,
  selectedOrderByType: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.bool.isRequired,
  onChangeOrderByType: PropTypes.bool.isRequired,
  onChangeOrderBy: PropTypes.bool.isRequired,
};

export default BestiaryHeader;
