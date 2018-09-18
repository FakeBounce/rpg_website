import React, { Component } from "react";
import PropTypes from "prop-types";

const styledItem = {
    display: "inline-block",
    border: "1px solid yellow",
    cursor:"pointer",
};
const styledIcon = {
	position: "relative",
    width: "30px",
    height: "30px",
	float: "left",
	marginTop: "3px",
	marginLeft: "3px",
    display: "inline-block",
	zIndex: "1",
};
const styledText = {
    marginLeft: "5px",
    float: "left",
    display: "inline-block",
};

const StyleBgIcon = {
	position: "absolute",
	width: "36px",
    height: "36px",
    float: "left",
    display: "inline-block",
}

class Merchant extends Component {
    render() {
        const { name, items, icon, description, showItems } = this.props;
        return (
            <div style={styledItem} onClick={() => showItems(items)}>
				<img src={"./equipement.png"}  style={StyleBgIcon}/>
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

Merchant.propTypes = {
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    showItems: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            icon: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired
        })
    ).isRequired
};

export default Merchant;
