import React, { Component } from 'react';
import firebase from 'firebase';
import Sound from 'react-sound';
import './App.css';
import Town from './Town';
import IsNotAuth from './IsNotAuth';
import HasNoPseudo from './HasNoPseudo';
import CharacterSelection from './CharacterSelection';
import StoriesList from './StoriesList';

import { priceRanges, itemQuantities, defaultState } from './Constants';
import LoadSpreasheet from './LoadSpreasheet';
import GameScreen from './GameScreen';

class App extends Component {
    state = { ...defaultState };

    loadMerchantsAndItems = () => {
        const { currentStory } = this.state;
        firebase
            .database()
            .ref('stories/' + currentStory + '/merchants')
            .once('value')
            .then(snapshot => {
                this.setState(state => ({
                    ...state,
                    merchants: snapshot.val(),
                }));
                firebase
                    .database()
                    .ref('/items')
                    .once('value')
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
                                        '/stories/' +
                                            currentStory +
                                            '/artefacts'
                                    )
                                    .once('value')
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
                                            }
                                        );
                                    })
                                    .catch(error => {
                                        // An error happened.
                                        this.triggerError(error);
                                    });
                            }
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
        const { currentStory, items } = this.state;
        firebase
            .database()
            // .ref('stories/0/artefacts')
            .ref('stories/' + currentStory + '/artefacts')
            .set(items.artefacts)
            .catch(error => {
                // Handle Errors here.
                this.triggerError(error);
            });
    };

    generateStoryMerchants = () => {
        const { currentStory, items } = this.state;

        firebase
            .database()
            .ref('merchants')
            .once('value')
            .then(snapshot => {
                const newMerchants = [];
                const artefactsLeft = [...items.artefacts];
                snapshot.val().map(m => {
                    newMerchants.push(
                        this.hydrateMerchant(artefactsLeft, m, true)
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
                    .ref('stories/' + currentStory + '/merchants')
                    .set(newMerchants)
                    .then(() => {
                        this.hydrateStoryArtefacts();
                    })
                    .catch(error => {
                        // Handle Errors here.
                        this.triggerError(error);
                    });
            })
            .catch(error => {
                // Handle Errors here.
                this.triggerError(error);
            });
    };

    hydrateAllMerchants = (hard = false) => {
        const { merchants, currentStory, items } = this.state;
        const newMerchants = [];
        const artefactsLeft = [...items.artefacts];
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
            .ref('stories/' + currentStory + '/merchants')
            .set(newMerchants)
            .then(() => {
                this.hydrateStoryArtefacts();
            })
            .catch(error => {
                // Handle Errors here.
                this.triggerError(error);
            });
    };

    hydrateMerchant(artefactsLeft, merchant, totalHydrate = false) {
        if (totalHydrate) {
            merchant.items &&
                merchant.items.map(i => {
                    if (i.itemType === 'artefacts') {
                        artefactsLeft.push(i);
                    }
                });
            merchant.items = [];
            const consumableList = this.getItemsFromCategory(
                'consumables',
                merchant
            );
            const enhancementList = this.getItemsFromCategory(
                'enhancements',
                merchant
            );
            const stoneList = this.getItemsFromCategory('stones', merchant);
            const runeList = this.getItemsFromCategory('runes', merchant);
            const weaponList = this.getItemsFromCategory('weapons', merchant);
            const spellList = this.getItemsFromCategory('spells', merchant);
            const artefactList = this.getArtefactsForMerchant(
                artefactsLeft,
                merchant
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
                if (i.rarity >= 7 || i.itemType === 'artefacts') {
                    itemsStaying.push(i);
                }
            });

            const consumableList = this.getItemsFromCategory(
                'consumables',
                merchant,
                0
            );
            const enhancementList = this.getItemsFromCategory(
                'enhancements',
                merchant,
                0
            );
            const stoneList = this.getItemsFromCategory('stones', merchant, 0);
            const runeList = this.getItemsFromCategory('runes', merchant, 0);
            const weaponList = this.getItemsFromCategory(
                'weapons',
                merchant,
                0
            );
            const spellList = this.getItemsFromCategory('spells', merchant, 0);

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
        let itemsToGet = parseInt(merchant['artefacts'], 10);
        for (let i = 0; i < itemsToGet; i++) {
            randomItem = Math.floor(
                Math.random() * artefactsCurrentList.length
            );
            if (!artefactsCurrentList[randomItem].isAcquired) {
                const newItem = { ...artefactsCurrentList[randomItem] };
                newItem.rarity = parseInt(newItem.rarity, 10);
                newItem.quantity = 1;
                newItem.itemType = 'artefacts';
                const priceRange = priceRanges[newItem.rarity].maxValue * 0.2;

                newItem.price =
                    priceRanges[newItem.rarity].maxValue -
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
                    Math.floor(Math.random() * itemQuantities[list] + 1) *
                        (parseInt(merchant[list], 10) -
                            Math.ceil(newItem.rarity / 2)) +
                    1;
                newItem.itemType = list;

                const priceRange =
                    (priceRanges[newItem.rarity].maxValue -
                        priceRanges[newItem.rarity].minValue) /
                    6;

                newItem.price =
                    priceRanges[newItem.rarity].minValue +
                    parseInt(merchant[list], 10) *
                        Math.floor(Math.random() * priceRange + 1);

                if (list === 'spells') {
                    const randomScroll = Math.floor(Math.random() * 10 + 1);
                    if (randomScroll === 1) {
                        newItem.name =
                            'Livre de sort (' +
                            newItem.type +
                            ') : ' +
                            newItem.name;
                        newItem.image = 'spell_book.png';
                        newItem.isBook = true;
                        newItem.price =
                            newItem.price * Math.floor(Math.random() * 3 + 2);
                    } else {
                        newItem.name =
                            'Parchemin (' +
                            newItem.type +
                            ') : ' +
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
                        'stories/' +
                            currentStory +
                            '/characters/' +
                            uid +
                            '/character'
                    )
                    .set({
                        ...character,
                        gold: character.gold - price,
                        items: newItemsTab,
                    })
                    .then(() => {
                        if (item.itemType === 'artefacts') {
                            item.isAcquired = true;
                            artefacts.push(item);
                            this.hydrateStoryArtefacts();
                        }

                        firebase
                            .database()
                            .ref(
                                'stories/' +
                                    currentStory +
                                    '/merchants/' +
                                    currentMerchant
                            )
                            .set(newMerchants[currentMerchant]);
                    })
                    .catch(error => {
                        // Handle Errors here.
                        this.triggerError(error);
                    });
            }
        );
    };

    signOut = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                // Sign-out successful.
                this.setState(state => ({ ...defaultState }));
            })
            .catch(error => {
                // An error happened.
                this.triggerError(error);
            });
    };

    createTable = () => {
        const { stories, currentStory } = this.state;
        firebase
            .database()
            .ref('/maps/' + stories[currentStory].map)
            .on('value', snapshot => {
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
            .once('value')
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
            .ref('/stories/' + currentStory + '/music')
            .on('value', snapshot => {
                this.setState(state => ({
                    ...state,
                    ...snapshot.val(),
                }));
            });
        firebase
            .database()
            .ref('/stories/' + currentStory + '/noise')
            .on('value', snapshot => {
                this.setState(state => ({
                    ...state,
                    ...snapshot.val(),
                }));
            });
    };

    stopNoise = () => {
        const { currentStory } = this.state;
        this.setState(
            state => ({
                ...state,
                noiseStatus: 'STOPPPED',
            }),
            () => {
                firebase
                    .database()
                    .ref('/stories/' + currentStory + '/noise')
                    .set({
                        noiseStatus: this.state.noiseStatus,
                    })
                    .catch(error => {
                        this.triggerError(error);
                    });
            }
        );
    };

    onChangeMusics = (name, value) => {
        const { currentStory } = this.state;
        const obj = {};
        obj[name] = value;
        this.setState(
            state => ({
                ...state,
                ...obj,
            }),
            () => {
                firebase
                    .database()
                    .ref('/stories/' + currentStory + '/noise')
                    .set({
                        noiseStatus: this.state.noiseStatus,
                        noiseName: this.state.noiseName,
                        noiseVolume: this.state.noiseVolume,
                    })
                    .catch(error => {
                        this.triggerError(error);
                    });
                firebase
                    .database()
                    .ref('/stories/' + currentStory + '/music')
                    .set({
                        musicName: this.state.musicName,
                        musicStatus: this.state.musicStatus,
                        musicVolume: this.state.musicVolume,
                    })
                    .catch(error => {
                        this.triggerError(error);
                    });
            }
        );
    };

    chooseStory = i => {
        const { stories, uid } = this.state;
        let isGM = false;

        if (stories[i].gameMaster === uid) isGM = true;

        if (
            typeof stories[i].characters !== 'undefined' &&
            typeof stories[i].characters[uid] !== 'undefined'
        ) {
            firebase
                .database()
                .ref('/stories/' + i + '/characters/' + uid + '/character')
                .on('value', snapshot => {
                    //@TODO : Activate when GM will have proper tabs
                    this.setState(
                        state => ({
                            ...state,
                            character: snapshot.val(),
                            currentStory: i,
                            gameMaster: stories[i].gameMaster,
                            isGameMaster: isGM,
                            characterId: stories[i].characters[uid].characterId,
                        }),
                        () => {
                            this.createTable();
                            this.createChat();
                            this.loadMusic();
                            this.loadMerchantsAndItems();
                        }
                    );
                });
        } else {
            //@TODO : Activate when GM will have proper tabs
            this.setState(
                state => ({
                    ...state,
                    currentStory: i,
                    gameMaster: stories[i].gameMaster,
                    isGameMaster: isGM,
                }),
                () => {
                    this.createTable();
                    this.createChat();
                    this.loadMusic();
                    this.loadMerchantsAndItems();
                }
            );
        }
        firebase
            .database()
            .ref('/stories/' + i + '/characters')
            .on('value', snapshot => {
                const charactersFromStories = [];
                if (typeof snapshot.val() !== 'undefined' && snapshot.val()) {
                    Object.keys(snapshot.val()).map(key => {
                        charactersFromStories.push(
                            snapshot.val()[key].character
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
            isTownShowed,
            merchantsList,
            isAuth,
            email,
            password,
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
                        <StoriesList
                            stories={stories}
                            chooseStory={this.chooseStory}
                        />
                    )}

                {!isGameMaster &&
                    isAuth &&
                    pseudo !== '' &&
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
                    pseudo !== '' &&
                    currentStory > -1 &&
                    (characterId > 0 || isGameMaster) && (
                        <GameScreen
                            musicMute={musicMute}
                            onChatHelp={onChatHelp}
                            stories={stories}
                            isItemShowed={isItemShowed}
                            itemsList={itemsList}
                            isItemDescriptionShowed={isItemDescriptionShowed}
                            itemToDescribe={itemToDescribe}
                            isTownShowed={isTownShowed}
                            merchantsList={merchantsList}
                            pseudo={pseudo}
                            character={character}
                            map={map}
                            chatInput={chatInput}
                            chatHistory={chatHistory}
                            textureToApply={textureToApply}
                            users={users}
                            uid={uid}
                            isGameMaster={isGameMaster}
                            currentStory={currentStory}
                            storyCharacters={storyCharacters}
                            gameMaster={gameMaster}
                            currentQuest={currentQuest}
                            isQuestShowed={isQuestShowed}
                            questsList={questsList}
                            musicVolume={musicVolume}
                            noiseVolume={noiseVolume}
                            merchants={merchants}
                            currentMerchant={currentMerchant}
                            generateTable={this.generateTable}
                            onChangeMusics={this.onChangeMusics}
                            doSetState={this.doSetState}
                            triggerError={this.triggerError}
                            buyItem={this.buyItem}
                            onChange={this.onChange}
                            toggleMusic={this.toggleMusic}
                            accessChatHelp={this.accessChatHelp}
                            signOut={this.signOut}
                            selectAnotherCharacter={this.selectAnotherCharacter}
                        />
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
                    onFinishedPlaying={this.stopNoise}
                    autoLoad
                />
                {error}
            </div>
        );
    }
}

export default App;
