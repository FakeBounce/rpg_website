import React from 'react';
import { useCharacterContext } from '../../contexts/characterContext';

const CharacterCreationItems = () => {
  const {
    items,
    onChangeItems,
    onChangeItemsQuantity,
    removeItem,
    addItem,
  } = useCharacterContext();

  return (
    <div>
      Items :
      {items.map((item, index) => {
        return (
          <div key={`item-${index}`}>
            <input
              type='text'
              placeholder={`Item ${index + 1} + description if needed`}
              defaultValue={item.name}
              onChange={e => {
                onChangeItems(index, e.target.value);
              }}
            />
            <input
              type='number'
              placeholder='X'
              value={item.quantity ? item.quantity : 1}
              onChange={e => {
                onChangeItemsQuantity(index, e.target.value);
              }}
            />
            <button onClick={() => removeItem(index)}>Remove this item</button>
          </div>
        );
      })}
      {items.length < 10 && <button onClick={addItem}>Add an item</button>}
    </div>
  );
};

export default CharacterCreationItems;
