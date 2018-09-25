import React, { Component } from "react";
import "./Item.css";
import PropTypes from "prop-types";

class Item extends Component {
    render() {
        const {
            index,
            icon,
            name,
            description,
            price,
            quantity,
            showItemDescription,
        } = this.props;
        return (
            <div
                className="item"
                onClick={() =>
                    showItemDescription({
                        ...this.props,
                        showItemDescription: null,
                    }, index)
                }
            >
                <img
                    src={"./" + icon}
                    alt={description}
                    className="item-icon"
                />
                <div className="item-text">{name}</div>
                <div className="item-quantity">x{quantity}</div>
                <div className="item-price">{price}g</div>
            </div>
        );
    }
}

Item.propTypes = {
    index: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    showItemDescription: PropTypes.func.isRequired,
};

export default Item;
