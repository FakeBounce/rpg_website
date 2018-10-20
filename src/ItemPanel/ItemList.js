import React, { Component } from "react";

import Item from "./Item";
import PropTypes from "prop-types";

const styledItemContainer = {
  display: "inline-block",
  float: "left",
  position: "absolute",
  top: "25px",
  overflowY: "auto",
  height: "90%",
  width: "100%",
};

class ItemList extends Component {
  render() {
    const { character, itemsList, showItemDescription } = this.props;

    return (
      <div style={styledItemContainer}>
        {itemsList.map((itemFromMerchant, index) => {
          const isHidden = character.education < itemFromMerchant.rarity * 9;
          return (
            <Item
              key={`item-${itemFromMerchant.name}-${index}`}
              {...itemFromMerchant}
              index={index}
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
  itemsList: PropTypes.array.isRequired,
  showItemDescription: PropTypes.func.isRequired,
};

export default ItemList;
