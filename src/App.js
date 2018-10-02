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
import LoadSpreasheet from "./LoadSpreasheet";

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
        index: 0,
        name: "Potion de soin léger",
        description:
            "Potion de soin léger, referme les petites blessures et arrête les hémorragies.",
        effect: "Rend 5 + 1d10 points de vie.",
        icon: "potion_1.jpg",
        quantity: 4,
        price: 50,
    },
];

const items2 = [
    {
        index: 0,
        name: "Lance",
        description: "Lance classique en bois. Embout en fer. Emoussée.",
        icon: "spear.png",
        quantity: 2,
        price: 150,
    },
    {
        index: 1,
        name: "Epée à deux mains",
        description:
            "Une belle épée à deux mains. La lame scintille à la lumière.",
        icon: "two_hand_sword.png",
        quantity: 1,
        price: 250,
    },
];

const merchantList = [5, 8, 12, 25, 34, 1, 2, 4, 6, 7, 9, 11, 15, 16, 18];

const questList = [
    {
        name: "Recherche d'ingrédients",
        icon: "notice_6.jpg",
        description:
            "Cherche des ingrédients de qualité rare. Venez me voir pour en savoir plus " +
            "(Demandez Gi Tan, 3 Baraque à gauche après le poste de garde)",
        position: 2,
        randomStyle: [2, 10],
        dangerosity: 0,
        monsterId: "0",
        reward: 800,
    },
    {
        name: "Extermination d'autochtone",
        icon: "notice_4.jpg",
        description:
            "Des autochtones attaquent les convois entre les bourgades de Imédétongs et de SotMouton." +
            " Les villageois ont du mal à se ravitailler et doivent faire un détour. " +
            "Nombreuses pertes économiques. " +
            "Les autochtones sont peu nombreux et n'ont spécialement de force d'attaque.",
        position: 5,
        randomStyle: [1, 7],
        dangerosity: 3,
        monsterId: "1",
        reward: 1550,
    },
];

const towns = [
    {
        name: "Hameau de mes fesses",
        positionX: 6,
        positionY: 6,
        icon: "big_town",
        merchants: merchantList,
        quests: questList,
    },
];

const ranges = {
    "1": {
        minValue: 30,
        maxValue: 80,
    },
    "2": {
        minValue: 60,
        maxValue: 150,
    },
    "3": {
        minValue: 100,
        maxValue: 300,
    },
    "4": {
        minValue: 150,
        maxValue: 400,
    },
    "5": {
        minValue: 225,
        maxValue: 550,
    },
    "6": {
        minValue: 325,
        maxValue: 775,
    },
    "7": {
        minValue: 500,
        maxValue: 1250,
    },
    "8": {
        minValue: 750,
        maxValue: 1800,
    },
    "9": {
        minValue: 1000,
        maxValue: 3000,
    },
    "10": {
        minValue: 1500,
        maxValue: 5000,
    },
};

const quantities = {
    consumables: 3,
    weapons: 3,
    artefacts: 1,
    runes: 0,
    enhancements: 2,
    stones: 2,
    spells: 4,
};

class App extends Component {
    state = {
        characterId: 0,
        character: {},
        characters: {},
        characterCreation: false,
        chatInput: "",
        chatHistory: [],
        currentStory: -1,
        currentMerchant: -1,
        currentQuest: {},
        errorMessage: "",
        email: "",
        gameMaster: "",
        isAuth: false,
        isItemShowed: false,
        itemsList: [],
        isItemDescriptionShowed: false,
        itemToDescribe: {},
        itemDescribed: 0,
        isTownShowed: false,
        isQuestShowed: false,
        isAdmin: false,
        isGameMaster: false,
        items: {},
        merchants: [],
        map: [],
        merchantsList: [],
        musicStatus: "PAUSED",
        musicName: "",
        musicMute: false,
        musicVolume: 100,
        noiseName: "",
        noiseStatus: "PAUSED",
        noiseMute: false,
        noiseVolume: 100,
        onChatHelp: false,
        password: "",
        pseudo: "",
        pseudoInput: "",
        questsList: [],
        uid: "",
        users: null,
        stories: [],
        storyCharacters: [],
        textureToApply: null,
        spreadSheet: {},
    };

