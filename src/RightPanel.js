import React, { Component } from 'react';

import PropTypes from 'prop-types';
import ChatPanel from './ChatPanel/ChatPanel';
import firebase from 'firebase';
import TeamPanel from './TeamCharacters/TeamPanel';
import { widthRightPanel, heightHeader } from './Utils/StyleConstants';
import CharacterPanel from './CharacterPanel/CharacterPanel';

const styles = {
    RightPanel: {
        position: 'absolute',
        top: `${heightHeader}px`,
        right: 0,
        borderLeft: '1px solid black',
        width: `${widthRightPanel}px`,
        height: `${window.innerHeight - heightHeader}px`,
    },
};

class RightPanel extends Component {
    state = {
        status: this.props.character.status
            ? this.props.character.status
            : 'OK',
        infoTab: 'Weapons',
        damageTaken: 0,
        gold: 0,
    };

    chatWithTeamMember = pseudo => {
        if (pseudo === 'GM') {
            this.props.doSetState({
                chatInput: `/gmw `,
            });
        } else {
            this.props.doSetState({
                chatInput: `/w ${pseudo} `,
            });
        }
    };

    goldWithTeamMember = pseudo => {
        if (pseudo === 'GM') {
            this.props.doSetState({
                chatInput: `/goldgm `,
            });
        } else {
            this.props.doSetState({
                chatInput: `/gold ${pseudo} `,
            });
        }
    };

    onChange = (name, value) => {
        const obj = {};
        obj[name] = value;
        this.setState(state => ({
            ...state,
            ...obj,
        }));
    };

    onChangeTab = tab => {
        this.setState(state => ({
            ...state,
            infoTab: tab,
        }));
    };

    onLifeChange = () => {
        const {
            character: { health, maxHealth },
            currentStory,
            uid,
        } = this.props;
        const { damageTaken } = this.state;

        const healthLeft =
            parseInt(health, 10) + damageTaken < 0
                ? 0
                : parseInt(health, 10) + damageTaken > maxHealth
                    ? maxHealth
                    : parseInt(health, 10) + damageTaken;
        firebase
            .database()
            .ref(
                'stories/' +
                    currentStory +
                    '/characters/' +
                    uid +
                    '/character/health'
            )
            .set(parseInt(healthLeft, 10))
            .catch(error => {
                // Handle Errors here.
                this.triggerError(error);
            });
    };

    onStatusChange = () => {
        const { currentStory, uid } = this.props;
        const { status } = this.state;

        firebase
            .database()
            .ref(
                'stories/' +
                    currentStory +
                    '/characters/' +
                    uid +
                    '/character/status'
            )
            .set(status)
            .catch(error => {
                // Handle Errors here.
                this.triggerError(error);
            });
    };

    onItemUse = (i, value) => {
        const { character, currentStory, uid, doSetState } = this.props;

        if (value > -1) {
            const newCharacterItems = [...character.items];
            newCharacterItems[i].quantity = value;

            const newCharacter = {
                ...character,
                items: newCharacterItems,
            };

            doSetState({
                character: newCharacter,
            });

            firebase
                .database()
                .ref(
                    'stories/' +
                        currentStory +
                        '/characters/' +
                        uid +
                        '/character'
                )
                .set(newCharacter)
                .catch(error => {
                    // Handle Errors here.
                    this.triggerError(error);
                });
        }
    };

    // for GM only
    onGoldChange = () => {
        const { character, currentStory, uid, isGameMaster } = this.props;
        const { gold } = this.state;

        if (isGameMaster) {
            const goldToSet =
                character.gold + gold < 0 ? 0 : character.gold + gold;

            firebase
                .database()
                .ref(
                    'stories/' +
                        currentStory +
                        '/characters/' +
                        uid +
                        '/character/gold'
                )
                .set(goldToSet)
                .catch(error => {
                    // Handle Errors here.
                    this.triggerError(error);
                });
        }
    };

    modifyCurrentCharacter = uid => {
        const { currentStory, isGameMaster, doSetState } = this.props;

        if (isGameMaster) {
            firebase
                .database()
                .ref(
                    'stories/' +
                        currentStory +
                        '/characters/' +
                        this.props.uid +
                        '/character'
                )
                .off();
            firebase
                .database()
                .ref(
                    'stories/' +
                        currentStory +
                        '/characters/' +
                        uid +
                        '/character'
                )
                .on('value', snapshot => {
                    doSetState({
                        uid,
                        character: snapshot.val(),
                    });
                });
        }
    };

    render() {
        const {
            pseudo,
            chatInput,
            chatHistory,
            onChange,
            doSetState,
            triggerError,
            character,
            users,
            storyCharacters,
            uid,
            currentStory,
            gameMaster,
            isGameMaster,
        } = this.props;

        const { status, infoTab, damageTaken, gold } = this.state;

        return (
            <div style={styles.RightPanel}>
                <CharacterPanel
                    character={character}
                    status={status}
                    infoTab={infoTab}
                    damageTaken={damageTaken}
                    gold={gold}
                    isGameMaster={isGameMaster}
                    onChange={this.onChange}
                    onChangeTab={this.onChangeTab}
                    onLifeChange={this.onLifeChange}
                    onStatusChange={this.onStatusChange}
                    onItemUse={this.onItemUse}
                    onGoldChange={this.onGoldChange}
                />
                <TeamPanel
                    gameMaster={gameMaster}
                    storyCharacters={storyCharacters}
                    chatWithTeamMember={this.chatWithTeamMember}
                    goldWithTeamMember={this.goldWithTeamMember}
                    modifyCurrentCharacter={this.modifyCurrentCharacter}
                    isGameMaster={isGameMaster}
                />
                <ChatPanel
                    users={users}
                    storyCharacters={storyCharacters}
                    uid={uid}
                    currentStory={currentStory}
                    gameMaster={gameMaster}
                    isGameMaster={isGameMaster}
                    character={character}
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
    gameMaster: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    currentStory: PropTypes.number.isRequired,
    users: PropTypes.object.isRequired,
    character: PropTypes.object.isRequired,
    isGameMaster: PropTypes.bool.isRequired,
    pseudo: PropTypes.string.isRequired,
    chatInput: PropTypes.string.isRequired,
    chatHistory: PropTypes.array.isRequired,
    storyCharacters: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    doSetState: PropTypes.func.isRequired,
    triggerError: PropTypes.func.isRequired,
};

export default RightPanel;
