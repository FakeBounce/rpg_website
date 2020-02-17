import React, { Component } from "react";
import firebase from "firebase";
import debounce from "lodash/debounce";
import { connect } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { ToastProvider } from "./contexts/toastContext";
import IsNotAuth from "./components/Authentication/IsNotAuth";
import HasNoNickname from "./components/NicknameSelection/HasNoNickname";
import CharacterSelection from "./components/CharacterSelection/CharacterSelection";
import StoriesPanel from "./components/StoryPanel/StoriesPanel";

import { defaultState, quests, bestiary } from "./components/Utils/Constants";
import GameScreen from "./GameScreen";
import SoundPlayer from "./components/SoundPlayer/SoundPlayer";
import {
  // listenArtefacts,
  // loadUnusedArtefacts,
  // listenCurrentEvent,
  listenEvents,
  listenMerchants,
  listenMusic,
  listenNoise,
  listenSong,
  listenQuests,
  listenTowns,
  loadAllItems,
  // loadCurrentPosition,
  // loadMerchantsOnce,
  loadTilesTypes,
  // populateTilesTypes,
  // resetEvents,
  // resetMap,
  // setQuests,
  populateBestiary,
  // loadChat,
} from "./components/Utils/DatabaseFunctions";
import {
  hydrateStoryArtefacts,
  // resetStoryMerchants,
  hydrateAllMerchants,
  // hydrateMerchant,
} from "./components/Utils/MerchantsFunctions";
import { toggleMusic, updateAllMusic } from "./redux/actions/actionsSounds";
import PropTypes from "prop-types";
import {
  setGameMaster,
  togglePlayerMastering,
  togglePlayerView,
  updateCurrentStory,
} from "./redux/actions/actionsAppState";
import {
  CALL_LOAD_MUSIC,
  CALL_LOAD_NOISE,
  CALL_LOAD_SONG,
} from "./redux/actionsTypes/actionsTypesSounds";
import { setCharacter } from "./redux/actions/actionsCharacter";
import {
  CALL_LISTEN_CURRENT_EVENT,
  CALL_LISTEN_EVENTS_HISTORY,
} from "./redux/actionsTypes/actionsTypesEvents";
import {
  CALL_PRINT_ERROR,
  CALL_SIGN_OUT,
} from "./redux/actionsTypes/actionsTypesAppState";
import { CALL_LISTEN_CHAT_HISTORY } from "./redux/actionsTypes/actionsTypesChat";
import ErrorPrinter from "./ErrorPrinter";
import {
  CALL_GET_TILES_TYPES,
  CALL_LISTEN_CURRENT_X,
  CALL_LISTEN_CURRENT_Y,
  CALL_LISTEN_MAP_TILES,
  CALL_SET_TILES_TYPES,
} from "./redux/actionsTypes/actionsTypesMapInfos";
import { CALL_LISTEN_MERCHANT_LIST } from "./redux/actionsTypes/actionsTypesMerchants";

class App extends Component {
  constructor(props) {
    super(props);

    // const localStorageInfos = localStorage.getItem("appState")
    //   ? JSON.parse(localStorage.getItem("appState"))
    //   : null;
    this.state = { ...defaultState };
    // this.state = localStorageInfos ? localStorageInfos : { ...defaultState };

    // if (localStorageInfos) {
    //   this.loadUsers();
    //   this.loadStories();
    //
    //   firebase
    //     .auth()
    //     .signInWithEmailAndPassword(
    //       localStorageInfos.email,
    //       localStorageInfos.password,
    //     )
    //     .catch(error => {
    //       // Handle Errors here.
    //       dispatchCallPrintError(error);
    //     });
    // }
  }