    loadMerchantsAndItems = () => {
        const { currentStory } = this.state;
        firebase
            .database()
            .ref("stories/" + currentStory + "/merchants")
            .once("value")
            .then(snapshot => {
                this.setState(state => ({
                    ...state,
                    merchants: snapshot.val(),
                }));
                firebase
                    .database()
                    .ref("/items")
                    .once("value")
                    .then(snapshot => {
                        this.setState(
                            state => ({
                                ...state,
                                items: snapshot.val(),
                            }),
                            () => {
                                // this.generateStoryMerchants();
                                firebase
                                    .database()
                                    .ref(
                                        "/stories/" +
                                            currentStory +
                                            "/artefacts",
                                    )
                                    .once("value")
                                    .then(snapshot => {
                                        this.setState(
                                            state => ({
                                                ...state,
                                                items: {
                                                    ...state.items,
                                                    artefacts: snapshot.val(),
                                                },
                                            }),
                                            () => {
                                                // this.hydrateAllMerchants();
                                            },
                                        );
                                    })
                                    .catch(error => {
                                        // An error happened.
                                        this.triggerError(error);
                                    });
                            },
                        );
                    })
                    .catch(error => {
                        // An error happened.
                        this.triggerError(error);
                    });
            })
            .catch(error => {
                // An error happened.
                this.triggerError(error);
            });
    };

    hydrateStoryArtefacts = () => {
        const { currentStory } = this.state;
        firebase
            .database()
            // .ref('stories/0/artefacts')
            .ref("stories/" + currentStory + "/artefacts")
            .set(this.state.items.artefacts)
            .catch(error => {
                // Handle Errors here.
                this.props.triggerError(error);
            });
    };

    generateStoryMerchants = () => {
        const { currentStory } = this.state;

        firebase
            .database()
            .ref("merchants")
            .once("value")
            .then(snapshot => {
                const newMerchants = [];
                const artefactsLeft = [...this.state.items.artefacts];
                snapshot.val().map(m => {
                    newMerchants.push(
                        this.hydrateMerchant(artefactsLeft, m, true),
                    );
                });

                this.setState(state => ({
                    ...state,
                    merchants: newMerchants,
                    items: {
                        ...state.items,
                        artefacts: artefactsLeft,
                    },
                }));

                firebase
                    .database()
                    // .ref('stories/0/merchants')
                    .ref("stories/" + currentStory + "/merchants")
                    .set(newMerchants)
                    .then(() => {
                        this.hydrateStoryArtefacts();
                    })
                    .catch(error => {
                        // Handle Errors here.
                        this.props.triggerError(error);
                    });
            })
            .catch(error => {
                // Handle Errors here.
                this.props.triggerError(error);
            });
    };

    hydrateAllMerchants = (hard = false) => {
        const { merchants, currentStory } = this.state;
        const newMerchants = [];
        const artefactsLeft = [...this.state.items.artefacts];
        merchants.map(m => {
            newMerchants.push(this.hydrateMerchant(artefactsLeft, m, hard));
        });

        this.setState(state => ({
            ...state,
            merchants: newMerchants,
            items: {
                ...state.items,
                artefacts: artefactsLeft,
            },
        }));

        firebase
            .database()
            // .ref('stories/0/merchants')
            .ref("stories/" + currentStory + "/merchants")
            .set(newMerchants)
            .then(() => {
                this.hydrateStoryArtefacts();
            })
            .catch(error => {
                // Handle Errors here.
                this.props.triggerError(error);
            });
    };

