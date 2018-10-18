import React, { Component } from "react";
import firebase from "firebase";
import debounce from "lodash/debounce";
import "./App.css";
import IsNotAuth from "./Authentication/IsNotAuth";
import HasNoNickname from "./NicknameSelection/HasNoNickname";
import CharacterSelection from "./CharacterSelection/CharacterSelection";
import StoriesPanel from "./StoryPanel/StoriesPanel";

import { defaultState } from "./Utils/Constants";
import LoadSpreasheet from "./Utils/LoadSpreasheet";
import GameScreen from "./GameScreen";
import SoundPlayer from "./SoundPlayer/SoundPlayer";
import {
  hydrateStoryArtefacts,
  listenArtefacts,
  listenMerchants,
  loadAllItems,
  loadTilesTypes,
  populateTilesTypes,
  resetEvents,
  resetMap,
  resetStoryMerchants,
} from "./DatabaseFunctions";

class App extends Component {
  state = { ...defaultState };

  componentDidMount() {
    loadTilesTypes(this.doSetState);
    // populateTilesTypes();
    // resetMap(0,40);
    // resetEvents(0);
  }

  loadMerchantsAndItems = () => {
    const { currentStory } = this.state;
    listenMerchants(currentStory, this.doSetState);
    loadAllItems(currentStory, this.doSetState); // And listen to artefacts on callback
    // resetStoryMerchants(currentStory, this.doSetState);
    // this.hydrateAllMerchants(currentStoryn merchants, items, doSetState, false);
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
      oldCharacterId: state.characterId,
      oldCharacterCreation: state.characterCreation,
      characterId: 0,
      characterCreation: false,
    }));
  };

  keepCharacter = () => {
    this.setState(state => ({
      ...state,
      characterId: state.oldCharacterId,
      characterCreation: state.oldCharacterCreation,
      oldCharacterId: 0,
      oldCharacterCreation: false,
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
    const newItemsTab = character.items ? [...character.items] : [];
    let hasAlready = false;
    if (character.items) {
      character.items.map((i, index) => {
        if (i.name === item.name) {
          hasAlready = true;
          newItemsTab[index].quantity =
            parseInt(newItemsTab[index].quantity, 10) + 1;
        }
        return null;
      });
    }
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
        itemToDescribe: isQuantityLeft ? newMerchantList[itemDescribed] : {},
        isItemDescriptionShowed: isQuantityLeft,
        itemsList: newMerchantList,
        merchants: newMerchants,
      }),
      () => {
        firebase
          .database()
          .ref("stories/" + currentStory + "/characters/" + uid + "/character")
          .set({
            ...character,
            gold: character.gold - price,
            items: newItemsTab,
          })
          .then(() => {
            if (item.itemType === "artefacts") {
              item.isAcquired = true;

              // Hydrate artefacts list
              const newArtefactsList = [...artefacts];
              newArtefactsList.push(item);
              artefacts.push(item);
              hydrateStoryArtefacts(currentStory, newArtefactsList);
            }

            firebase
              .database()
              .ref("stories/" + currentStory + "/merchants/" + currentMerchant)
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
        this.setState(state => ({ ...defaultState }));

        firebase
          .database()
          .ref("/tilesTypes")
          .once("value")
          .then(snapshot => {
            this.setState(state => ({
              ...state,
              tilesTypes: snapshot.val(),
            }));
          })
          .catch(error => {
            this.triggerError(error);
          });

        firebase
          .database()
          .ref()
          .off();
      })
      .catch(error => {
        // An error happened.
        this.triggerError(error);
      });
  };

  togglePlayerView = () => {
    this.setState(state => ({
      ...state,
      isOnPlayerView: !state.isOnPlayerView,
    }));
  };

  createTable = () => {
    const { stories, currentStory } = this.state;
    firebase
      .database()
      .ref("/maps/" + stories[currentStory].map)
      .on("value", snapshot => {
        this.setState(state => ({
          ...state,
          map: snapshot.val(),
        }));
      });
  };

  loadTownsAndQuests = () => {
    const { currentStory } = this.state;
    firebase
      .database()
      .ref("/stories/" + currentStory + "/towns")
      .on("value", snapshot => {
        this.setState(state => ({
          ...state,
          towns: snapshot.val(),
        }));
      });
    firebase
      .database()
      .ref("/stories/" + currentStory + "/quests")
      .on("value", snapshot => {
        this.setState(state => ({
          ...state,
          quests: snapshot.val(),
        }));
      });
  };

  loadCurrentPosition = () => {
    const { currentStory } = this.state;
    firebase
      .database()
      .ref("/stories/" + currentStory + "/currentX")
      .once("value")
      .then(snapshot => {
        this.setState(state => ({
          ...state,
          currentX: snapshot.val(),
          currentZoom: 10,
        }));
      })
      .catch(error => {
        // An error happened.
        this.triggerError(error);
      });
    firebase
      .database()
      .ref("/stories/" + currentStory + "/currentY")
      .once("value")
      .then(snapshot => {
        this.setState(state => ({
          ...state,
          currentY: snapshot.val(),
          currentZoom: 10,
        }));
      })
      .catch(error => {
        // An error happened.
        this.triggerError(error);
      });
  };

  loadEvents = () => {
    const { currentStory } = this.state;
    firebase
      .database()
      .ref("/stories/" + currentStory + "/currentEvent")
      .on("value", snapshot => {
        this.setState(state => ({
          ...state,
          currentEvent: snapshot.val(),
        }));
      });
    firebase
      .database()
      .ref("/stories/" + currentStory + "/events")
      .on("value", snapshot => {
        this.setState(state => ({
          ...state,
          eventHistory: snapshot.val(),
        }));
      });
  };

  loadUsers = () => {
    firebase
      .database()
      .ref("/users")
      .on("value", snapshot => {
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

  stopNoise = () => {
    const { currentStory } = this.state;
    this.setState(
      state => ({
        ...state,
        noiseStatus: "STOPPPED",
      }),
      () => {
        firebase
          .database()
          .ref("/stories/" + currentStory + "/noise")
          .set({
            noiseStatus: this.state.noiseStatus,
          })
          .catch(error => {
            this.triggerError(error);
          });
      },
    );
  };

  resetSounds = () => {
    const { currentStory } = this.state;
    firebase
      .database()
      .ref("/stories/" + currentStory + "/music")
      .set({
        musicVolume: 100,
        musicNameFirst: "",
        musicVolumeFirst: 0,
        musicNameSecond: "",
        musicVolumeSecond: 0,
        musicStatusFirst: "STOPPED",
        musicStatusSecond: "STOPPED",
      })
      .catch(error => {
        this.triggerError(error);
      });
    firebase
      .database()
      .ref("/stories/" + currentStory + "/noise")
      .set({
        noiseName: "",
        noiseVolume: 100,
        noiseStatus: "STOPPED",
      })
      .catch(error => {
        this.triggerError(error);
      });
  };

  onChangeMusics = (name, value) => {
    const { isMusicFirst, isMusicTransition, currentStory } = this.state;
    const obj = {};
    obj[name] = value;
    if (name === "musicName") {
      if (!isMusicTransition) {
        if (isMusicFirst) {
          this.setState(
            state => ({
              ...state,
              musicNameSecond: value,
              isMusicTransition: true,
              isMusicFirst: false,
            }),
            () => {
              for (let i = 1; i < 21; i++) {
                setTimeout(() => {
                  this.setState(
                    state => ({
                      ...state,
                      musicVolumeFirst:
                        state.musicVolume * ((100 - i * 5) / 100),
                      musicVolumeSecond: state.musicVolume * ((i * 5) / 100),
                      isMusicTransition: i !== 20,
                      musicStatusFirst:
                        i !== 20 && state.musicNameFirst !== ""
                          ? "PLAYING"
                          : "STOPPED",
                      musicStatusSecond: "PLAYING",
                    }),
                    () => {
                      firebase
                        .database()
                        .ref("/stories/" + currentStory + "/music")
                        .set({
                          musicVolume: this.state.musicVolume,
                          musicNameFirst: this.state.musicNameFirst,
                          musicVolumeFirst: this.state.musicVolumeFirst,
                          musicNameSecond: this.state.musicNameSecond,
                          musicVolumeSecond: this.state.musicVolumeSecond,
                          musicStatusFirst: this.state.musicStatusFirst,
                          musicStatusSecond: this.state.musicStatusSecond,
                        })
                        .catch(error => {
                          this.triggerError(error);
                        });
                    },
                  );
                }, i * 300);
              }
            },
          );
        } else {
          this.setState(
            state => ({
              ...state,
              musicNameFirst: value,
              isMusicTransition: true,
              isMusicFirst: true,
            }),
            () => {
              for (let i = 1; i < 21; i++) {
                setTimeout(() => {
                  this.setState(
                    state => ({
                      ...state,
                      musicVolumeSecond:
                        (state.musicVolume * (100 - i * 5)) / 100,
                      musicVolumeFirst: state.musicVolume * ((i * 5) / 100),
                      isMusicTransition: i !== 20,
                      musicStatusSecond:
                        i !== 20 && state.musicNameSecond !== ""
                          ? "PLAYING"
                          : "STOPPED",
                      musicStatusFirst: "PLAYING",
                    }),
                    () => {
                      firebase
                        .database()
                        .ref("/stories/" + currentStory + "/music")
                        .set({
                          musicVolume: this.state.musicVolume,
                          musicNameFirst: this.state.musicNameFirst,
                          musicVolumeFirst: this.state.musicVolumeFirst,
                          musicNameSecond: this.state.musicNameSecond,
                          musicVolumeSecond: this.state.musicVolumeSecond,
                          musicStatusFirst: this.state.musicStatusFirst,
                          musicStatusSecond: this.state.musicStatusSecond,
                        })
                        .catch(error => {
                          this.triggerError(error);
                        });
                    },
                  );
                }, i * 300);
              }
            },
          );
        }
      }
    } else {
      this.setState(
        state => ({
          ...state,
          ...obj,
        }),
        () => {
          this.debouncedSavingMusic();
        },
      );
    }
  };

  debouncedSavingMusic = debounce(() => this.saveMusic(), 300, {
    leading: true,
    maxWait: 2000,
  });

  saveMusic = () => {
    const {
      currentStory,
      noiseStatus,
      noiseName,
      noiseVolume,
      musicVolume,
      musicNameFirst,
      isMusicFirst,
      musicNameSecond,
      musicStatusFirst,
      musicStatusSecond,
    } = this.state;
    firebase
      .database()
      .ref("/stories/" + currentStory + "/noise")
      .set({
        noiseStatus,
        noiseName,
        noiseVolume,
      })
      .catch(error => {
        this.triggerError(error);
      });
    firebase
      .database()
      .ref("/stories/" + currentStory + "/music")
      .set({
        musicVolume,
        musicNameFirst,
        musicVolumeFirst: isMusicFirst ? musicVolume : 0,
        musicNameSecond,
        musicVolumeSecond: isMusicFirst ? 0 : musicVolume,
        musicStatusFirst,
        musicStatusSecond,
      })
      .catch(error => {
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
              this.loadTownsAndQuests();
              this.loadCurrentPosition();
              this.loadEvents();
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
          isGameMaster: isGM,
        }),
        () => {
          this.createTable();
          this.createChat();
          this.loadMusic();
          this.loadMerchantsAndItems();
          this.loadEvents();
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
            charactersFromStories.push(snapshot.val()[key].character);
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
      currentQuest,
      isQuestShowed,
      questsList,
      musicMute,
      musicVolume,
      noiseName,
      noiseStatus,
      noiseMute,
      noiseVolume,
      merchants,
      currentMerchant,
      isMusicFirst,
      musicVolumeFirst,
      musicStatusFirst,
      musicNameFirst,
      musicVolumeSecond,
      musicNameSecond,
      musicStatusSecond,
      isOnPlayerView,
      currentTown,
      towns,
      quests,
      tilesTypes,
      currentScale,
      currentX,
      currentY,
      currentZoom,
      currentTile,
      currentEvent,
      eventHistory,
      items,
      isEventHidden,
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
            <HasNoNickname
              pseudoInput={pseudoInput}
              onChange={this.onChange}
              doSetState={this.doSetState}
              triggerError={this.triggerError}
            />
          )}

        {isAuth &&
          pseudo !== "" &&
          currentStory === -1 && (
            <StoriesPanel stories={stories} chooseStory={this.chooseStory} />
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
              keepCharacter={this.keepCharacter}
            />
          )}

        {isAuth &&
          pseudo !== "" &&
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
              musicName={isMusicFirst ? musicNameFirst : musicNameSecond}
              noiseName={noiseName}
              isOnPlayerView={isOnPlayerView}
              generateTable={this.generateTable}
              onChangeMusics={this.onChangeMusics}
              resetSounds={this.resetSounds}
              doSetState={this.doSetState}
              triggerError={this.triggerError}
              buyItem={this.buyItem}
              onChange={this.onChange}
              toggleMusic={this.toggleMusic}
              accessChatHelp={this.accessChatHelp}
              signOut={this.signOut}
              selectAnotherCharacter={this.selectAnotherCharacter}
              togglePlayerView={this.togglePlayerView}
              currentTown={currentTown}
              towns={towns}
              quests={quests}
              tilesTypes={tilesTypes}
              currentScale={currentScale}
              currentX={currentX}
              currentY={currentY}
              currentZoom={currentZoom}
              loadCurrentPosition={this.loadCurrentPosition}
              currentTile={currentTile}
              eventHistory={eventHistory}
              currentEvent={currentEvent}
              items={items}
            />
          )}
        <SoundPlayer
          musicMute={musicMute}
          musicVolumeFirst={musicVolumeFirst}
          musicStatusFirst={musicStatusFirst}
          musicNameFirst={musicNameFirst}
          musicVolumeSecond={musicVolumeSecond}
          musicNameSecond={musicNameSecond}
          musicStatusSecond={musicStatusSecond}
          noiseMute={noiseMute}
          noiseName={noiseName}
          noiseStatus={noiseStatus}
          noiseVolume={noiseVolume}
        />
        {error}
      </div>
    );
  }
}

export default App;
