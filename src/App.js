import React, { Component } from "react";
import firebase from "firebase";
import Sound from "react-sound";
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
        name: "Potion de soin léger",
        description:
            "Potion de soin léger, referme les petites blessures et arrête les hémorragies.",
        effect: "Rend 5 + 1d10 points de vie.",
        icon: "potion_1.jpg",
        price: 50,
    },
    {
        name: "Potion de soin léger",
        description:
            "Potion de soin léger, referme les petites blessures et arrête les hémorragies.",
        effect: "Rend 5 + 1d10 points de vie.",
        icon: "potion_1.jpg",
        price: 50,
    },
    {
        name: "Potion de soin léger",
        description:
            "Potion de soin léger, referme les petites blessures et arrête les hémorragies.",
        effect: "Rend 5 + 1d10 points de vie.",
        icon: "potion_1.jpg",
        price: 50,
    },
    {
        name: "Potion de soin léger",
        description:
            "Potion de soin léger, referme les petites blessures et arrête les hémorragies.",
        effect: "Rend 5 + 1d10 points de vie.",
        icon: "potion_1.jpg",
        price: 50,
    },
];

const items2 = [
    {
        name: "Lance",
        description: "Lance classique en bois. Embout en fer. Emoussée.",
        icon: "spear.png",
        price: 150,
    },
    {
        name: "Epée à deux mains",
        description:
            "Une belle épée à deux mains. La lame scintille à la lumière.",
        icon: "two_hand_sword.png",
        price: 250,
    },
];

const merchantList = [
    {
        name: "Alchimiste Debron",
        description: "Homme sénil",
        shop_description: "Vieux bâtiment",
        icon: "alchimist.jpg",
        items,
    },
    {
        name: "Forgeron Passim",
        description: "Cornu boursouflé",
        shop_description: "Forge en lein air",
        icon: "blacksmith.jpg",
        items: items2,
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
        musicStatus: 'PLAYING',
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

    toggleMusic = () => {
        this.setState(state => ({
            ...state,
            musicStatus: state.musicStatus === 'PLAYING' ? 'PAUSED' : 'PLAYING',
        }));
    };

    onChange = (name, value) => {
        const obj = {};
        obj[name] = value;
        this.setState(state => ({
            ...state,
            ...obj,
        }));
    };

    selectAnotherCharacter = () => {
        this.setState(state => ({
            ...state,
            characterId: 0,
            characterCreation: false,
        }));
    };

    buyItem = (item, price) => {
        const { currentStory, uid, character } = this.state;
        const newItemsTab = character.items;
        let hasAlready = false;
        character.items.map((i, index) => {
            if (i.name === item.name) {
                hasAlready = true;
                newItemsTab[index].quantity =
                    parseInt(newItemsTab[index].quantity, 10) + 1;
            }
        });
        if (!hasAlready) {
            item.quantity = 1;
            newItemsTab.push(item);
        }
        firebase
            .database()
            .ref(
                "stories/" + currentStory + "/characters/" + uid + "/character",
            )
            .set({
                ...character,
                gold: character.gold - price,
                items: newItemsTab,
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
            musicStatus,
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
                    (characterId > 0 || isGameMaster) && (
                        <div>
                            <Header
                                title="Header"
                                selectAnotherCharacter={
                                    this.selectAnotherCharacter
                                }
                                signOut={this.signOut}
                                accessChatHelp={this.accessChatHelp}
                                toggleMusic={this.toggleMusic}
                                chatHelpTitle={
                                    onChatHelp
                                        ? "Return to map"
                                        : "Access chat help"
                                }
                            />
                            {onChatHelp ? (
                                <ChatCommandsPanel />
                            ) : (
                                <div>
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
                                            character={character}
                                            isItemShowed={isItemShowed}
                                            itemsList={itemsList}
                                            isItemDescriptionShowed={
                                                isItemDescriptionShowed
                                            }
                                            itemToDescribe={itemToDescribe}
                                            isMerchantsShowed={
                                                isMerchantsShowed
                                            }
                                            merchantsList={merchantsList}
                                            buyItem={this.buyItem}
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
                                </div>
                            )}
                            <BottomPanel />
                        </div>
                    )}
                <Sound url="./Auberge.mp3" playStatus={musicStatus} autoLoad loop />
                {error}
            </div>
        );
    }
}

export default App;