    hydrateMerchant(artefactsLeft, merchant, totalHydrate = false) {
        if (totalHydrate) {
            merchant.items &&
                merchant.items.map(i => {
                    if (i.itemType === "artefacts") {
                        artefactsLeft.push(i);
                    }
                });
            merchant.items = [];
            const consumableList = this.getItemsFromCategory(
                "consumables",
                merchant,
            );
            const enhancementList = this.getItemsFromCategory(
                "enhancements",
                merchant,
            );
            const stoneList = this.getItemsFromCategory("stones", merchant);
            const runeList = this.getItemsFromCategory("runes", merchant);
            const weaponList = this.getItemsFromCategory("weapons", merchant);
            const spellList = this.getItemsFromCategory("spells", merchant);
            const artefactList = this.getArtefactsForMerchant(
                artefactsLeft,
                merchant,
            );

            merchant.items = consumableList
                .concat(enhancementList)
                .concat(stoneList)
                .concat(runeList)
                .concat(weaponList)
                .concat(spellList)
                .concat(artefactList);
        } else {
            const itemsStaying = [];
            merchant.items.map((i, index) => {
                if (i.rarity >= 7 || i.itemType === "artefacts") {
                    itemsStaying.push(i);
                }
            });

            const consumableList = this.getItemsFromCategory(
                "consumables",
                merchant,
                0,
            );
            const enhancementList = this.getItemsFromCategory(
                "enhancements",
                merchant,
                0,
            );
            const stoneList = this.getItemsFromCategory("stones", merchant, 0);
            const runeList = this.getItemsFromCategory("runes", merchant, 0);
            const weaponList = this.getItemsFromCategory(
                "weapons",
                merchant,
                0,
            );
            const spellList = this.getItemsFromCategory("spells", merchant, 0);

            merchant.items = consumableList
                .concat(enhancementList)
                .concat(stoneList)
                .concat(runeList)
                .concat(weaponList)
                .concat(spellList)
                .concat(itemsStaying);
        }
        return merchant;
    }
    getArtefactsForMerchant = (artefactsCurrentList, merchant) => {
        let itemList = [];
        let randomItem = 0;
        let itemsToGet = parseInt(merchant["artefacts"], 10);
        for (let i = 0; i < itemsToGet; i++) {
            randomItem = Math.floor(
                Math.random() * artefactsCurrentList.length,
            );
            if (!artefactsCurrentList[randomItem].isAcquired) {
                const newItem = { ...artefactsCurrentList[randomItem] };
                newItem.rarity = parseInt(newItem.rarity, 10);
                newItem.quantity = 1;
                newItem.itemType = "artefacts";
                const priceRange = ranges[newItem.rarity].maxValue * 0.2;

                newItem.price =
                    ranges[newItem.rarity].maxValue -
                    priceRange +
                    Math.ceil(Math.random() * priceRange + 1);
                itemList.push(newItem);
                artefactsCurrentList.splice(randomItem, 1);
            }
        }
        return itemList;
    };

