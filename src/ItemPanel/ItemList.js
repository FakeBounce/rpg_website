import React, { Component } from "react";

import Item from "./Item";
import PropTypes from "prop-types";
import { widthLeft } from "../Utils/StyleConstants";

const styledItemContainer = {
  display: "inline-block",
  float: "left",
  position: "absolute",
  top: "20px",
  left: 16,
  overflowY: "auto",
  height: "82%",
  width: `${widthLeft / 2 - 42}px`,
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
