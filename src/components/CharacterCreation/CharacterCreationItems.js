import React, { Component } from "react";
import PropTypes from "prop-types";

class CharacterCreationItems extends Component {
  render() {
    const {
      items,
      onChangeItems,
      onChangeItemsQuantity,
      removeItem,
      addItem,
    } = this.props;

    return (
      <div>
        Items :
        {items.map((item, index) => {
          return (
            <div key={`item-${index}`}>
              <input
                type="text"
                placeholder={`Item ${index + 1} + description if needed`}
                value={item.name}
                onChange={e => {
                  onChangeItems(index, e.target.value);
                }}
              />
              <input
                type="number"
                placeholder="X"
                value={item.quantity ? item.quantity : 1}
                onChange={e => {
                  onChangeItemsQuantity(index, e.target.value);
                }}
              />
              <button onClick={() => removeItem(index)}>
                Remove this item
              </button>
            </div>
          );
        })}
        {items.length < 10 && <button onClick={addItem}>Add an item</button>}
      </div>
    );
  }
}

CharacterCreationItems.propTypes = {
  items: PropTypes.array.isRequired,
  onChangeItems: PropTypes.func.isRequired,
  onChangeItemsQuantity: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
};

export default CharacterCreationItems;
