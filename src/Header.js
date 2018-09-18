import React, { Component } from "react";
import PropTypes from "prop-types";
import { heightHeader } from "./StyleConstants";

const styledSignOut = {
    float: "right",
};

const styledBoxHeader = {
    width: "100%",
    height: "20px",
    marginBottom: "5px",
    textAlign: "center",
};

const styledHeader = {
    borderBottom: "1px solid black",
    width: "100%",
    height: `${heightHeader}px`,
};

class Header extends Component {
    render() {
        const { signOut, accessChatHelp } = this.props;

        return (
            <div style={styledHeader}>
                <div style={styledBoxHeader}>Header</div>
                <button style={styledSignOut} onClick={signOut}>
                    Sign Out
                </button>
                <button style={styledSignOut} onClick={accessChatHelp}>
                    Access chat help
                </button>
            </div>
        );
    }
}

Header.propTypes = {
    signOut: PropTypes.func.isRequired,
    accessChatHelp: PropTypes.func.isRequired,
};

export default Header;