  componentDidMount() {
    const { dispatchCallSetTilesTypes } = this.props;
    dispatchCallSetTilesTypes();
    // loadTilesTypes(this.doSetState);
    loadAllItems(this.doSetState);

    // setQuests(0, quests);
    // loadUnusedArtefacts(0);
    // populateTilesTypes();
    // resetMap(0,40);
    // resetEvents(0);
    // populateBestiary(0, this.doSetState);

    // firebase
    //   .database()
    //   .ref('stories/' + 0 + '/bestiary')
    //   .once('value').then(snapshot => {
    //   this.setState(state => ({
    //     ...state,
    //     bestiary: snapshot.val(),
    //   }), () => {
    //     const newMonster = {
    //       name: "Ulseh Dahken",
    //       image: "enchantress.jpg",
    //       text1:"",
    //       text2:"",
    //       text3:"",
    //       text4:"",
    //       age: "???",
    //       taille: "178",
    //       poids: "66",
    //       known: false,
    //       monster: false,
    //     };
    //
    //       const newPostKey = firebase
    //         .database()
    //         .ref('/stories/' + 0 + '/bestiary/')
    //         .push().key;
    //
    //     firebase
    //       .database()
    //       .ref("stories/" + 0 + "/bestiary/"+newPostKey)
    //       .set(newMonster)
    //       .catch(error => {
    //         // Handle Errors here.
    //         dispatchCallPrintError(error);
    //       });
    //   });
    // });

    // firebase
    //   .database()
    //   .ref("stories/" + 0 + "/bestiary")
    //   .on("value", snapshot => {
    //     this.setState(state => ({
    //       ...state,
    //       bestiary: snapshot.val(),
    //     }));

    // const test = {};
    // snapshot.val().map(b => {
    //   const newPostKey = firebase
    //     .database()
    //     .ref('/stories/' + 0 + '/bestiary/')
    //     .push().key;
    //   test[newPostKey] = { ...b };
    // });
    //
    // firebase
    //   .database()
    //   .ref('stories/' + 0 + '/bestiary')
    //   .set(test)
    //   .catch(error => {
    //     // Handle Errors here.
    //     dispatchCallPrintError(error);
    //   });
    // });
  }

  loadMerchantsAndItems = () => {
    const { currentStory, dispatchCallListenMerchantList } = this.props;
    // loadMerchantsOnce(currentStory, this.doSetState)
    dispatchCallListenMerchantList();
    loadAllItems(this.doSetState, currentStory, () => {
      // hydrateAllMerchants(
      //   this.state.currentStory,
      //   this.state.merchants,
      //   this.state.items,
      //   this.doSetState,
      //   true
      // );
    }); // And listen to artefacts on callback
    // resetStoryMerchants(currentStory, this.doSetState);
  };

  hydrateMerchants = () => {
    const { currentStory, merchants } = this.props;
    hydrateAllMerchants(
      currentStory,
      merchants,
      this.state.items,
      this.doSetState,
      true,
    );
  };

