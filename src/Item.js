import React, { Component } from "react";
import PropTypes from "prop-types";

const styledItem = {
    display: "inline-block",
    border: "1px solid green",
    cursor: "pointer",
};
const styledIcon = {
    width: "30px",
    height: "30px",
    float: "left",
    display: "inline-block",
};
const styledText = {
    marginLeft: "5px",
    float: "left",
    display: "inline-block",
};
class Item extends Component {
    render() {
        const { icon, name, description, showItemDescription } = this.props;
        return (
            <div
                style={styledItem}
                onClick={() => showItemDescription({ ...this.props })}
            >
                <img
                    src={"./" + icon + ".jpg"}
                    alt={description}
                    style={styledIcon}
                />
                <div style={styledText}>{name}</div>
            </div>
        );
    }
}

Item.propTypes = {
    icon: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    showItemDescription: PropTypes.func.isRequired,
};

export default Item;