    getItemsFromCategory = (list, merchant, itemsHL = 3) => {
        let itemsToGet = 0;
        let itemList = [];
        const itemsListLeft = [...this.state.items[list.toLowerCase()]];
        for (let i = 0; i < parseInt(merchant[list], 10); i++) {
            itemsToGet += Math.floor(Math.random() * 5 + 1);
        }
        if (parseInt(merchant[list] === 6) && itemsHL !== 0) {
            itemsToGet += 2;
            itemsHL += 1;
        }

        let randomItem = 0;
        while (itemsToGet > 0 && itemsListLeft.length > 0) {
            randomItem = Math.floor(Math.random() * itemsListLeft.length);
            if (
                parseInt(itemsListLeft[randomItem].rarity, 10) <=
                parseInt(merchant[list], 10) * 2
            ) {
                const newItem = { ...itemsListLeft[randomItem] };
                newItem.rarity = parseInt(newItem.rarity, 10);
                newItem.quantity =
                    Math.floor(Math.random() * quantities[list] + 1) *
                        (parseInt(merchant[list], 10) -
                            Math.ceil(newItem.rarity / 2)) +
                    1;
                newItem.itemType = list;

                const priceRange =
                    (ranges[newItem.rarity].maxValue -
                        ranges[newItem.rarity].minValue) /
                    6;

                newItem.price =
                    ranges[newItem.rarity].minValue +
                    parseInt(merchant[list], 10) *
                        Math.floor(Math.random() * priceRange + 1);

                if (list === "spells") {
                    const randomScroll = Math.floor(Math.random() * 10 + 1);
                    if (randomScroll === 1) {
                        newItem.name =
                            "Livre de sort (" +
                            newItem.type +
                            ") : " +
                            newItem.name;
                        newItem.image = "spell_book.png";
                        newItem.isBook = true;
                        newItem.price =
                            newItem.price * Math.floor(Math.random() * 3 + 2);
                    } else {
                        newItem.name =
                            "Parchemin (" +
                            newItem.type +
                            ") : " +
                            newItem.name;
                        newItem.isBook = false;
                    }
                }
                if (newItem.rarity >= 7) {
                    if (itemsHL > 0) {
                        itemList.push(newItem);
                        itemsToGet--;
                        itemsHL--;
                    }
                } else {
                    itemList.push(newItem);
                    itemsToGet--;
                }
            }
            itemsListLeft.splice(randomItem, 1);
        }
        return itemList;
    };

