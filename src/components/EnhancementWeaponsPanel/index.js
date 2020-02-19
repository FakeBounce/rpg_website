import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { heightLeft, widthLeft } from '../Utils/StyleConstants';
import Cadre from '../Utils/Cadre';
import EnhancementWeaponsContent from './EnhancementWeaponsContent';
import { colors } from "../Utils/Constants";

const styledEnhancementWeaponsContainer = {
  width: `${widthLeft / 2}px`,
  height: `${heightLeft / 2}px`,
  display: 'inline-block',
  float: 'left',
  textAlign: 'left',
  position: 'relative',
  paddingHorizontal: 10,
  color: colors.text,
};

class EnhancementWeaponsPanel extends Component {
  render() {
    const {
      itemsList,
      choosedItem,
      showEnhancers,
    } = this.props;

    return (
      <div style={styledEnhancementWeaponsContainer}>
        <Cadre />
        <EnhancementWeaponsContent
          showEnhancers={showEnhancers}
          choosedItem={choosedItem}
          itemsList={itemsList}
        />
      </div>
    );
  }
}

EnhancementWeaponsPanel.propTypes = {
  choosedItem: PropTypes.object.isRequired,
  showEnhancers: PropTypes.func.isRequired,
  itemsList: PropTypes.object.isRequired,
};

export default EnhancementWeaponsPanel;
