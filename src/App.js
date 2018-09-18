import React, { Component } from "react";
import firebase from "firebase";
import "./App.css";
import Town from "./Town";
import IsNotAuth from "./IsNotAuth";
import HasNoPseudo from "./HasNoPseudo";
import CharacterSelection from "./CharacterSelection";
import BottomPanel from "./BottomPanel";
import RightPanel from "./RightPanel";
import PlayerMapPanel from "./PlayerMapPanel";
import GMMapPanel from "./GMMapPanel";
import StoriesList from "./StoriesList";
import ChatCommandsPanel from "./ChatCommandsPanel";
import Header from "./Header";

import { gridDimension, gridLength } from "./StyleConstants";

const styledGrid = {
    border: "1px solid pink",
    width: `${gridDimension}px`,
    height: `${gridDimension}px`,
    display: "inline-block",
    float: "left",
};

const styledRow = {
    width: `${gridDimension * gridLength + gridLength * 2}px`,
    height: `${gridDimension}px`,
    display: "inline-block",
    float: "left",
};

const styledMap = {
    border: "1px solid grey",
    width: `${gridDimension * gridLength + gridLength * 2}px`,
    height: `${gridDimension * gridLength}px`,
    display: "inline-block",
    float: "left",
};

const items = [
    {
        name: "tamere",
        description: "moncul",
        icon: "potion_1",
    },
    {
        name: "tamere",
        description: "mes fesses",
        icon: "potion_1",
    },
];

const merchantList = [
    {
        name: "alchimiste Debron",
        description: "Homme sénil",
        shop_description: "Vieux bâtiment",
        icon: "alchimist",
        items,
    },
];

const towns = [
    {
        name: "Hameau de mes fesses",
        positionX: 6,
        positionY: 6,
        icon: "big_town",
        merchants: merchantList,
    },
];

class App extends Component {
    state = {
        characterId: 0,
        character: {},
        characters: {},
        characterCreation: false,
        chatInput: "",
        chatHistory: [],
        currentStory: -1,
        errorMessage: "",
        email: "",
        gameMaster: "",
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
        password: "",
        pseudo: "",
        pseudoInput: "",
        uid: "",
        users: null,
        stories: [],
        storyCharacters: [],
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
                    chatInput: "",
                    chatHistory: [],
                    currentStory: -1,
                    errorMessage: "",
                    email: "",
                    gameMaster: "",
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
                    password: "",
                    pseudo: "",
                    pseudoInput: "",
                    uid: "",
                    users: null,
                    stories: [],
                    storyCharacters: [],
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
                          backgroundSize: "cover",
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
                ),
            );
            return null;
        });
        return table;
    };

    setTexture = (x, y) => {
        firebase
            .database()
            .ref("maps/dravos/" + x + "/" + y)
            .set(this.state.textureToApply)
            .catch(error => {
                // Handle Errors here.
                this.triggerError(error);
            });
    };

    createTable = () => {
        firebase
            .database()
            .ref("/maps/dravos")
            .on("value", snapshot => {
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
            .ref("/users")
            .on("value", snapshot => {
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
            .ref("/stories")
            .once("value")
            .then(snapshot => {
                this.setState(state => ({
                    ...state,
                    stories: snapshot.val(),
                }));
            })
            .catch(error => {
                // An error happened.
                this.triggerError(error);
            });
    };

    chooseStory = i => {
        const { stories, uid } = this.state;
        let isGM = false;

        if (stories[i].gameMaster === uid) isGM = true;

        if (
            typeof stories[i].characters !== "undefined" &&
            typeof stories[i].characters[uid] !== "undefined"
        ) {
            firebase
                .database()
                .ref("/stories/" + i + "/characters/" + uid + "/character")
                .on("value", snapshot => {
                    //@TODO : Activate when GM will have proper tabs
                    this.setState(state => ({
                        ...state,
                        character: snapshot.val(),
                        currentStory: i,
                        gameMaster: stories[i].gameMaster,
                        // isGameMaster: isGM,
                        characterId: stories[i].characters[uid].characterId,
                    }));
                });
        } else {
            //@TODO : Activate when GM will have proper tabs
            this.setState(state => ({
                ...state,
                currentStory: i,
                gameMaster: stories[i].gameMaster,
                // isGameMaster: isGM,
            }));
        }
        firebase
            .database()
            .ref("/stories/" + i + "/characters")
            .on("value", snapshot => {
                const charactersFromStories = [];
                if (typeof snapshot.val() !== "undefined" && snapshot.val()) {
                    Object.keys(snapshot.val()).map(key => {
                        charactersFromStories.push(
                            snapshot.val()[key].character,
                        );
                        return null;
                    });
                }
                this.setState(state => ({
                    ...state,
                    storyCharacters: charactersFromStories,
                }));
            });
    };

    generateTable = mapToRender => {
        const table = [];
        mapToRender.map((row, index) => {
            table.push(
                <div key={`table-row-${index}`} style={styledRow}>
                    {this.createGrid(index, row)}
                </div>,
            );
            return null;
        });
        return table;
    };

    createChat = () => {
        firebase
            .database()
            .ref("/chat")
            .on("value", snapshot => {
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
            },
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
                        error: "",
                    }));
                }, 5000);
            },
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
            storyCharacters,
            gameMaster,
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
                    pseudo === "" && (
                        <HasNoPseudo
                            pseudoInput={pseudoInput}
                            onChange={this.onChange}
                            doSetState={this.doSetState}
                            triggerError={this.triggerError}
                        />
                    )}

                {isAuth &&
                    pseudo !== "" &&
                    currentStory === -1 && (
                        <StoriesList
                            stories={stories}
                            chooseStory={this.chooseStory}
                        />
                    )}

                {!isGameMaster &&
                    isAuth &&
                    pseudo !== "" &&
                    currentStory > -1 &&
                    characterId === 0 && (
                        <CharacterSelection
                            uid={uid}
                            currentStory={currentStory}
                            characterCreation={characterCreation}
                            characters={characters}
                            doSetState={this.doSetState}
                            triggerError={this.triggerError}
                            chooseStory={this.chooseStory}
                        />
                    )}

                {isAuth &&
                    pseudo !== "" &&
                    currentStory > -1 &&
                    (characterId > 0 || isGameMaster) &&
                    (onChatHelp ? (
                        <ChatCommandsPanel
                            signOut={this.signOut}
                            accessChatHelp={this.accessChatHelp}
                        />
                    ) : (
                        <div>
                            <Header
                                signOut={this.signOut}
                                accessChatHelp={this.accessChatHelp}
                            />
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
                                gameMaster={gameMaster}
                                storyCharacters={storyCharacters}
                                currentStory={currentStory}
                                uid={uid}
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
