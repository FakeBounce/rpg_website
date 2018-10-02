import React, { Component } from "react";
import "./Merchant.css";
import PropTypes from "prop-types";

class Merchant extends Component {
    render() {
        const { index, name, items, icon, description, showItems } = this.props;
        return (
            <div className="merchant" onClick={() => showItems(items, index)}>
                <img
                    src={"./" + icon}
                    alt={description}
                    className="merchant-icon"
                />
                <div className="merchant-text">{name}</div>
                <div className="merchant-text">{description}</div>
            </div>
        );
    }
}

Merchant.propTypes = {
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    showItems: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            icon: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

export default Merchant;
