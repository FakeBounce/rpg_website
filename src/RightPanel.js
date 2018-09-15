import React, { Component } from "react";
import "./App.css";
import PropTypes from "prop-types";
import Chat from "./Chat";

const widthRightPanel = 300;
const heightHeader = 100;

const styles = {
    BoxHeader: {
        width: "100%",
        height: "20px",
        marginBottom: "5px",
        textAlign: "center",
    },
    RightPanel: {
        position: "absolute",
        top: `${heightHeader}px`,
        right: "0px",
        borderLeft: "1px solid black",
        width: `${widthRightPanel}px`,
        height: `${window.innerHeight - heightHeader}px`,
    },
    CharPanel: {
        borderBottom: "1px solid black",
        width: "100%",
        height: "33%",
    },
    ItemsPanel: {
        borderBottom: "1px solid black",
        width: "100%",
        height: "33%",
    },
};

class RightPanel extends Component {
    render() {
        const {
            pseudo,
            chatInput,
            chatHistory,
            onChange,
            doSetState,
            triggerError,
        } = this.props;

        return (
            <div style={styles.RightPanel}>
                <div style={styles.CharPanel}>
                    <div style={styles.BoxHeader}>Personnage</div>
                </div>
                <div style={styles.ItemsPanel}>
                    <div style={styles.BoxHeader}>Items/Or</div>
                </div>
                <Chat
                    pseudo={pseudo}
                    chatInput={chatInput}
                    chatHistory={chatHistory}
                    onChange={onChange}
                    doSetState={doSetState}
                    triggerError={triggerError}
                />
            </div>
        );
    }
}

RightPanel.propTypes = {
    pseudo: PropTypes.string.isRequired,
    chatInput: PropTypes.string.isRequired,
    chatHistory: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    doSetState: PropTypes.func.isRequired,
    triggerError: PropTypes.func.isRequired,
};

export default RightPanel;
