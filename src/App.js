import React, { Component } from 'react';
import firebase from 'firebase';
import './App.css';
import Town from './Town';
import IsNotAuth from './IsNotAuth';
import HasNoPseudo from './HasNoPseudo';
import CharacterSelection from './CharacterSelection';
import BottomPanel from './BottomPanel';
import RightPanel from './RightPanel';
import PlayerMapPanel from './PlayerMapPanel';
import GMMapPanel from './GMMapPanel';

const heightHeader = 100;
// const gridHeight = 20;
// const gridWidth = 20;
const gridLength = 20;
const gridDimension = Math.floor((window.innerHeight - 250) / gridLength);
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

const styledChatHelpBox = {
    width: '100%',
    height: '20px',
    marginBottom: '5px',
    textAlign: 'center',
    borderBottom: '1px solid black',
    float: 'left',
    display: 'inline-block',
};

const styledCommandName = {
    width: '20%',
    height: '20px',
    textAlign: 'left',
    float: 'left',
    display: 'inline-block',
};

const styledCommandAction = {
    width: '80%',
    height: '20px',
    textAlign: 'left',
    float: 'left',
    display: 'inline-block',
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

const chatCommands = [
    {
        name: '/dX, /diceX',
        action: 'Launch dice X, returning random number between 1 and X',
    },
    {
        name: '/gmdX, /gmdiceX',
        action:
            'Launch dice X, returning random number between 1 and X. Only GM and you can see it.',
    },
    {
        name: '/strength, /str, /force, /for...',
        action:
            'Launch dice 100 corresponding to attribute. Says if succeeded or failed.',
    },
    {
        name: '/w Player Message',
        action: 'Send Message to Player only.',
    },
    {
        name: '/gmw Message',
        action: 'Send Message to GM only.',
    },
    {
        name: '/tmw Message',
        action: "Send Message to team only (GM can't see it).",
    },
];

class App extends Component {
    state = {
      characterId: 0,
      character: {},
        characters: {},
        characterCreation: false,
        chatInput: '',
        chatHistory: [],
        currentStory: -1,
        errorMessage: '',
        email: '',
        isAuth: false,
        isItemShowed: false,
        itemsList: [],
        isItemDescriptionShowed: false,
        itemToDescribe: {},
        isMerchantsShowed: false,
        isAdmin: false,
        isGameMaster: false,
        map: [],
        merchantsList: [],
        onChatHelp: false,
        password: '',
        pseudo: '',
        pseudoInput: '',
        uid: '',
        users: null,
        stories: [],
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

    signOut = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                // Sign-out successful.
                this.setState(state => ({
                    characterId: 0,
                    character: {},
                    characters: {},
                    characterCreation: false,
                    chatInput: '',
                    chatHistory: [],
                    currentStory: -1,
                    errorMessage: '',
                    email: '',
                    isAuth: false,
                    isItemShowed: false,
                    itemsList: [],
                    isItemDescriptionShowed: false,
                    itemToDescribe: {},
                    isMerchantsShowed: false,
                    isAdmin: false,
                    isGameMaster: false,
                    map: [],
                    merchantsList: [],
                    onChatHelp: false,
                    password: '',
                    pseudo: '',
                    pseudoInput: '',
                    uid: '',
                    users: null,
                    stories: [],
                    textureToApply: null,
                }));
            })
            .catch(error => {
                // An error happened.
                this.triggerError(error);
            });
    };

    showMerchantList = list => {
        this.setState(state => ({
            ...state,
            isMerchantsShowed: true,
            merchantsList: list,
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
            return null;
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

    loadUsers = () => {
        firebase
            .database()
            .ref('/users')
            .on('value', snapshot => {
                // console.log('snapshot', snapshot.val());
                this.setState(state => ({
                    ...state,
                    users: snapshot.val(),
                }));
            });
    };

    loadStories = () => {
        firebase
            .database()
            .ref('/stories')
            .on('value', snapshot => {
                this.setState(state => ({
                    ...state,
                    stories: snapshot.val(),
                }));
            });
    };

    chooseStory = i => {
        const { stories, uid } = this.state;
        let isGM = false;

        if (stories[i].gameMaster === uid) isGM = true;
        
        if(typeof stories[i][uid] !== 'undefined')
        {
  
          //@TODO : Activate when GM will have proper tabs
          this.setState(state => ({
            ...state,
            currentStory: i,
            // isGameMaster: isGM,
            characterId: stories[i][uid].characterId,
            character: stories[i][uid].character,
          }));
        }
        else {
          //@TODO : Activate when GM will have proper tabs
          this.setState(state => ({
            ...state,
            currentStory: i,
            // isGameMaster: isGM,
          }));
        }
    };

    generateTable = mapToRender => {
        const table = [];
        mapToRender.map((row, index) => {
            table.push(
                <div key={`table-row-${index}`} style={styledRow}>
                    {this.createGrid(index, row)}
                </div>
            );
            return null;
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

    accessChatHelp = () => {
        this.setState(state => ({
            ...state,
            onChatHelp: !state.onChatHelp,
        }));
    };

    doSetState = (obj, cb = null) => {
        this.setState(
            state => ({
                ...state,
                ...obj,
            }),
            () => {
                if (cb) cb();
            }
        );
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
            email,
            password,
            isAdmin,
            pseudo,
            pseudoInput,
            characterId,
            character,
            characterCreation,
            map,
            chatInput,
            chatHistory,
            textureToApply,
            characters,
            error,
            users,
            uid,
            onChatHelp,
            isGameMaster,
            currentStory,
            stories,
        } = this.state;

        return (
            <div className="App">
                {!isAuth && (
                    <IsNotAuth
                        email={email}
                        password={password}
                        onChange={this.onChange}
                        doSetState={this.doSetState}
                        triggerError={this.triggerError}
                        createChat={this.createChat}
                        createTable={this.createTable}
                        loadUsers={this.loadUsers}
                        loadStories={this.loadStories}
                    />
                )}

                {isAuth &&
                    pseudo === '' && (
                        <HasNoPseudo
                            pseudoInput={pseudoInput}
                            onChange={this.onChange}
                            doSetState={this.doSetState}
                            triggerError={this.triggerError}
                        />
                    )}

                {isAuth &&
                    pseudo !== '' &&
                    currentStory === -1 && (
                        <div>
                            Select a story :
                            {stories.map((s, index) => {
                                return (
                                    <div
                                        onClick={() => this.chooseStory(index)}
                                        style={{
                                            width: 200,
                                            height: 200,
                                            border: '1px solid black',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {s.name}
                                        <img
                                            src={'dravos.jpg'}
                                            style={{ width: 150, height: 150 }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    )}

                {!isGameMaster &&
                    isAuth &&
                    pseudo !== '' &&
                    currentStory > -1 &&
                characterId === 0 && (
                        <CharacterSelection
                            uid={uid}
                            currentStory={currentStory}
                            characterCreation={characterCreation}
                            characters={characters}
                            doSetState={this.doSetState}
                            triggerError={this.triggerError}
                        />
                    )}

                {isAuth &&
                    pseudo !== '' &&
                    currentStory > -1 &&
                    (characterId > 0 || isGameMaster) &&
                    (onChatHelp ? (
                        <div>
                            <div style={styledBoxHeader}>Chat commands</div>
                            <button
                                style={styledSignOut}
                                onClick={this.signOut}
                            >
                                Sign Out
                            </button>
                            <button
                                style={styledSignOut}
                                onClick={this.accessChatHelp}
                            >
                                Return to map
                            </button>
                            {chatCommands.map(chatCommand => {
                                return (
                                    <div style={styledChatHelpBox}>
                                        <div style={styledCommandName}>
                                            Name : {chatCommand.name}
                                        </div>
                                        <div style={styledCommandAction}>
                                            Action : {chatCommand.action}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div>
                            <div style={styledHeader}>
                                <div style={styledBoxHeader}>Header</div>
                                <button
                                    style={styledSignOut}
                                    onClick={this.signOut}
                                >
                                    Sign Out
                                </button>
                                <button
                                    style={styledSignOut}
                                    onClick={this.accessChatHelp}
                                >
                                    Access chat help
                                </button>
                            </div>
                            <div style={styledMap}>
                                {this.generateTable(map)}
                            </div>
                            {isGameMaster && (
                                <GMMapPanel
                                    textureToApply={textureToApply}
                                    doSetState={this.doSetState}
                                    triggerError={this.triggerError}
                                />
                            )}
                            {!isGameMaster && (
                                <PlayerMapPanel
                                    isItemShowed={isItemShowed}
                                    itemsList={itemsList}
                                    isItemDescriptionShowed={
                                        isItemDescriptionShowed
                                    }
                                    itemToDescribe={itemToDescribe}
                                    isMerchantsShowed={isMerchantsShowed}
                                    merchantsList={merchantsList}
                                    doSetState={this.doSetState}
                                    triggerError={this.triggerError}
                                />
                            )}
                            <RightPanel
                                users={users}
                                character={character}
                                isAdmin={isAdmin}
                                pseudo={pseudo}
                                chatInput={chatInput}
                                chatHistory={chatHistory}
                                onChange={this.onChange}
                                doSetState={this.doSetState}
                                triggerError={this.triggerError}
                            />
                            <BottomPanel />
                        </div>
                    ))}
                {error}
            </div>
        );
    }
}

export default App;
