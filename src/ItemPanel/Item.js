import React, { Component } from "react";
import "./Item.css";
import PropTypes from "prop-types";

class Item extends Component {
  render() {
    const {
      index,
      icon,
      itemType,
      name,
      price,
      showItemDescription,
      isHidden,
    } = this.props;
    return (
      <div className="item" onClick={() => showItemDescription(index)}>
        <img
          src={"./" + itemType + "/" + icon}
          alt={" "}
          className="item-icon"
        />
        <div className="item-text">{isHidden ? "???" : name}</div>
        <div className="item-price">{price}g</div>
      </div>
    );
  }
}

Item.defaultProps = {
  type: "",
  description: "",
};

Item.propTypes = {
  index: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
  itemType: PropTypes.string.isRequired,
  type: PropTypes.string,
  description: PropTypes.string,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  showItemDescription: PropTypes.func.isRequired,
  isHidden: PropTypes.bool.isRequired,
};

export default Item;