  toggleMusic = () => this.props.dispatchToggleMusic();

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
      currentMerchant,
      itemsList,
      itemDescribed,
      items: { artefacts },
    } = this.state;
    const {
      currentStory,
      character,
      uid,
      merchants,
      dispatchCallPrintError,
    } = this.props;
    const newWeaponsTab = character.weapons ? [...character.weapons] : [];
    const newItemsTab = character.items ? [...character.items] : [];
    if (item.itemType === "weapons") {
      newWeaponsTab.push(item.name);
    } else {
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
    }

    const newMerchantList = itemsList;
    let isQuantityLeft = false;
    if (newMerchantList[itemDescribed].quantity > 1) {
      newMerchantList[itemDescribed].quantity =
        newMerchantList[itemDescribed].quantity - 1;
      isQuantityLeft = true;
    } else {
      delete newMerchantList[itemDescribed];
    }

    merchants[currentMerchant].items = newMerchantList;

    this.setState(
      state => ({
        ...state,
        itemToDescribe: isQuantityLeft ? newMerchantList[itemDescribed] : {},
        isItemDescriptionShowed: isQuantityLeft,
        itemsList: newMerchantList,
      }),
      () => {
        firebase
          .database()
          .ref("stories/" + currentStory + "/characters/" + uid + "/character")
          .set({
            ...character,
            gold: character.gold - price,
            items: newItemsTab,
            weapons: newWeaponsTab,
          })
          .then(() => {
            if (item.itemType === "artefacts") {
              item.isAcquired = true;

              // Hydrate artefacts list
              artefacts[item.key] = item;
              hydrateStoryArtefacts(currentStory, artefacts);
            }

            firebase
              .database()
              .ref("stories/" + currentStory + "/merchants/" + currentMerchant)
              .set(merchants[currentMerchant]);
          })
          .catch(error => {
            // Handle Errors here.
            dispatchCallPrintError(error);
          });
      },
    );
  };

  signOut = () => {
    const {
      dispatchCallSignOut,
      dispatchCallPrintError,
      dispatchCallSetTilesTypes,
    } = this.props;
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatchCallSignOut();
        dispatchCallSetTilesTypes();
        firebase
          .database()
          .ref()
          .off();
      })
      .catch(error => {
        // An error happened.
        dispatchCallPrintError(error);
      });
  };

  loadTownsAndQuests = () => {
    const { currentStory } = this.props;
    listenTowns(currentStory, this.doSetState);
    listenQuests(currentStory, this.doSetState);
  };

  loadEvents = () => {
    const {
      dispatchCallListenEventHistory,
      dispatchCallListenCurrentEvent,
    } = this.props;
    dispatchCallListenCurrentEvent();
    dispatchCallListenEventHistory();
    // listenEvents(currentStory, this.doSetState);
    // listenCurrentEvent(currentStory, dispatchCallSetCurrentEvent);
  };

  loadMusic = () => {
    const { currentStory, dispatchUpdateAllMusic } = this.props;
    listenMusic(currentStory, dispatchUpdateAllMusic);
    listenNoise(currentStory, dispatchUpdateAllMusic);
    listenSong(currentStory, dispatchUpdateAllMusic);
  };

  onChangeMusics = (name, value) => {
    const { isMusicFirst, isMusicTransition } = this.state;
    const { currentStory, dispatchCallPrintError } = this.props;
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
                          dispatchCallPrintError(error);
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
                          dispatchCallPrintError(error);
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
          if (name === "songName") {
            this.debouncedSavingSound();
          } else {
            this.debouncedSavingMusic();
          }
        },
      );
    }
  };

  debouncedSavingSound = debounce(() => this.props.loadSong(), 300, {
    leading: true,
    maxWait: 2000,
  });

  debouncedSavingMusic = debounce(() => this.props.loadMusic(), 300, {
    leading: true,
    maxWait: 2000,
  });

  saveMusic = () => {
    const {
      isMusicFirst,
      musicNameFirst,
      musicNameSecond,
      musicStatusFirst,
      musicStatusSecond,
      musicVolume,
      noiseName,
      noiseStatus,
      noiseVolume,
    } = this.state;
    const { currentStory, dispatchCallPrintError } = this.props;
    firebase
      .database()
      .ref("/stories/" + currentStory + "/noise")
      .set({
        noiseName,
        noiseStatus,
        noiseVolume,
      })
      .catch(error => {
        dispatchCallPrintError(error);
      });
    firebase
      .database()
      .ref("/stories/" + currentStory + "/music")
      .set({
        musicNameFirst,
        musicNameSecond,
        musicStatusFirst,
        musicStatusSecond,
        musicVolume,
        musicVolumeFirst: isMusicFirst ? musicVolume : 0,
        musicVolumeSecond: isMusicFirst ? 0 : musicVolume,
      })
      .catch(error => {
        dispatchCallPrintError(error);
      });
  };

  chooseStory = i => {
    const {
      dispatchTogglePlayerMastering,
      dispatchUpdateCurrentStory,
      dispatchSetGameMaster,
      dispatchSetCharacter,
      dispatchCallListenChatHistory,
      dispatchCallListenMapTiles,
      dispatchCallListenCurrentX,
      dispatchCallListenCurrentY,
      uid,
      stories,
    } = this.props;

    if (i < 0) return null;

    populateBestiary(i, this.doSetState);

    firebase
      .database()
      .ref("stories/" + i + "/bestiary")
      .on("value", snapshot => {
        this.setState(state => ({
          ...state,
          bestiary: snapshot.val(),
        }));

        // const test = {};
        // snapshot.val().map(b => {
        //   const newPostKey = firebase
        //     .database()
        //     .ref('/stories/' + i + '/bestiary/')
        //     .push().key;
        //   test[newPostKey] = { ...b };
        // });
        //
        // firebase
        //   .database()
        //   .ref('stories/' + i + '/bestiary')
        //   .set(test)
        //   .catch(error => {
        //     // Handle Errors here.
        //     dispatchCallPrintError(error);
        //   });
      });

    // Remember state for the next mount
    localStorage.setItem(
      "appState",
      JSON.stringify({
        ...defaultState,
        email: this.state.email,
        isAdmin: this.state.isAdmin,
        isAuth: this.state.isAuth,
        password: this.state.password,
        pseudo: this.state.pseudo,
        stories: this.state.stories,
        uid: this.state.uid,
        users: this.state.users,
      }),
    );

    dispatchTogglePlayerMastering(stories[i].gameMaster === uid);

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
              characterId: stories[i].characters[uid].characterId,
            }),
            () => {
              dispatchSetCharacter(snapshot.val());
              dispatchUpdateCurrentStory(i);
              dispatchSetGameMaster(stories[i].gameMaster);
              dispatchCallListenMapTiles();
              dispatchCallListenChatHistory();
              this.loadMusic();
              this.loadMerchantsAndItems();
              this.loadTownsAndQuests();
              dispatchCallListenCurrentX();
              dispatchCallListenCurrentY();
              this.loadEvents();
            },
          );
        });
    } else {
      //@TODO : Activate when GM will have proper tabs
      dispatchUpdateCurrentStory(i);
      dispatchSetGameMaster(stories[i].gameMaster);
      dispatchCallListenMapTiles();
      dispatchCallListenChatHistory();
      this.loadMusic();
      this.loadTownsAndQuests();
      this.loadMerchantsAndItems();
      this.loadEvents();
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
    const { dispatchCallPrintError } = this.props;
    dispatchCallPrintError(error.message);
  };

  correctRoute = () => {
    const { characterCreation, characterId, ...rest } = this.state;
    const {
      isAuth,
      pseudo,
      isGameMaster,
      currentStory,
      stories,
      characters,
    } = this.props;
    if (isAuth) {
      if (pseudo.trim() === "") {
        return <HasNoNickname signOut={this.signOut} />;
      } else {
        if (currentStory === -1) {
          return (
            <StoriesPanel
              chooseStory={this.chooseStory}
              doSetState={this.doSetState}
              signOut={this.signOut}
              triggerError={this.triggerError}
            />
          );
        } else {
          if (!isGameMaster && characterId === 0) {
            return (
              <CharacterSelection
                characterCreation={characterCreation}
                characters={characters}
                chooseStory={this.chooseStory}
                doSetState={this.doSetState}
                keepCharacter={this.keepCharacter}
                signOut={this.signOut}
                triggerError={this.triggerError}
              />
            );
          } else {
            return (
              <GameScreen
                bestiary={bestiary}
                buyItem={this.buyItem}
                characters={characters}
                doSetState={this.doSetState}
                generateTable={this.generateTable}
                hydrateMerchants={this.hydrateMerchants}
                onChange={this.onChange}
                onChangeMusics={this.onChangeMusics}
                quests={quests}
                selectAnotherCharacter={this.selectAnotherCharacter}
                signOut={this.signOut}
                toggleBestiary={this.toggleBestiary}
                toggleMerchantList={this.toggleMerchantList}
                toggleMusic={this.toggleMusic}
                triggerError={this.triggerError}
                {...rest}
              />
            );
          }
        }
      }
    }
    return <IsNotAuth />;
  };

  render() {
    const { error } = this.props;

    return (
      <div
        className="App"
        style={{
          cursor: `url('/common/cursor.png'), auto`,
        }}
      >
        <ToastProvider>
          <>
            {this.correctRoute()}
            <SoundPlayer />
            <ErrorPrinter />
          </>
        </ToastProvider>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchUpdateAllMusic: payload => {
      dispatch(updateAllMusic(payload));
    },
    dispatchToggleMusic: () => {
      dispatch(toggleMusic());
    },
    loadSong: payload => {
      dispatch({ type: CALL_LOAD_SONG, payload });
    },
    loadMusic: payload => {
      dispatch({ type: CALL_LOAD_MUSIC, payload });
    },
    loadNoise: payload => {
      dispatch({ type: CALL_LOAD_NOISE, payload });
    },
    dispatchTogglePlayerView: () => {
      dispatch(togglePlayerView());
    },
    dispatchTogglePlayerMastering: payload => {
      dispatch(togglePlayerMastering(payload));
    },
    dispatchUpdateCurrentStory: payload => {
      dispatch(updateCurrentStory(payload));
    },
    dispatchSetGameMaster: payload => {
      dispatch(setGameMaster(payload));
    },
    dispatchSetCharacter: payload => {
      dispatch(setCharacter(payload));
    },
    dispatchCallSetEventHistory: () => {
      dispatch({ type: CALL_LISTEN_EVENTS_HISTORY });
    },
    dispatchCallListenChatHistory: () => {
      dispatch({ type: CALL_LISTEN_CHAT_HISTORY });
    },
    dispatchCallSetCurrentEvent: () => {
      dispatch({ type: CALL_LISTEN_CURRENT_EVENT });
    },
    dispatchCallListenMapTiles: () => {
      dispatch({ type: CALL_LISTEN_MAP_TILES });
    },
    dispatchCallSetTilesTypes: () => {
      dispatch({ type: CALL_GET_TILES_TYPES });
    },
    dispatchCallListenCurrentX: () => {
      dispatch({ type: CALL_LISTEN_CURRENT_X });
    },
    dispatchCallListenCurrentY: () => {
      dispatch({ type: CALL_LISTEN_CURRENT_Y });
    },
    dispatchCallListenMerchantList: () => {
      dispatch({ type: CALL_LISTEN_MERCHANT_LIST });
    },
    dispatchCallPrintError: payload => {
      dispatch({ type: CALL_PRINT_ERROR, payload });
    },
    dispatchCallSignOut: () => {
      dispatch({ type: CALL_SIGN_OUT });
    },
  };
};