    toggleMusic = () => {
        this.setState(state => ({
            ...state,
            musicMute: !state.musicMute,
            noiseMute: !state.noiseMute,
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
        const {
            currentStory,
            currentMerchant,
            merchants,
            uid,
            character,
            itemsList,
            itemDescribed,
            items: { artefacts },
        } = this.state;
        const newItemsTab = [...character.items];
        let hasAlready = false;
        character.items.map((i, index) => {
            if (i.name === item.name) {
                hasAlready = true;
                newItemsTab[index].quantity =
                    parseInt(newItemsTab[index].quantity, 10) + 1;
            }
            return null;
        });
        if (!hasAlready) {
            newItemsTab.push({ ...item, quantity: 1 });
        }

        const newMerchantList = [...itemsList];
        let isQuantityLeft = false;
        if (newMerchantList[itemDescribed].quantity > 1) {
            newMerchantList[itemDescribed].quantity =
                newMerchantList[itemDescribed].quantity - 1;
            isQuantityLeft = true;
        } else {
            newMerchantList.splice(itemDescribed, 1);
        }

        const newMerchants = [...merchants];
        newMerchants[currentMerchant].items = newMerchantList;

        this.setState(
            state => ({
                ...state,
                itemToDescribe: isQuantityLeft
                    ? newMerchantList[itemDescribed]
                    : {},
                isItemDescriptionShowed: isQuantityLeft,
                itemsList: newMerchantList,
                merchants: newMerchants,
            }),
            () => {
                firebase
                    .database()
                    .ref(
                        "stories/" +
                            currentStory +
                            "/characters/" +
                            uid +
                            "/character",
                    )
                    .set({
                        ...character,
                        gold: character.gold - price,
                        items: newItemsTab,
                    })
                    .then(() => {
                        if (item.itemType === "artefacts") {
                            item.isAcquired = true;
                            artefacts.push(item);
                            this.hydrateStoryArtefacts();
                        }

                        firebase
                            .database()
                            .ref(
                                "stories/" +
                                    currentStory +
                                    "/merchants/" +
                                    currentMerchant,
                            )
                            .set(newMerchants[currentMerchant]);
                    })
                    .catch(error => {
                        // Handle Errors here.
                        this.triggerError(error);
                    });
            },
        );
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
                    currentQuest: {},
                    currentMerchant: -1,
                    errorMessage: "",
                    email: "",
                    gameMaster: "",
                    isAuth: false,
                    isItemShowed: false,
                    itemsList: [],
                    isItemDescriptionShowed: false,
                    itemToDescribe: {},
                    itemDescribed: 0,
                    isTownShowed: false,
                    isQuestShowed: false,
                    isAdmin: false,
                    isGameMaster: false,
                    map: [],
                    merchantsList: [],
                    musicStatus: "PAUSED",
                    musicName: "",
                    noiseName: "",
                    noiseStatus: "PAUSED",
                    onChatHelp: false,
                    password: "",
                    pseudo: "",
                    pseudoInput: "",
                    questsList: [],
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

    showTownList = town => {
        this.setState(state => ({
            ...state,
            isTownShowed: true,
            merchantsList: town.merchants,
            questsList: town.quests,
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
                                        town={town}
                                        showTownList={this.showTownList}
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
        const { stories, currentStory, textureToApply } = this.state;
        firebase
            .database()
            .ref("maps/" + stories[currentStory].map + "/" + x + "/" + y)
            .set(textureToApply)
            .catch(error => {
                // Handle Errors here.
                this.triggerError(error);
            });
    };

    createTable = () => {
        const { stories, currentStory } = this.state;
        firebase
            .database()
            .ref("/maps/" + stories[currentStory].map)
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

    loadMusic = () => {
        const { currentStory } = this.state;
        firebase
            .database()
            .ref("/stories/" + currentStory + "/music")
            .on("value", snapshot => {
                this.setState(state => ({
                    ...state,
                    ...snapshot.val(),
                }));
            });
        firebase
            .database()
            .ref("/stories/" + currentStory + "/noise")
            .on("value", snapshot => {
                this.setState(state => ({
                    ...state,
                    ...snapshot.val(),
                }));
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
                    this.setState(
                        state => ({
                            ...state,
                            character: snapshot.val(),
                            currentStory: i,
                            gameMaster: stories[i].gameMaster,
                            // isGameMaster: isGM,
                            characterId: stories[i].characters[uid].characterId,
                        }),
                        () => {
                            this.createTable();
                            this.createChat();
                            this.loadMusic();
                            this.loadMerchantsAndItems();
                        },
                    );
                });
        } else {
            //@TODO : Activate when GM will have proper tabs
            this.setState(
                state => ({
                    ...state,
                    currentStory: i,
                    gameMaster: stories[i].gameMaster,
                    // isGameMaster: isGM,
                }),
                () => {
                    this.createTable();
                    this.createChat();
                    this.loadMusic();
                },
            );
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
            isTownShowed,
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
            currentQuest,
            isQuestShowed,
            questsList,
            musicName,
            musicMute,
            musicVolume,
            noiseName,
            noiseStatus,
            noiseMute,
            noiseVolume,
            merchants,
            currentMerchant,
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
                            pseudo={pseudo}
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
                                title={stories[currentStory].name}
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
                                musicMute={musicMute}
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
                                            isQuestShowed={isQuestShowed}
                                            currentQuest={currentQuest}
                                            character={character}
                                            isItemShowed={isItemShowed}
                                            itemsList={itemsList}
                                            merchants={merchants}
                                            currentMerchant={currentMerchant}
                                            isItemDescriptionShowed={
                                                isItemDescriptionShowed
                                            }
                                            itemToDescribe={itemToDescribe}
                                            isTownShowed={isTownShowed}
                                            merchantsList={merchantsList}
                                            questsList={questsList}
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
                <Sound
                    url={`./music/${musicName}.mp3`}
                    playStatus={musicStatus}
                    volume={musicMute ? 0 : musicVolume}
                    autoLoad
                    loop
                />
                <Sound
                    url={`./noise/${noiseName}.mp3`}
                    playStatus={noiseStatus}
                    volume={noiseMute ? 0 : noiseVolume}
                    autoLoad
                />
                {error}
            </div>
        );
    }
}

export default App;
