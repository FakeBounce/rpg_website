import React, { Component } from 'react';
import firebase from 'firebase';
import './App.css';
import Merchant from './Merchant';
import Item from './Item';
import ItemDescription from './ItemDescription';
import Town from './Town';
import CharacterSelection from './CharacterSelection';
import CharacterCreation from './CharacterCreation';
import IsNotAuth from './IsNotAuth';
import HasNoPseudo from "./HasNoPseudo";

const widthRightPanel = 300;
const heightHeader = 100;
const heightBottomPanel = 150;
// const gridHeight = 20;
// const gridWidth = 20;
const gridLength = 20;
const gridDimension = Math.floor((window.innerHeight - 250) / gridLength);
const widthLeft =
    window.innerWidth -
    gridLength * gridDimension -
    gridLength * 2 -
    widthRightPanel;
const heightLeft = gridLength * gridDimension;
// const gridDimension = 30;

const styledSignOut = {
    float: 'right',
};

const styledBoxHeader = {
    width: '100%',
    height: '20px',
    marginBottom: '5px',
    textAlign: 'center',
};

const styledHistoric = {
    width: '100%',
    height: `${((window.innerHeight - heightHeader) * 33) / 100 - 25 - 20}px`,
    float: 'left',
    display: 'inline-block',
};

const styledChatRow = {
    width: '100%',
    height: '20px',
    float: 'left',
    display: 'inline-block',
    textAlign: 'left',
};

const styledChatBox = {
    width: '100%',
    height: '20px',
    float: 'left',
    display: 'inline-block',
};

const styledChatInput = {
    width: '88%',
    height: '20px',
    float: 'left',
    display: 'inline-block',
};

const styledChatButton = {
    width: '10%',
    height: '20px',
    float: 'left',
    display: 'inline-block',
};

const styledMapButtons = {
    border: '1px solid blue',
    width: `${gridDimension * 3 + 3}px`,
    height: `${gridDimension}px`,
    display: 'inline-block',
    float: 'left',
};

const styledGrid = {
    border: '1px solid pink',
    width: `${gridDimension}px`,
    height: `${gridDimension}px`,
    display: 'inline-block',
    float: 'left',
};

const styledRow = {
    width: `${gridDimension * gridLength + gridLength * 2}px`,
    height: `${gridDimension}px`,
    display: 'inline-block',
    float: 'left',
};

const styledHeader = {
    borderBottom: '1px solid black',
    width: '100%',
    height: `${heightHeader}px`,
};

const styledMap = {
    border: '1px solid grey',
    width: `${gridDimension * gridLength + gridLength * 2}px`,
    height: `${gridDimension * gridLength}px`,
    display: 'inline-block',
    float: 'left',
};

const styledBottomPanel = {
    position: 'absolute',
    bottom: '0px',
    left: '0px',
    borderTop: '1px solid black',
    width: `${window.innerWidth - widthRightPanel}px`,
    height: `${heightBottomPanel}px`,
};

const styledRightPanel = {
    position: 'absolute',
    top: `${heightHeader}px`,
    right: '0px',
    borderLeft: '1px solid black',
    width: `${widthRightPanel}px`,
    height: `${window.innerHeight - heightHeader}px`,
};

const styledCharPanel = {
    borderBottom: '1px solid black',
    width: '100%',
    height: '33%',
};

const styledItemsPanel = {
    borderBottom: '1px solid black',
    width: '100%',
    height: '33%',
};

const styledChatPanel = {
    width: '100%',
};

const styledMapSide = {
    border: '1px solid brown',
    width: `${widthLeft / 2 - 3}px`,
    height: `${heightLeft / 2 - 1}px`,
    display: 'inline-block',
    float: 'left',
    textAlign: 'left',
};

const items = [
    {
        name: 'tamere',
        description: 'moncul',
        icon: 'potion_1',
    },
    {
        name: 'tamere',
        description: 'mes fesses',
        icon: 'potion_1',
    },
];