const mapStateToProps = store => ({
  stories: store.appState.stories,
  isGameMaster: store.appState.isGameMaster,
  isAuth: store.appState.isAuth,
  currentStory: store.appState.currentStory,
  pseudo: store.userInfos.pseudo,
  uid: store.userInfos.uid,
  character: store.character,
  characters: store.userInfos.characters,
  error: store.appState.error,
  merchants: store.merchants.merchantList,
});

App.propTypes = {
  dispatchToggleMusic: PropTypes.func.isRequired,
  dispatchUpdateAllMusic: PropTypes.func.isRequired,
  dispatchTogglePlayerView: PropTypes.func.isRequired,
  dispatchTogglePlayerMastering: PropTypes.func.isRequired,
  dispatchUpdateCurrentStory: PropTypes.func.isRequired,
  dispatchSetGameMaster: PropTypes.func.isRequired,
  dispatchSetCharacter: PropTypes.func.isRequired,
  dispatchCallSetEventHistory: PropTypes.func.isRequired,
  dispatchCallSetCurrentEvent: PropTypes.func.isRequired,
  dispatchCallPrintError: PropTypes.func.isRequired,
  dispatchCallListenChatHistory: PropTypes.func.isRequired,
  dispatchCallSignOut: PropTypes.func.isRequired,
  dispatchCallListenMapTiles: PropTypes.func.isRequired,
  dispatchCallSetTilesTypes: PropTypes.func.isRequired,
  dispatchCallListenCurrentX: PropTypes.func.isRequired,
  dispatchCallListenCurrentY: PropTypes.func.isRequired,
  dispatchCallListenMerchantList: PropTypes.func.isRequired,
  loadSong: PropTypes.func.isRequired,
  loadNoise: PropTypes.func.isRequired,
  loadMusic: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
