import React, { Component } from 'react';
import firebase from 'firebase';
import './App.css';
import Merchant from './Merchant';
import Item from './Item';
import ItemDescription from './ItemDescription';
import Town from './Town';
import CharacterSelection from './CharacterSelection';
import CharacterCreation from './CharacterCreation';

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
        map: '',
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
                            },
                        );
                    });
            })
            .catch(error => {
                // Handle Errors here.
                this.setState(
                    state => ({
                        ...state,
                        errorMessage: error.message,
                    }),
                    () => {
                        setTimeout(() => {
                            this.setState(state => ({
                                ...state,
                                errorMessage: '',
                            }));
                        }, 5000);
                    },
                );
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
                    });
                this.setState(state => ({
                    ...state,
                    isAuth: true,
                }));
            })
            .catch(error => {
                // Handle Errors here.
                this.setState(
                    state => ({
                        ...state,
                        errorMessage: error.message,
                    }),
                    () => {
                        setTimeout(() => {
                            this.setState(state => ({
                                ...state,
                                errorMessage: '',
                            }));
                        }, 5000);
                    },
                );
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
                console.log('error', error);
            });
    };

    choosePseudo = () => {
        firebase
            .database()
            .ref('users/' + firebase.auth().currentUser.uid + '/pseudo')
            .set(this.state.pseudoInput);
        this.setState(state => ({
            ...state,
            pseudo: state.pseudoInput,
        }));
    };

    getMerchantsFromTown = merchants => {
        return merchants.map(item => {
            return <Merchant {...item} showItems={this.showItems} />;
        });
    };

    getItemsFromMerchant = itemsFormMerchant => {
        return itemsFormMerchant.map(itemFromMerchant => {
            return (
                <Item
                    {...itemFromMerchant}
                    showItemDescription={this.showItemDescription}
                />
            );
        });
    };

    getCharacters = () => {
        return Object.keys(this.state.characters).map(char => {
            console.log('char', char);
            return (
                <CharacterSelection
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
                    .set({ ...this.state.characters });
            },
        );
    };

    getGridTypes = grids => {
        return grids.map(gridType => {
            if (gridType.background) {
                return (
                    <div
                        style={{
                            ...styledGrid,
                            border: 'none',
                            borderLeft: '1px solid black',
                            backgroundColor: gridType.background,
                        }}
                    />
                );
            } else if (gridType.icon) {
                return (
                    <div
                        style={{
                            ...styledGrid,
                            border: 'none',
                            borderLeft: '1px solid black',
                            backgroundImage: `url(${gridType.icon})`,
                            backgroundSize: 'cover',
                        }}
                    />
                );
            }
            return null;
        });
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
        const table = [];

        rowToRender.map((row, index) => {
            table.push(
                <div style={styledGrid}>
                    {towns.map(town => {
                        if (
                            positionX === town.positionX &&
                            index === town.positionY
                        ) {
                            return (
                                <Town
                                    {...town}
                                    showMerchantList={this.showMerchantList}
                                />
                            );
                        }
                        return null;
                    })}
                </div>,
            );
        });
        console.log('table row', table);
        return table;
    };

    createTable = () => {
        firebase
            .database()
            .ref('/maps/dravos')
            .on('value', snapshot => {
                // console.log('snapshot', snapshot.val());
                this.setState(state => ({
                    ...state,
                    map: this.generateTable(snapshot.val()),
                }));
            });
    };

    generateTable = mapToRender => {
        const table = [];
        mapToRender.map((row, index) => {
            table.push(
                <div style={styledRow}>{this.createGrid(index, row)}</div>,
            );
        });
        console.log('table table', table);
        return table;
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
            characters,
            uid,
            characterCreation,
            map,
        } = this.state;
        return (
            <div className='App'>
                {!isAuth && (
                    <div>
                        <input
                            type='text'
                            name='email'
                            placeholder='email'
                            value={email}
                            onChange={e => {
                                this.onChange(e.target.name, e.target.value);
                            }}
                        />
                        <input
                            type='password'
                            name='password'
                            placeholder='password'
                            value={password}
                            onChange={e => {
                                this.onChange(e.target.name, e.target.value);
                            }}
                        />
                        <button onClick={this.signIn}>Sign In</button>
                        <button onClick={this.signUp}>Sign Up</button>

                        {errorMessage !== '' && <div>{errorMessage}</div>}
                    </div>
                )}

                {isAuth &&
                    pseudo === '' && (
                        <div>
                            <input
                                type='text'
                                name='pseudoInput'
                                placeholder='pseudo'
                                value={pseudoInput}
                                onChange={e => {
                                    this.onChange(
                                        e.target.name,
                                        e.target.value,
                                    );
                                }}
                            />
                            <button onClick={this.choosePseudo}>
                                Choisir un pseudo
                            </button>
                        </div>
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
                            <div style={styledMap}>{map}</div>
                            {isAdmin && (
                                <div style={styledMapSide}>
                                    <div style={styledBoxHeader}>
                                        Modifier la carte
                                    </div>
                                    <div style={styledMapButtons}>
                                        {this.getGridTypes(gridTypes)}
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
                                                merchantsList,
                                            )}
                                        </div>
                                    )}
                                    {isItemShowed && (
                                        <div style={styledMapSide}>
                                            <div style={styledBoxHeader}>
                                                Liste des objets
                                            </div>
                                            {this.getItemsFromMerchant(
                                                itemsList,
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
