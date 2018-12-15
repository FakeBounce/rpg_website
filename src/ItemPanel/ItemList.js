import React, { Component } from 'react';

import Item from './Item';
import PropTypes from 'prop-types';
import { heightLeft, widthLeft } from '../Utils/StyleConstants';

const styledItemContainer = {
  display: 'inline-block',
  float: 'left',
  position: 'absolute',
  top: 40,
  left: 16,
  overflowY: 'auto',
  height: `${heightLeft / 2 - 60}px`,
  width: `${widthLeft / 2 - 42}px`,
};

class ItemList extends Component {
  render() {
    const { character, itemsList, showItemDescription } = this.props;

    return (
      <div style={styledItemContainer} className="scrollbar">
        {Object.keys(itemsList).map(key => {
          const isHidden = character.education < itemsList[key].rarity * 9;
          return (
            <Item
              key={`item-${itemsList[key].name}-${key}`}
              {...itemsList[key]}
              index={key}
              isHidden={isHidden}
              showItemDescription={showItemDescription}
            />
          );
        })}
      </div>
    );
  }
}

ItemList.propTypes = {
  character: PropTypes.object.isRequired,
  itemsList: PropTypes.object.isRequired,
  showItemDescription: PropTypes.func.isRequired,
};

export default ItemList;