const merchantList = [
    {
        name: 'alchimiste Debron',
        description: 'Homme sénil',
        shop_description: 'Vieux bâtiment',
        icon: 'alchimist',
        items,
    },
];

const towns = [
    {
        name: 'Hameau de mes fesses',
        positionX: 6,
        positionY: 6,
        icon: 'big_town',
        merchants: merchantList,
    },
];

const gridTypes = [
    {
        name: 'Fog',
        background: 'black',
    },
    {
        name: 'Ocean',
        background: 'blue',
    },
    {
        name: 'Forest',
        icon: 'forest.png',
    },
];

class App extends Component {
    state = {
        isAuth: false,
        errorMessage: '',
        isItemShowed: false,
        itemsList: [],
        isItemDescriptionShowed: false,
        itemToDescribe: {},
        isMerchantsShowed: false,
        merchantsList: [],
        email: '',
        password: '',
        isAdmin: false,
        pseudo: '',
        pseudoInput: '',
        uid: '',
        character: 0,
        characters: {},
        characterCreation: false,
        map: [],
        chatInput: '',
        chatHistory: [],
        textureToApply: null,
    };

    componentDidMount() {}

    onChange = (name, value) => {
        const obj = {};
        obj[name] = value;
        this.setState(state => ({
            ...state,
            ...obj,
        }));
    };

