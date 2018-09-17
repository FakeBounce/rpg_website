import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';
import Chat from './Chat';

const widthRightPanel = 350;
const heightHeader = 100;
const imageSize = 100;
const widthLeft = widthRightPanel - imageSize;

const styles = {
    BoxHeader: {
        width: '100%',
        height: '20px',
        marginBottom: '5px',
        textAlign: 'center',
    },
    RightPanel: {
        position: 'absolute',
        top: `${heightHeader}px`,
        right: '0px',
        borderLeft: '1px solid black',
        width: `${widthRightPanel}px`,
        height: `${window.innerHeight - heightHeader}px`,
    },
    CharPanel: {
        position: 'relative',
        borderBottom: '1px solid black',
        width: '100%',
        height: '33%',
    },
    CharacterBox: { position: 'relative', height: '100%' },
    ItemsPanel: {
        borderBottom: '1px solid black',
        width: '100%',
        height: '33%',
    },
    characterHeaderinfos: {
        width: `${widthLeft}px`,
        height: '49px',
        position: 'relative',
        float: 'left',
        display: 'inline-block',
        borderBottom: '1px solid black',
    },
    characterAttributeInfos: {
        width: `${imageSize - 1}px`,
        height: `${(window.innerHeight - heightHeader) * 0.33 - imageSize}px`,
        position: 'relative',
        float: 'left',
        display: 'inline-block',
        borderRight: '1px solid black',
        overflowY: 'scroll',
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
        height: '25px',
        position: 'relative',
        float: 'left',
        display: 'inline-block',
    },
    tabButton: {
        width: `${widthLeft / 4}px`,
        height: '25px',
        padding: '0px',
        position: 'relative',
        float: 'left',
        display: 'inline-block',
    },
    tabPanel: {
        width: `${widthLeft}px`,
        height: `${(window.innerHeight - heightHeader) * 0.33 -
            imageSize -
            50}px`,
        padding: '0px',
        position: 'relative',
        float: 'left',
        display: 'inline-block',
        overflowY: 'scroll',
    },
    tabPanelItem: {
        width: `${widthLeft - 20}px`,
        height: '25px',
        paddingHorizontal: '5px',
        position: 'relative',
        float: 'left',
        display: 'inline-block',
    },
    itemName: {
        width: `${widthLeft - 70}px`,
        height: '25px',
        position: 'relative',
        float: 'left',
        display: 'inline-block',
    },
    itemQuantity: {
        width: '30px',
        height: '15px',
        position: 'relative',
        float: 'left',
        display: 'inline-block',
        padding: '0px',
        margin: '0px',
        textAlign: 'center',
    },
    healthBar: {
        boxSizing: 'border-box',
        width: `${widthLeft}px`,
        height: '20px',
        padding: '5px',
        background: '#ddd',
        borderRadius: '5px',
        position: 'relative',
        float: 'left',
        display: 'inline-block',
        marginBottom: '5px',
    },
    bar: {
        background: '#c54',
        position: 'relative',
        height: '10px',
        transition: 'width .5s linear',
    },
    hit: {
        background: 'rgba(255,255,255,0.6)',
        position: 'absolute',
        top: '0px',
        right: '0px',
        bottom: '0px',
        transition: 'width .5s linear',
    },
};
const styledName = {
    position: 'relative',
    width: `${widthLeft}px`,
    height: '25px',
    float: 'left',
    display: 'inline-block',
};
const styledHeaderStatus = {
    position: 'relative',
    width: `${widthLeft}px`,
    height: '25px',
    float: 'left',
    display: 'inline-block',
};
const styledHeaderGold = {
    position: 'relative',
    width: `${widthLeft}px`,
    height: '25px',
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
const styledText = {
    marginLeft: '5px',
    float: 'left',
    display: 'inline-block',
};
const styledWeapon = {
    marginLeft: '5px',
    float: 'left',
    display: 'inline-block',
};
const styledAttribute = {
    marginLeft: '5px',
    float: 'left',
    display: 'inline-block',
};
const styledSkill = {
    marginLeft: '5px',
    float: 'left',
    display: 'inline-block',
};
const styledAbility = {
    marginLeft: '5px',
    float: 'left',
    display: 'inline-block',
};
const styledItem = {
    marginLeft: '5px',
    float: 'left',
    display: 'inline-block',
};
const styledItemName = {
    marginLeft: '5px',
    float: 'left',
    display: 'inline-block',
};
const styledItemQuantity = {
    marginLeft: '5px',
    float: 'left',
    display: 'inline-block',
};
const styledGold = {
    marginLeft: '5px',
    float: 'left',
    display: 'inline-block',
};

class RightPanel extends Component {
    state = {
        maxHealth: this.props.character.life,
        healthPoints: '100%',
        healthHit: '0%',
        infoTab: 'Weapons',
        damageTaken: 0,
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

    onHit = () => {
        const {
            character: { life },
        } = this.props;
        const { damageTaken, maxHealth } = this.state;

        const percentHealthLeft = ((life - damageTaken) / maxHealth) * 100;
        const percentHealthDealt = (life / maxHealth) * 100 - percentHealthLeft;

        const pHL =
            percentHealthLeft < 0
                ? 0
                : percentHealthLeft > 100
                    ? 100
                    : percentHealthLeft;
        const pHD =
            percentHealthDealt < 0
                ? 0
                : percentHealthDealt > 100
                    ? 100
                    : percentHealthDealt;

        this.setState(
            state => ({
                ...state,
                healthHit: `${pHD}%`,
            }),
            () => {
                setTimeout(() => {
                    this.setState(state => ({
                        ...state,
                        healthPoints: `${pHL}%`,
                        healthHit: '0%',
                    }));
                }, 1000);
            }
        );
    };

    onSave = () => {
        this.setState(
            state => ({
                ...state,
                healthPoints: '100%',
                healthHit: '20%',
            }),
            () => {
                setTimeout(() => {
                    this.setState(state => ({
                        ...state,
                        healthPoints: '100%',
                        healthHit: '0%',
                    }));
                }, 1000);
            }
        );
    };

    displayCharacter = () => {
        const { character } = this.props;
        const { infoTab } = this.state;

        return (
            <div style={styles.CharacterBox}>
                <div>
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
                                width: this.state.healthPoints,
                            }}
                        >
                            <div
                                style={{
                                    ...styles.hit,
                                    width: this.state.healthHit,
                                }}
                            />
                        </div>
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
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: 30,
                        }}
                    />
                    <button
                        onClick={this.onHit}
                        style={{ position: 'absolute', bottom: 0, left: 40 }}
                    >
                        Hp lost
                    </button>
                    <button
                        onClick={this.onSave}
                        style={{ position: 'absolute', bottom: 0, right: 0 }}
                    >
                        Save
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
        } = this.props;

        return (
            <div style={styles.RightPanel}>
                <div style={styles.CharPanel}>{this.displayCharacter()}</div>
                <div style={styles.ItemsPanel}>
                    <div style={styles.BoxHeader}>Equipe</div>
                </div>
                <Chat
                    users={users}
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
    users: PropTypes.object.isRequired,
    character: PropTypes.object.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    pseudo: PropTypes.string.isRequired,
    chatInput: PropTypes.string.isRequired,
    chatHistory: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    doSetState: PropTypes.func.isRequired,
    triggerError: PropTypes.func.isRequired,
};

export default RightPanel;
