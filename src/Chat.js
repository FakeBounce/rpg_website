import React, { Component } from 'react';
import firebase from 'firebase';
import './App.css';
import PropTypes from 'prop-types';

const heightHeader = 100;

const styles = {
    BoxHeader: {
        width: '100%',
        height: '20px',
        marginBottom: '5px',
        textAlign: 'center',
    },
    Historic: {
        width: '100%',
        height: `${((window.innerHeight - heightHeader) * 33) / 100 -
            (25 + 20 + 5)}px`,
        float: 'left',
        display: 'inline-block',
        overflowY: 'auto',
    },
    ChatRow: {
        width: '100%',
        float: 'left',
        display: 'inline-block',
        textAlign: 'left',
    },
    ChatBox: {
        width: '100%',
        height: '20px',
        float: 'left',
        display: 'inline-block',
        marginTop: '5px',
    },
    ChatInput: {
        width: '88%',
        height: '20px',
        float: 'left',
        display: 'inline-block',
    },
    ChatButton: {
        width: '10%',
        height: '26px',
        float: 'left',
        display: 'inline-block',
        textAlign: 'center',
        padding: '0px',
    },
    ChatPanel: {
        width: '100%',
    },
};

class Chat extends Component {
    messagesEnd = null;

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
    };

    handleKeyPress = event => {
        if (event.key === 'Enter') {
            this.talkInChat();
        }
    };

    generateChat = chatHistory => {
        const table = [];
        chatHistory.map((row, index) => {
            if (row.viewers && this.isAViewer(row.viewers)) {
                table.push(
                    <div key={`chat-row-${index}`} style={styles.ChatRow}>
                        {row.pseudo
                            ? `@${row.pseudo}: ${row.message}`
                            : row.message}
                    </div>
                );
            } else if (!row.viewers) {
                table.push(
                    <div key={`chat-row-${index}`} style={styles.ChatRow}>
                        {row.pseudo
                            ? `@${row.pseudo}: ${row.message}`
                            : row.message}
                    </div>
                );
            }
            return null;
        });
        return table;
    };

    isAViewer = viewersTab => {
        const { pseudo, gameMaster, uid } = this.props;
        let canSeeMessage = false;

        viewersTab.map(viewer => {
            if (viewer === 'gm' && uid === gameMaster) canSeeMessage = true;
            if (viewer === pseudo) canSeeMessage = true;
            return null;
        });
        return canSeeMessage;
    };

    talkInChat = () => {
        const { chatInput, pseudo } = this.props;
        let noMagicWord = true;
        if (chatInput !== '') {
            if (chatInput.length >= 3) {
                if (this.diceAction('/d')) {
                    noMagicWord = false;
                }
                if (this.diceAction('/dice')) {
                    noMagicWord = false;
                }
                if (this.diceAction('/gmd', ['gm', pseudo])) {
                    noMagicWord = false;
                }
                if (this.diceAction('/gmdice', ['gm', pseudo])) {
                    noMagicWord = false;
                }
                if (this.whisperPlayerAction()) {
                    noMagicWord = false;
                }
                if (this.whisperTeamAction()) {
                    noMagicWord = false;
                }
                if (this.whisperGMAction()) {
                    noMagicWord = false;
                }
            }
            switch (chatInput) {
                case '/strength':
                case '/str':
                case '/force':
                case '/for':
                    noMagicWord = false;
                    this.attributeAction('strength');
                    break;
                case '/dexterity':
                case '/dex':
                case '/dextérité':
                    noMagicWord = false;
                    this.attributeAction('dexterity');
                    break;
                case '/luck':
                case '/luc':
                case '/chance':
                case '/chan':
                    noMagicWord = false;
                    this.attributeAction('luck');
                    break;
                case '/charisma':
                case '/char':
                case '/charisme':
                    noMagicWord = false;
                    this.attributeAction('charisma');
                    break;
                case '/education':
                case '/edu':
                    noMagicWord = false;
                    this.attributeAction('education');
                    break;
                case '/perception':
                case '/per':
                    noMagicWord = false;
                    this.attributeAction('perception');
                    break;
                case '/constitution':
                case '/con':
                    noMagicWord = false;
                    this.attributeAction('constitution');
                    break;
                case '/magic':
                case '/mag':
                case '/magie':
                    noMagicWord = false;
                    this.attributeAction('magic');
                    break;
                case '/gmstrength':
                case '/gmstr':
                case '/gmforce':
                case '/gmfor':
                    noMagicWord = false;
                    this.attributeAction('strength', true);
                    break;
                case '/gmdexterity':
                case '/gmdex':
                case '/gmdextérité':
                    noMagicWord = false;
                    this.attributeAction('dexterity', true);
                    break;
                case '/gmluck':
                case '/gmluc':
                case '/gmchance':
                case '/gmchan':
                    noMagicWord = false;
                    this.attributeAction('luck', true);
                    break;
                case '/gmcharisma':
                case '/gmchar':
                case '/gmcharisme':
                    noMagicWord = false;
                    this.attributeAction('charisma', true);
                    break;
                case '/gmeducation':
                case '/gmedu':
                    noMagicWord = false;
                    this.attributeAction('education', true);
                    break;
                case '/gmperception':
                case '/gmper':
                    noMagicWord = false;
                    this.attributeAction('perception', true);
                    break;
                case '/gmconstitution':
                case '/gmcon':
                    noMagicWord = false;
                    this.attributeAction('constitution', true);
                    break;
                case '/gmmagic':
                case '/gmmag':
                case '/gmmagie':
                    noMagicWord = false;
                    this.attributeAction('magic', true);
                    break;

                default:
                    break;
            }

            if (noMagicWord) {
                this.sendChatInput({ message: chatInput, pseudo });
            }
        }
    };

    whisperPlayerAction = () => {
        const { chatInput, pseudo, users } = this.props;
        const splittedString = chatInput.split('/w ');
        let hasWhisperAction = false;
        if (splittedString.length > 1) {
            hasWhisperAction = true;
            Object.keys(users).map(key => {
                if (splittedString[1].split(users[key].pseudo).length > 1) {
                    this.sendChatInput({
                        message: `@${pseudo}, you say to @${
                            users[key].pseudo
                        } :${splittedString[1].split(users[key].pseudo)[1]}`,
                        viewers: [pseudo],
                    });
                    this.sendChatInput({
                        message: `@${pseudo} tells you secretly :${
                            splittedString[1].split(users[key].pseudo)[1]
                        }`,
                        viewers: [users[key].pseudo],
                    });
                }
                return null;
            });
        }
        return hasWhisperAction;
    };

    whisperGMAction = () => {
        const { chatInput, pseudo, users, gameMaster } = this.props;
        const splittedString = chatInput.split('/gmw ');
        let hasWhisperAction = false;
        if (splittedString.length > 1) {
            hasWhisperAction = true;
            Object.keys(users).map(key => {
                if (key === gameMaster) {
                    this.sendChatInput({
                        message: `@${pseudo}, you say to GM :${
                            splittedString[1]
                        }`,
                        viewers: [pseudo],
                    });
                    this.sendChatInput({
                        message: `@${pseudo} tells GM secretly :${
                            splittedString[1]
                        }`,
                        viewers: [users[key].pseudo],
                    });
                }
                return null;
            });
        }
        return hasWhisperAction;
    };

    whisperTeamAction = () => {
        const { chatInput, pseudo, users, gameMaster } = this.props;
        const splittedString = chatInput.split('/tmw ');
        let hasWhisperAction = false;
        if (splittedString.length > 1) {
            hasWhisperAction = true;
            const team = [];

            Object.keys(users).map(key => {
                if (!key === gameMaster) {
                    team.push(users[key].pseudo);
                }
                return null;
            });

            this.sendChatInput({
                message: `@${pseudo} tells to team :${splittedString[1]}`,
                viewers: team,
            });
        }
        return hasWhisperAction;
    };

    diceAction = (limiter, viewers = null) => {
        const { chatInput, pseudo } = this.props;
        const splittedString = chatInput.toLowerCase().split(limiter)[1];
        const isnum = /^\d+$/.test(splittedString);
        if (isnum) {
            this.sendChatInput({
                message: `@${pseudo} launched a D${splittedString}. Result : ${Math.floor(
                    Math.random() * parseInt(splittedString, 10) + 1
                )}`,
                viewers,
            });
        }
        return isnum;
    };

    attributeAction = (attribute, isGm = false) => {
        const { pseudo, character } = this.props;
        const dice = Math.floor(Math.random() * parseInt(100, 10) + 1);
        let message = '';

        if (dice < 6) {
            message = `@${pseudo} tried a ${attribute} action. Result : ${dice} (Critical success !)`;
        } else if (dice <= character[attribute]) {
            message = `@${pseudo} tried a ${attribute} action. Result : ${dice} (Success !)`;
        } else if (dice > 95) {
            message = `@${pseudo} tried a ${attribute} action. Result : ${dice} (Critical fail !)`;
        } else {
            message = `@${pseudo} tried a ${attribute} action. Result : ${dice} (Fail !)`;
        }
        if (isGm) {
            this.sendChatInput({
                message,
                viewers: ['gm', pseudo],
            });
        } else {
            this.sendChatInput({
                message,
            });
        }
    };

    sendChatInput = input => {
        const { chatHistory, doSetState, triggerError } = this.props;
        const nextChat = chatHistory;
        nextChat.push(input);
        firebase
            .database()
            .ref('chat/')
            .set(nextChat)
            .then(() => {
                doSetState({
                    error: '',
                    chatInput: '',
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
                    <div
                        style={{ float: 'left', clear: 'both' }}
                        ref={el => {
                            this.messagesEnd = el;
                        }}
                    />
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
                        onKeyPress={this.handleKeyPress}
                    />
                    <button style={styles.ChatButton} onClick={this.talkInChat}>
                        OK
                    </button>
                </div>
            </div>
        );
    }
}

Chat.propTypes = {
    gameMaster: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    users: PropTypes.object.isRequired,
    character: PropTypes.object.isRequired,
    pseudo: PropTypes.string.isRequired,
    chatInput: PropTypes.string.isRequired,
    chatHistory: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    doSetState: PropTypes.func.isRequired,
    triggerError: PropTypes.func.isRequired,
};

export default Chat;
