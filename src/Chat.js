import React, { Component } from "react";
import firebase from "firebase";
import "./App.css";
import PropTypes from "prop-types";

const heightHeader = 100;

const styles = {
    BoxHeader: {
        width: "100%",
        height: "20px",
        marginBottom: "5px",
        textAlign: "center",
    },
    Historic: {
        width: "100%",
        height: `${((window.innerHeight - heightHeader) * 33) / 100 -
        25 -
        20}px`,
        float: "left",
        display: "inline-block",
    },
    ChatRow: {
        width: "100%",
        height: "20px",
        float: "left",
        display: "inline-block",
        textAlign: "left",
    },
    ChatBox: {
        width: "100%",
        height: "20px",
        float: "left",
        display: "inline-block",
    },
    ChatInput: {
        width: "88%",
        height: "20px",
        float: "left",
        display: "inline-block",
    },
    ChatButton: {
        width: "10%",
        height: "20px",
        float: "left",
        display: "inline-block",
    },
    ChatPanel: {
        width: "100%",
    },
};

class Chat extends Component {
    generateChat = chatHistory => {
        const table = [];
        chatHistory.map((row, index) => {
            table.push(
                <div key={`chat-row-${index}`} style={styles.ChatRow}>
                    {row.pseudo
                        ? `@${row.pseudo}: ${row.message}`
                        : row.message}
                </div>,
            );
            return null;
        });
        return table;
    };

    talkInChat = () => {
        const { chatInput, pseudo } = this.props;
        let noMagicWord = true;
        if (chatInput !== "") {
            if (chatInput.length >= 3) {
                if (chatInput[0] === "/") {
                    if (chatInput[1] === "d") {
                        const splittedString = chatInput
                            .toLowerCase()
                            .split("/d")[1];
                        const isnum = /^\d+$/.test(splittedString);
                        if (isnum) {
                            noMagicWord = false;
                            this.sendChatInput({
                                message: `@${pseudo} launched a D${splittedString}. Result : ${Math.floor(
                                    Math.random() *
                                    parseInt(splittedString, 10) +
                                    1,
                                )}`,
                            });
                        }
                    }
                }
            }

            if (noMagicWord) {
                this.sendChatInput({ message: chatInput, pseudo });
            }
        }
    };

    sendChatInput = input => {
        const { chatHistory, doSetState, triggerError } = this.props;
        const nextChat = chatHistory;
        nextChat.push(input);
        firebase
            .database()
            .ref("chat/")
            .set(nextChat)
            .then(() => {
                doSetState({
                    error: "",
                    chatInput: "",
                });
            })
            .catch(error => {
                // Handle Errors here.
                triggerError(error);
            });
    };

    render() {
        const { chatInput, chatHistory, onChange } = this.props;

        return (
            <div style={styles.ChatPanel}>
                <div style={styles.BoxHeader}>Chat</div>
                <div style={styles.Historic}>
                    {this.generateChat(chatHistory)}
                </div>
                <div style={styles.ChatBox}>
                    <input
                        type="text"
                        name="chatInput"
                        placeholder="Chat !"
                        value={chatInput}
                        onChange={e => {
                            onChange(e.target.name, e.target.value);
                        }}
                        style={styles.ChatInput}
                    />
                    <button
                        style={styles.ChatButton}
                        onClick={this.talkInChat}
                    >
                        OK
                    </button>
                </div>
            </div>
        );
    }
}

Chat.propTypes = {
    pseudo: PropTypes.string.isRequired,
    chatInput: PropTypes.string.isRequired,
    chatHistory: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    doSetState: PropTypes.func.isRequired,
    triggerError: PropTypes.func.isRequired,
};

export default Chat;
