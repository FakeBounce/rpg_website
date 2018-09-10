import React, { Component } from "react";
import PropTypes from "prop-types";

const styledItem = {
    display: "inline-block",
    border: "1px solid red",
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

class ItemDescription extends Component {
    render() {
        const { icon, name, description } = this.props;
        return (
            <div style={styledItem}>
                <img
                    src={"./" + icon + ".jpg"}
                    alt={description}
                    style={styledIcon}
                />
                <div style={styledText}>{name}</div>
                <div style={styledText}>{description}</div>
            </div>
        );
    }
}

ItemDescription.propTypes = {
    icon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default ItemDescription;
