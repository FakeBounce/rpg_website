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
class ChooseCharacter extends Component {
    render() {
        const { icon, name, chooseCharacter, id } = this.props;
        return (
            <div
                style={styledItem}
                onClick={() => chooseCharacter(id)}
            >
                <img
                    src={icon}
                    alt={name}
                    style={styledIcon}
                />
                <div style={styledText}>{name}</div>
            </div>
        );
    }
}

ChooseCharacter.propTypes = {
    id: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    chooseCharacter: PropTypes.func.isRequired,
};

export default ChooseCharacter;