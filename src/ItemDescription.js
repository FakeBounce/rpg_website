import React, { Component } from "react";
import "./ItemDescription.css";
import PropTypes from "prop-types";
import { widthLeft, heightLeft } from "./StyleConstants";

const styledMapSide = {
    border: "1px solid brown",
    width: `${widthLeft / 2 - 11}px`,
    height: `${heightLeft / 2 - 1}px`,
    display: "inline-block",
    float: "left",
    textAlign: "left",
    position: "relative",
};

class ItemDescription extends Component {
    render() {
        const {
            icon,
            name,
            price,
            quantity,
            description,
            effect,
            gold,
            buyItem,
            isHidden,
        } = this.props;
        return (
            <div style={styledMapSide}>
                <div className="item-description">
                    <div className="item-description-header">Description</div>
                    <img
                        src={"./" + isHidden ? "unknown_image.png" : icon}
                        alt={isHidden ? "Can't be described" : description}
                        className="item-description-icon"
                    />
                    <div className="item-description-text">{isHidden ? "???" : name}</div>
                    <div className="item-description-description">
                        {isHidden ? "Can't be described" :  description}
                    </div>
                    <div className="item-description-effect">{isHidden ? "" : effect}</div>
                    <div className="item-description-quantity">Quantity left :{quantity}</div>
                    <button
                        className={`item-description-price ${gold < price &&
                            "item-description-cant-buy"}`}
                        onClick={gold >= price && buyItem}
                    >
                        Buy ({price}
                        g)
                    </button>
                </div>
            </div>
        );
    }
}
ItemDescription.defaultProps = {
    effect: "",
};

ItemDescription.propTypes = {
    icon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    effect: PropTypes.string,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    gold: PropTypes.number.isRequired,
    buyItem: PropTypes.func.isRequired,
    isHidden: PropTypes.bool.isRequired,
};

export default ItemDescription;
