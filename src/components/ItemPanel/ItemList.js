import React from 'react';
import Item from './Item';
import { heightLeft, widthLeft } from '../Utils/StyleConstants';
import { useSelector } from 'react-redux';
import { currentItemsListSelector } from "../../selectors";

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

const ItemList = () => {
  const { characterEducation, itemsList } = useSelector(store => ({
    characterEducation: store.character.education,
    itemsList: currentItemsListSelector(store),
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
          />
        );
      })}
    </div>
  );
};

export default ItemList;
