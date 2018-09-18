import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';
import Chat from './Chat';
import firebase from 'firebase';

const widthRightPanel = 350;
const heightHeader = 100;
const imageSize = 100;
const widthLeft = widthRightPanel - imageSize;

const styles = {
    BoxHeader: {
        width: '100%',
        height: 20,
        marginBottom: 5,
        textAlign: 'center',
    },
    RightPanel: {
        position: 'absolute',
        top: `${heightHeader}px`,
        right: 0,
        borderLeft: '1px solid black',
        width: `${widthRightPanel}px`,
        height: `${window.innerHeight - heightHeader}px`,
    },
    CharPanel: {
        borderBottom: '1px solid black',
        width: '100%',
        height: '33%',
    },
    CharacterBox: { position: 'relative', height: '100%' },
    TeamPanel: {
        borderBottom: '1px solid black',
        width: '100%',
        height: '33%',
    },
    teamCharacters: {
        width: `${widthRightPanel}px`,
        height: `${(window.innerHeight - heightHeader) * 0.33 - 30}px`,
        marginTop: 30,
        position: 'relative',
        float: 'left',
        display: 'inline-block',
        overflowY: 'auto',
    },
    characterHeader: {
        width: `${widthRightPanel}px`,
        height: `${heightHeader}px`,
        position: 'relative',
        float: 'left',
        display: 'inline-block',
    },
    characterHeaderinfos: {
        width: `${widthLeft}px`,
        height: 49,
        position: 'relative',
        float: 'left',
        display: 'inline-block',
        borderBottom: '1px solid black',
    },
    characterTeamHeader: {
        width: `${widthRightPanel - 20}px`,
        height: `${heightHeader / 2}px`,
        position: 'relative',
        float: 'left',
        display: 'inline-block',
        borderTop: '1px solid black',
        borderBottom: '1px solid black',
    },
    characterTeamHeaderInfo: {
        position: 'relative',
        width: `${(widthLeft - 20 + imageSize / 2) / 3}px`,
        height: 25,
        float: 'left',
        display: 'inline-block',
    },
    characterTeamHeaderImage: {
        position: 'relative',
        width: `${imageSize / 2}px`,
        height: `${imageSize / 2}px`,
        float: 'left',
        display: 'inline-block',
    },
    characterAttributeInfos: {
        width: `${imageSize - 1}px`,
        height: `${(window.innerHeight - heightHeader) * 0.33 - imageSize}px`,
        position: 'relative',
        float: 'left',
        display: 'inline-block',
        borderRight: '1px solid black',
        overflowY: 'auto',
    },
    characterOtherInfos: {
        width: `${widthLeft}px`,
        height: `${(window.innerHeight - heightHeader) * 0.33 - imageSize}px`,
        position: 'relative',
        float: 'left',
        display: 'inline-block',
    },
    tabsButtons: {
        width: `${widthLeft}px`,
        height: 25,
        position: 'relative',
        float: 'left',
        display: 'inline-block',
    },
    tabButton: {
        width: `${widthLeft / 4}px`,
        height: 25,
        padding: 0,
        position: 'relative',
        float: 'left',
        display: 'inline-block',
    },
    tabPanel: {
        width: `${widthLeft}px`,
        height: `${(window.innerHeight - heightHeader) * 0.33 -
            imageSize -
            50}px`,
        padding: 0,
        position: 'relative',
        float: 'left',
        display: 'inline-block',
        overflowY: 'auto',
    },
    tabPanelItem: {
        width: `${widthLeft - 20}px`,
        height: 25,
        paddingHorizontal: 5,
        position: 'relative',
        float: 'left',
        display: 'inline-block',
    },
    itemName: {
        width: `${widthLeft - 70}px`,
        height: 25,
        position: 'relative',
        float: 'left',
        display: 'inline-block',
    },
    itemQuantity: {
        width: 30,
        height: 15,
        position: 'relative',
        float: 'left',
        display: 'inline-block',
        padding: 0,
        margin: 0,
        textAlign: 'center',
    },
    healthBar: {
        boxSizing: 'border-box',
        width: `${widthLeft}px`,
        height: 20,
        padding: 5,
        background: '#ddd',
        borderRadius: 5,
        position: 'relative',
        float: 'left',
        display: 'inline-block',
        marginBottom: 5,
    },
    teamHealthBar: {
        boxSizing: 'border-box',
        width: `${widthLeft - 20 + imageSize / 2}px`,
        height: 20,
        padding: 5,
        background: '#ddd',
        borderRadius: 5,
        position: 'relative',
        float: 'left',
        display: 'inline-block',
        marginBottom: 5,
    },
    bar: {
        background: '#c54',
        position: 'relative',
        height: 10,
        transition: 'width .5s linear',
    },
    hit: {
        background: 'rgba(255,255,255,0.6)',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        transition: 'width .5s linear',
    },
    lifeInput: {
        position: 'relative',
        float: 'left',
        display: 'inline-block',
        width: 45,
        height: 19,
    },
    lifeSelect: {
        position: 'relative',
        float: 'left',
        display: 'inline-block',
        width: 70,
        height: 19,
    },
    lifeButton: {
        position: 'relative',
        float: 'left',
        display: 'inline-block',
        width: 45,
        height: 25,
        padding: 0,
    },
};
const styledName = {
    position: 'relative',
    width: `${widthLeft}px`,
    height: 25,
    float: 'left',
    display: 'inline-block',
};
const styledHeaderText = {
    position: 'absolute',
    width: `${widthRightPanel}px`,
    height: 25,
    float: 'left',
    display: 'inline-block',
    left: 0,
};
const styledHeaderStatus = {
    position: 'relative',
    width: `${widthLeft}px`,
    height: 25,
    float: 'left',
    display: 'inline-block',
};
const styledHeaderGold = {
    position: 'relative',
    width: `${widthLeft}px`,
    height: 25,
    float: 'left',
    display: 'inline-block',
};
const styledIcon = {
    position: 'relative',
    width: `${imageSize}px`,
    height: `${imageSize}px`,
    float: 'left',
    display: 'inline-block',
};
const styledAttribute = {
    marginLeft: 5,
    float: 'left',
    display: 'inline-block',
};

