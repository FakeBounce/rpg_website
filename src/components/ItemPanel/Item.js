import React, { PureComponent } from "react";
import "./Item.css";
import PropTypes from "prop-types";

class Item extends PureComponent {
  render() {
    const {
      index,
      icon,
      iconPath,
      itemType,
      name,
      price,
      showItemDescription,
      isHidden,
      noPrice,
    } = this.props;
    return (
      <div className="item" onClick={() => showItemDescription(index)}>
        <img
          src={iconPath || "./" + itemType + "/" + icon}
          alt={" "}
          className="item-icon"
        />
        <div className="item-text">{isHidden ? "???" : name}</div>
        {!noPrice && <div className="item-price">{price}g</div>}
      </div>
    );
  }
}

Item.defaultProps = {
  type: "",
  iconPath: "",
  description: "",
  noPrice: false,
  price: 0,
};

Item.propTypes = {
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.string.isRequired,
  iconPath: PropTypes.string,
  itemType: PropTypes.string.isRequired,
  type: PropTypes.string,
  description: PropTypes.string,
  name: PropTypes.string.isRequired,
  price: PropTypes.number,
  showItemDescription: PropTypes.func.isRequired,
  isHidden: PropTypes.bool.isRequired,
  noPrice: PropTypes.bool,
};

export default Item;
