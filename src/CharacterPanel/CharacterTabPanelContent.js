import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { widthRightPanelLeft } from '../Utils/StyleConstants';

const styles = {
  tabPanelItem: {
    width: `${widthRightPanelLeft - 20}px`,
    paddingHorizontal: 5,
    position: 'relative',
    float: 'left',
    display: 'inline-block',
  },
};

class CharacterTabPanelContent extends Component {
  render() {
    const { tab } = this.props;

    return (
      <div>
        {tab.map((description, index) => {
          return (
            <div key={`${description}-${index}`} style={styles.tabPanelItem}>
              {description}
            </div>
          );
        })}
      </div>
    );
  }
}

CharacterTabPanelContent.propTypes = {
  tab: PropTypes.array.isRequired,
};

export default CharacterTabPanelContent;