const statusList = [
    'OK',
    'Poisoned',
    'Paralyzed',
    'Burned',
    'Sleepy',
    'Under control',
    'Dead',
];

class RightPanel extends Component {
    state = {
        status: this.props.character.status
            ? this.props.character.status
            : 'OK',
        infoTab: 'Weapons',
        damageTaken: 0,
        gold: 0,
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
            health + damageTaken < 0
                ? 0
                : health + damageTaken > maxHealth
                    ? maxHealth
                    : health + damageTaken;

        firebase
            .database()
            .ref(
                'stories/' +
                    currentStory +
                    '/characters/' +
                    uid +
                    '/character/health'
            )
            .set(healthLeft)
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

    // for GM only
    // onGoldChange = () => {
    //     const { character, currentStory, uid } = this.props;
    //     const { gold } = this.state;
    //
    //     const goldToSet = character.gold + gold < 0 ? 0 : character.gold + gold;
    //
    //     firebase
    //         .database()
    //         .ref(
    //             "stories/" +
    //                 currentStory +
    //                 "/characters/" +
    //                 uid +
    //                 "/character/gold",
    //         )
    //         .set(goldToSet)
    //         .catch(error => {
    //             // Handle Errors here.
    //             this.triggerError(error);
    //         });
    // };

    displayCharacter = () => {
        const { character } = this.props;
        const { infoTab } = this.state;

        return (
            <div style={styles.CharacterBox}>
                <div style={styles.characterHeader}>
                    <img
                        src={character.icon}
                        alt={character.name}
                        style={styledIcon}
                    />
                    <div style={styledName}>{character.name}</div>
                    <div style={styles.healthBar}>
                        <div
                            style={{
                                ...styles.bar,
                                width: `${(character.health /
                                    character.maxHealth) *
                                    100}%`,
                            }}
                        />
                    </div>
                    <div style={styles.characterHeaderinfos}>
                        <div style={styledHeaderStatus}>
                            Status :{character.status ? character.status : 'OK'}
                        </div>
                        <div style={styledHeaderGold}>
                            Gold : {character.gold ? character.gold : 0}
                        </div>
                    </div>
                </div>
                <div style={styles.characterAttributeInfos}>
                    <div style={styles.BoxHeader}>Attributes :</div>
                    <div style={styledAttribute}>
                        Stre : {character.strength}
                    </div>
                    <div style={styledAttribute}>
                        Dext : {character.dexterity}
                    </div>
                    <div style={styledAttribute}>
                        Perc : {character.perception}
                    </div>
                    <div style={styledAttribute}>Magi : {character.magic}</div>
                    <div style={styledAttribute}>
                        Cons : {character.constitution}
                    </div>
                    <div style={styledAttribute}>
                        Char : {character.charisma}
                    </div>
                    <div style={styledAttribute}>Luck : {character.luck}</div>
                    <div style={styledAttribute}>
                        Educ : {character.education}
                    </div>
                </div>
                <div style={styles.characterOtherInfos}>
                    <div style={styles.tabsButtons}>
                        <button
                            onClick={() => this.onChangeTab('Weapons')}
                            style={styles.tabButton}
                        >
                            Weapons
                        </button>
                        <button
                            onClick={() => this.onChangeTab('Abilities')}
                            style={styles.tabButton}
                        >
                            Abilities
                        </button>
                        <button
                            onClick={() => this.onChangeTab('Skills')}
                            style={styles.tabButton}
                        >
                            Skills
                        </button>
                        <button
                            onClick={() => this.onChangeTab('Items')}
                            style={styles.tabButton}
                        >
                            Items
                        </button>
                    </div>
                    <div style={styles.tabPanel}>
                        {infoTab === 'Weapons' && (
                            <div>
                                <div style={styles.BoxHeader}>Weapons :</div>
                                {character.weapons.map(weapon => {
                                    return (
                                        <div style={styles.tabPanelItem}>
                                            {weapon}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                        {infoTab === 'Abilities' && (
                            <div>
                                <div style={styles.BoxHeader}>Abilities :</div>
                                {character.abilities.map(ability => {
                                    return (
                                        <div style={styles.tabPanelItem}>
                                            {ability}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                        {infoTab === 'Skills' && (
                            <div>
                                <div style={styles.BoxHeader}>Skills :</div>
                                {character.skills.map(skill => {
                                    return (
                                        <div style={styles.tabPanelItem}>
                                            {skill}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                        {infoTab === 'Items' && (
                            <div>
                                <div style={styles.BoxHeader}>Items :</div>
                                {character.items.map(item => {
                                    return (
                                        <div style={styles.tabPanelItem}>
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                style={styles.itemQuantity}
                                            />
                                            <div style={styles.itemName}>
                                                {item.name}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                    <input
                        type="number"
                        placeholder="X"
                        name="damageTaken"
                        value={this.state.damageTaken}
                        onChange={e => {
                            this.onChange(e.target.name, e.target.value);
                        }}
                        style={styles.lifeInput}
                    />
                    <button
                        onClick={this.onLifeChange}
                        style={styles.lifeButton}
                    >
                        HP
                    </button>
                    <select
                        value={this.state.status}
                        onChange={e => {
                            this.onChange('status', e.target.value);
                        }}
                        style={styles.lifeSelect}
                    >
                        {statusList.map(sts => {
                            return <option value={sts}>{sts}</option>;
                        })}
                    </select>
                    <button
                        onClick={this.onStatusChange}
                        style={styles.lifeButton}
                    >
                        Status
                    </button>
                </div>
            </div>
        );
    };

    render() {
        const {
            pseudo,
            chatInput,
            chatHistory,
            onChange,
            doSetState,
            isAdmin,
            triggerError,
            character,
            users,
            storyCharacters,
            gameMaster,
            uid,
        } = this.props;

        return (
            <div style={styles.RightPanel}>
                <div style={styles.CharPanel}>{this.displayCharacter()}</div>
                <div style={styles.TeamPanel}>
                    <div style={styledHeaderText}>Equipe</div>
                    <div style={styles.teamCharacters}>
                        {storyCharacters.map(storyCharacter => {
                            return (
                                <div style={styles.characterTeamHeader}>
                                    <img
                                        src={storyCharacter.icon}
                                        alt={storyCharacter.name}
                                        style={styles.characterTeamHeaderImage}
                                    />
                                    <div style={styles.characterTeamHeaderInfo}>
                                        {storyCharacter.name}
                                    </div>
                                    <div style={styles.characterTeamHeaderInfo}>
                                        Status :
                                        {storyCharacter.status
                                            ? storyCharacter.status
                                            : 'OK'}
                                    </div>
                                    <div style={styles.characterTeamHeaderInfo}>
                                        Gold :
                                        {storyCharacter.gold
                                            ? storyCharacter.gold
                                            : 0}
                                    </div>
                                    <div style={styles.teamHealthBar}>
                                        <div
                                            style={{
                                                ...styles.bar,
                                                width: `${(storyCharacter.health /
                                                    storyCharacter.maxHealth) *
                                                    100}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <Chat
                    uid={uid}
                    users={users}
                    gameMaster={gameMaster}
                    character={character}
                    isAdmin={isAdmin}
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
    isAdmin: PropTypes.bool.isRequired,
    pseudo: PropTypes.string.isRequired,
    chatInput: PropTypes.string.isRequired,
    chatHistory: PropTypes.array.isRequired,
    storyCharacters: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    doSetState: PropTypes.func.isRequired,
    triggerError: PropTypes.func.isRequired,
};

export default RightPanel;
