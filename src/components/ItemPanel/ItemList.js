import React from 'react';

import Item from './Item';
import PropTypes from 'prop-types';
import { heightLeft, widthLeft } from '../Utils/StyleConstants';
import { useSelector } from 'react-redux';

const styledItemContainer = {
  display: 'inline-block',
  float: 'left',
  position: 'absolute',
  top: 40,
  left: 26,
  overflowY: 'auto',
  height: `${heightLeft / 2 - 60}px`,
  width: `${widthLeft / 2 - 52}px`,
};

const ItemList = ({ itemsList, showItemDescription }) => {
  const { characterEducation } = useSelector(store => ({
    characterEducation: store.character.education,
  }));

  return (
    <div style={styledItemContainer} className='scrollbar'>
      {Object.keys(itemsList).map(key => {
        const isHidden = characterEducation < itemsList[key].rarity * 9;
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
};

ItemList.propTypes = {
  itemsList: PropTypes.object.isRequired,
  showItemDescription: PropTypes.func.isRequired,
};

export default ItemList;
