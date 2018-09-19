import React, { Component } from "react";
import "./Item.css";
import PropTypes from "prop-types";

class Item extends Component {
    render() {
        const {
            icon,
            name,
            description,
            price,
            showItemDescription,
        } = this.props;
        return (
            <div
                className="item"
                onClick={() =>
                    showItemDescription({
                        ...this.props,
                        showItemDescription: null,
                    })
                }
            >
                <img
                    src={"./" + icon}
                    alt={description}
                    className="item-icon"
                />
                <div className="item-text">{name}</div>
                <div className="item-price">{price}g</div>
            </div>
        );
    }
}

Item.propTypes = {
    icon: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    showItemDescription: PropTypes.func.isRequired,
};

export default Item;