    signIn = () => {
        const { email, password } = this.state;
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                firebase
                    .database()
                    .ref('/users/' + firebase.auth().currentUser.uid)
                    .once('value')
                    .then(snapshot => {
                        this.setState(
                            state => ({
                                ...state,
                                ...snapshot.val(),
                                isAuth: true,
                                uid: firebase.auth().currentUser.uid,
                            }),
                            () => {
                                this.createTable();
                                this.createChat();
                            }
                        );
                    });
            })
            .catch(error => {
                // Handle Errors here.
                this.triggerError(error);
            });
    };

    signUp = () => {
        const { email, password } = this.state;
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                firebase
                    .database()
                    .ref('users/' + this.state.uid)
                    .set({
                        email,
                        photoUrl: firebase.auth().currentUser.photoURL,
                        name: firebase.auth().currentUser.displayName,
                    })
                    .catch(error => {
                        this.triggerError(error);
                    });
                this.setState(state => ({
                    ...state,
                    isAuth: true,
                }));
            })
            .catch(error => {
                // Handle Errors here.
                this.triggerError(error);
            });
    };

    signOut = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                // Sign-out successful.
                this.setState(state => ({
                    ...state,
                    isAuth: false,
                }));
            })
            .catch(error => {
                // An error happened.
                this.triggerError(error);
            });
    };

    choosePseudo = () => {
        firebase
            .database()
            .ref('users/' + firebase.auth().currentUser.uid + '/pseudo')
            .set(this.state.pseudoInput)
            .catch(error => {
                this.triggerError(error);
            });
        this.setState(state => ({
            ...state,
            pseudo: state.pseudoInput,
        }));
    };

    getMerchantsFromTown = merchants => {
        return merchants.map(item => {
            return (
                <Merchant
                    key={`merchant-${item.name}`}
                    {...item}
                    showItems={this.showItems}
                />
            );
        });
    };

    getItemsFromMerchant = itemsFormMerchant => {
        return itemsFormMerchant.map(itemFromMerchant => {
            return (
                <Item
                    key={`item-${itemFromMerchant.name}`}
                    {...itemFromMerchant}
                    showItemDescription={this.showItemDescription}
                />
            );
        });
    };

    getCharacters = () => {
        return Object.keys(this.state.characters).map(char => {
            return (
                <CharacterSelection
                    key={`char-${char.name}`}
                    {...this.state.characters[char]}
                    chooseCharacter={this.chooseCharacter}
                />
            );
        });
    };

    chooseCharacter = id => {
        this.setState(state => ({
            ...state,
            character: id,
        }));
    };

    goToCharacterForm = () => {
        this.setState(state => ({
            ...state,
            characterCreation: true,
        }));
    };

    createCharacter = character => {
        const charTab = this.state.characters;
        charTab[character.id] = character;
        this.setState(
            state => ({
                ...state,
                characters: charTab,
                character: character.id,
            }),
            () => {
                firebase
                    .database()
                    .ref('users/' + this.state.uid + '/characters')
                    .set({ ...this.state.characters })
                    .catch(error => {
                        // Handle Errors here.
                        this.triggerError(error);
                    });
            }
        );
    };

    getGridTypes = grids => {
        return grids.map(gridType => {
            if (gridType.background) {
                return (
                    <div
                        key={`gridType-${gridType.background}`}
                        style={{
                            ...styledGrid,
                            border: 'none',
                            borderLeft: '1px solid black',
                            backgroundColor: gridType.background,
                        }}
                        onClick={() => this.loadTexture(gridType)}
                    />
                );
            } else if (gridType.icon) {
                return (
                    <div
                        key={`gridType-${gridType.icon}`}
                        style={{
                            ...styledGrid,
                            border: 'none',
                            borderLeft: '1px solid black',
                            backgroundImage: `url(${gridType.icon})`,
                            backgroundSize: 'cover',
                        }}
                        onClick={() => this.loadTexture(gridType)}
                    />
                );
            }
            return null;
        });
    };

    getGridSelected = grid => {
        if (grid.background) {
            return (
                <div
                    style={{
                        ...styledGrid,
                        border: 'none',
                        borderLeft: '1px solid black',
                        backgroundColor: grid.background,
                    }}
                    onClick={() => this.unloadTexture()}
                />
            );
        } else if (grid.icon) {
            return (
                <div
                    style={{
                        ...styledGrid,
                        border: 'none',
                        borderLeft: '1px solid black',
                        backgroundImage: `url(${grid.icon})`,
                        backgroundSize: 'cover',
                    }}
                    onClick={() => this.unloadTexture()}
                />
            );
        }
        return null;
    };

    unloadTexture = () => {
        this.setState(state => ({
            ...state,
            textureToApply: null,
        }));
    };

    loadTexture = gridType => {
        this.setState(state => ({
            ...state,
            textureToApply: gridType,
        }));
    };

    showMerchantList = list => {
        this.setState(state => ({
            ...state,
            isMerchantsShowed: true,
            merchantsList: list,
        }));
    };

    showItems = list => {
        this.setState(state => ({
            ...state,
            isItemShowed: true,
            itemsList: list,
        }));
    };

    showItemDescription = itemToDescribe => {
        this.setState(state => ({
            ...state,
            isItemDescriptionShowed: true,
            itemToDescribe: itemToDescribe,
        }));
    };

    createGrid = (positionX, rowToRender) => {
        const { isAdmin, textureToApply } = this.state;
        const table = [];

        rowToRender.map((row, index) => {
            const tileStyle = row.background
                ? {
                      backgroundColor: row.background,
                  }
                : row.icon
                    ? {
                          backgroundImage: `url(${row.icon})`,
                          backgroundSize: 'cover',
                      }
                    : {};
            table.push(
                isAdmin ? (
                    <div
                        key={`row-${index}`}
                        style={{ ...styledGrid, ...tileStyle }}
                        onClick={() => {
                            if (textureToApply)
                                this.setTexture(positionX, index);
                        }}
                    >
                        {towns.map(town => {
                            if (
                                positionX === town.positionX &&
                                index === town.positionY
                            ) {
                                return (
                                    <Town
                                        key={`town-${town.positionX}-${
                                            town.positionY
                                        }`}
                                        {...town}
                                        showMerchantList={this.showMerchantList}
                                    />
                                );
                            }
                            return null;
                        })}
                    </div>
                ) : (
                    <div
                        key={`row-${index}`}
                        style={{ ...styledGrid, ...tileStyle }}
                    >
                        {towns.map(town => {
                            if (
                                positionX === town.positionX &&
                                index === town.positionY
                            ) {
                                return (
                                    <Town
                                        key={`town-${town.positionX}-${
                                            town.positionY
                                        }`}
                                        {...town}
                                        showMerchantList={this.showMerchantList}
                                    />
                                );
                            }
                            return null;
                        })}
                    </div>
                )
            );
        });
        return table;
    };

    setTexture = (x, y) => {
        firebase
            .database()
            .ref('maps/dravos/' + x + '/' + y)
            .set(this.state.textureToApply)
            .catch(error => {
                // Handle Errors here.
                this.triggerError(error);
            });
    };

    createTable = () => {
        firebase
            .database()
            .ref('/maps/dravos')
            .on('value', snapshot => {
                // console.log('snapshot', snapshot.val());
                this.setState(state => ({
                    ...state,
                    map: snapshot.val(),
                }));
            });
    };

    generateTable = mapToRender => {
        const table = [];
        mapToRender.map((row, index) => {
            table.push(
                <div key={`table-row-${index}`} style={styledRow}>
                    {this.createGrid(index, row)}
                </div>
            );
        });
        return table;
    };

    generateChat = chatHistory => {
        const table = [];
        chatHistory.map((row, index) => {
            table.push(
                <div key={`chat-row-${index}`} style={styledChatRow}>
                    {row.pseudo
                        ? `@${row.pseudo}: ${row.message}`
                        : row.message}
                </div>
            );
        });
        return table;
    };

    createChat = () => {
        firebase
            .database()
            .ref('/chat')
            .on('value', snapshot => {
                if (snapshot.val() !== null) {
                    this.setState(state => ({
                        ...state,
                        chatHistory: snapshot.val(),
                    }));
                }
            });
    };

    talkInChat = () => {
        const { chatInput, pseudo } = this.state;
        let noMagicWord = true;
        if (chatInput !== '') {
            if (chatInput.length >= 3) {
                if (chatInput[0] === '/') {
                    if (chatInput[1] === 'd') {
                        const splittedString = chatInput
                            .toLowerCase()
                            .split('/d')[1];
                        const isnum = /^\d+$/.test(splittedString);
                        if (isnum) {
                            noMagicWord = false;
                            this.sendChatInput({
                                message: `@${pseudo} launched a D${splittedString}. Result : ${Math.floor(
                                    Math.random() *
                                        parseInt(splittedString, 10) +
                                        1
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
        const { chatHistory } = this.state;
        const nextChat = chatHistory;
        nextChat.push(input);
        firebase
            .database()
            .ref('chat/')
            .set(nextChat)
            .then(() => {
                this.setState(state => ({
                    ...state,
                    error: '',
                    chatInput: '',
                }));
            })
            .catch(error => {
                // Handle Errors here.
                this.triggerError(error);
            });
    };

    triggerError = error => {
        this.setState(
            state => ({
                ...state,
                error: error.message,
            }),
            () => {
                setTimeout(() => {
                    this.setState(state => ({
                        ...state,
                        error: '',
                    }));
                }, 5000);
            }
        );
    };

    render() {
        const {
            isItemShowed,
            itemsList,
            isItemDescriptionShowed,
            itemToDescribe,
            isMerchantsShowed,
            merchantsList,
            isAuth,
            errorMessage,
            email,
            password,
            isAdmin,
            pseudo,
            pseudoInput,
            character,
            uid,
            characterCreation,
            map,
            chatInput,
            chatHistory,
            textureToApply,
        } = this.state;

        return (
            <div className="App">
                {!isAuth && (
                    <IsNotAuth
                        email={email}
                        password={password}
                        onChange={this.onChange}
                        signIn={this.signIn}
                        signUp={this.signUp}
                    />
                )}

                {isAuth &&
                    pseudo === '' && (
                        <HasNoPseudo pseudoInput={pseudoInput} onChange={this.onChange} choosePseudo={this.choosePseudo}/>
                    )}

                {isAuth &&
                    pseudo !== '' &&
                    character === 0 &&
                    !characterCreation && (
                        <div>
                            <div style={styledBoxHeader}>
                                Choisir un personnage
                            </div>
                            <button onClick={this.goToCharacterForm}>
                                Créer un personnage
                            </button>
                            <div style={styledBoxHeader}>Vos personnages :</div>
                            {this.getCharacters()}
                        </div>
                    )}

                {isAuth &&
                    pseudo !== '' &&
                    character === 0 &&
                    characterCreation && (
                        <div>
                            <div style={styledBoxHeader}>
                                Créer un personnage
                            </div>
                            <CharacterCreation
                                uid={uid}
                                id={
                                    Object.keys(this.state.characters).length +
                                    1
                                }
                                createCharacter={this.createCharacter}
                            />
                        </div>
                    )}
                {isAuth &&
                    pseudo !== '' &&
                    character > 0 && (
                        <div>
                            <div style={styledHeader}>
                                <div style={styledBoxHeader}>Header</div>
                                <button
                                    style={styledSignOut}
                                    onClick={this.signOut}
                                >
                                    Sign Out
                                </button>
                            </div>
                            <div style={styledMap}>
                                {this.generateTable(map)}
                            </div>
                            {isAdmin && (
                                <div style={styledMapSide}>
                                    <div style={styledBoxHeader}>
                                        Modifier la carte
                                    </div>
                                    <div style={styledMapButtons}>
                                        {this.getGridTypes(gridTypes)}
                                    </div>
                                    <div style={styledMapButtons}>
                                        {textureToApply &&
                                            this.getGridSelected(
                                                textureToApply
                                            )}
                                    </div>
                                </div>
                            )}
                            {!isAdmin && (
                                <div>
                                    {isMerchantsShowed && (
                                        <div style={styledMapSide}>
                                            <div style={styledBoxHeader}>
                                                Liste des quêtes
                                            </div>
                                        </div>
                                    )}
                                    {isMerchantsShowed && (
                                        <div style={styledMapSide}>
                                            <div style={styledBoxHeader}>
                                                Liste des marchands
                                            </div>
                                            {this.getMerchantsFromTown(
                                                merchantsList
                                            )}
                                        </div>
                                    )}
                                    {isItemShowed && (
                                        <div style={styledMapSide}>
                                            <div style={styledBoxHeader}>
                                                Liste des objets
                                            </div>
                                            {this.getItemsFromMerchant(
                                                itemsList
                                            )}
                                        </div>
                                    )}
                                    {isItemDescriptionShowed && (
                                        <div style={styledMapSide}>
                                            <div style={styledBoxHeader}>
                                                Description
                                            </div>
                                            <ItemDescription
                                                {...itemToDescribe}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                            <div style={styledRightPanel}>
                                <div style={styledCharPanel}>
                                    <div style={styledBoxHeader}>
                                        Personnage
                                    </div>
                                </div>
                                <div style={styledItemsPanel}>
                                    <div style={styledBoxHeader}>Items/Or</div>
                                </div>
                                <div style={styledChatPanel}>
                                    <div style={styledBoxHeader}>Chat</div>
                                    <div style={styledHistoric}>
                                        {this.generateChat(chatHistory)}
                                    </div>
                                    <div style={styledChatBox}>
                                        <input
                                            type="text"
                                            name="chatInput"
                                            placeholder="Chat !"
                                            value={chatInput}
                                            onChange={e => {
                                                this.onChange(
                                                    e.target.name,
                                                    e.target.value
                                                );
                                            }}
                                            style={styledChatInput}
                                        />
                                        <button
                                            style={styledChatButton}
                                            onClick={this.talkInChat}
                                        >
                                            OK
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div style={styledBottomPanel}>
                                <div style={styledBoxHeader}>Cameras</div>
                            </div>
                        </div>
                    )}
            </div>
        );
    }
}

export default App;
