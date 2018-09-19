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
        const { title, signOut, accessChatHelp, chatHelpTitle, selectAnotherCharacter, toggleMusic } = this.props;

        return (
            <div style={styledHeader}>
                <div style={styledBoxHeader}>{title}</div>
                <button style={styledSignOut} onClick={signOut}>
                    Sign Out
                </button>
                <button style={styledSignOut} onClick={selectAnotherCharacter}>
                    Select another character
                </button>
                <button style={styledSignOut} onClick={accessChatHelp}>
                  {chatHelpTitle}
                </button>
                <button style={styledSignOut} onClick={toggleMusic}>
                  Toggle music
                </button>
            </div>
        );
    }
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
  chatHelpTitle: PropTypes.string.isRequired,
    signOut: PropTypes.func.isRequired,
    accessChatHelp: PropTypes.func.isRequired,
  selectAnotherCharacter: PropTypes.func.isRequired,
    toggleMusic: PropTypes.func.isRequired,
};

export default Header;
