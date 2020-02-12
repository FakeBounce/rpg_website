import React, { Component } from "react";
import firebase from "firebase";
import debounce from "lodash/debounce";
import { connect } from "react-redux";
import "./App.css";
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
  listenCurrentEvent,
  listenEvents,
  listenMerchants,
  listenMusic,
  listenNoise,
  listenSong,
  listenQuests,
  listenTowns,
  loadAllItems,
  loadCurrentPosition,
  // loadMerchantsOnce,
  loadTilesTypes,
  // populateTilesTypes,
  // resetEvents,
  // resetMap,
  // setQuests,
  populateBestiary,
  // loadChat,
  listenUsers,
  loadStories,
} from "./components/Utils/DatabaseFunctions";
import {
  hydrateStoryArtefacts,
  // resetStoryMerchants,
  hydrateAllMerchants,
  // hydrateMerchant,
} from "./components/Utils/MerchantsFunctions";
import { updateAllMusic } from "./redux/actions/actionsSounds";
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

const styledErrorPanel = {
  position: "absolute",
  bottom: 0,
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  backgroundColor: "#FFFED0",
  textAlign: "center",
  color: "red",
};

class App extends Component {
  constructor(props) {
    super(props);

    const localStorageInfos = localStorage.getItem("appState")
      ? JSON.parse(localStorage.getItem("appState"))
      : null;
    this.state = localStorageInfos ? localStorageInfos : { ...defaultState };

    if (localStorageInfos) {
      this.loadUsers();
      this.loadStories();

      firebase
        .auth()
        .signInWithEmailAndPassword(
          localStorageInfos.email,
          localStorageInfos.password,
        )
        .catch(error => {
          // Handle Errors here.
          this.triggerError(error);
        });
    }
  }

  componentDidMount() {
    loadTilesTypes(this.doSetState);
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
    //         this.triggerError(error);
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
    //     this.triggerError(error);
    //   });
    // });
  }

  loadMerchantsAndItems = () => {
    const { currentStory } = this.state;
    // loadMerchantsOnce(currentStory, this.doSetState)
    listenMerchants(currentStory, this.doSetState);
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
    hydrateAllMerchants(
      this.state.currentStory,
      this.state.merchants,
      this.state.items,
      this.doSetState,
      true,
    );
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
        merchants,
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

        // Reset state for the next mount
        localStorage.setItem("appState", JSON.stringify(defaultState));

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
    listenTowns(currentStory, this.doSetState);
    listenQuests(currentStory, this.doSetState);
  };

  loadCurrentPosition = () => {
    const { currentStory } = this.state;
    loadCurrentPosition(currentStory, this.doSetState);
  };

  loadEvents = () => {
    const { currentStory } = this.state;
    listenEvents(currentStory, this.doSetState);
    listenCurrentEvent(currentStory, this.doSetState);
  };

  loadMusic = () => {
    const { currentStory } = this.state;
    const { dispatchUpdateAllMusic } = this.props;
    listenMusic(currentStory, dispatchUpdateAllMusic);
    listenNoise(currentStory, dispatchUpdateAllMusic);
    listenSong(currentStory, dispatchUpdateAllMusic);
  };

  loadUsers = () => {
    listenUsers(this.doSetState);
  };

  loadStories = () => {
    loadStories(this.doSetState);
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
      currentStory,
      isMusicFirst,
      musicNameFirst,
      musicNameSecond,
      musicStatusFirst,
      musicStatusSecond,
      musicVolume,
      noiseName,
      noiseStatus,
      noiseVolume,
      songName,
      songStatus,
      songVolume,
    } = this.state;
    firebase
      .database()
      .ref("/stories/" + currentStory + "/noise")
      .set({
        noiseName,
        noiseStatus,
        noiseVolume,
      })
      .catch(error => {
        this.triggerError(error);
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
        this.triggerError(error);
      });
  };

  chooseStory = i => {
    const { stories, uid } = this.state;
    const {
      dispatchTogglePlayerMastering,
      dispatchUpdateCurrentStory,
      dispatchSetGameMaster,
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
        //     this.triggerError(error);
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
              character: snapshot.val(),
              characterId: stories[i].characters[uid].characterId,
            }),
            () => {
              dispatchUpdateCurrentStory(i);
              dispatchSetGameMaster(stories[i].gameMaster);
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
      dispatchUpdateCurrentStory(i);
      dispatchSetGameMaster(stories[i].gameMaster);
      this.createTable();
      this.createChat();
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

  createChat = () => {
    // loadChat(this.state.currentStory, this.doSetState);

    firebase
      .database()
      .ref("/stories/" + this.state.currentStory + "/chat")
      .limitToLast(50)
      .on("child_added", snapshot => {
        this.setState(state => ({
          ...state,
          chatHistory: {
            ...state.chatHistory,
            [snapshot.key]: snapshot.val(),
          },
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
      characterCreation,
      characters,
      characterId,
      currentStory,
      email,
      error,
      isAdmin,
      isAuth,
      isGameMaster,
      isMusicFirst,
      musicMute,
      musicNameFirst,
      musicNameSecond,
      musicStatusFirst,
      musicStatusSecond,
      musicVolumeFirst,
      musicVolumeSecond,
      noiseMute,
      noiseName,
      noiseStatus,
      noiseVolume,
      password,
      songName,
      songStatus,
      songVolume,
      stories,
      uid,
      ...rest
    } = this.state;
    const { pseudo } = this.props;

    return (
      <div
        className="App"
        style={{
          cursor: `url('/common/cursor.png'), auto`,
        }}
      >
        {!isAuth && (
          <IsNotAuth
            doSetState={this.doSetState}
            email={email}
            onChange={this.onChange}
            password={password}
            triggerError={this.triggerError}
            loadStories={this.loadStories}
            loadUsers={this.loadUsers}
          />
        )}

        {isAuth && pseudo === "" && (
          <HasNoNickname
            doSetState={this.doSetState}
            onChange={this.onChange}
            signOut={this.signOut}
            triggerError={this.triggerError}
          />
        )}

        {isAuth && pseudo !== "" && currentStory === -1 && (
          <StoriesPanel
            stories={stories}
            chooseStory={this.chooseStory}
            doSetState={this.doSetState}
            signOut={this.signOut}
            triggerError={this.triggerError}
          />
        )}

        {!isGameMaster &&
          isAuth &&
          pseudo !== "" &&
          currentStory > -1 &&
          characterId === 0 && (
            <CharacterSelection
              characterCreation={characterCreation}
              characters={characters}
              chooseStory={this.chooseStory}
              doSetState={this.doSetState}
              keepCharacter={this.keepCharacter}
              signOut={this.signOut}
              triggerError={this.triggerError}
              uid={uid}
            />
          )}

        {isAuth &&
          pseudo !== "" &&
          currentStory > -1 &&
          (characterId > 0 || isGameMaster) && (
            <GameScreen
              bestiary={bestiary}
              buyItem={this.buyItem}
              characters={characters}
              doSetState={this.doSetState}
              generateTable={this.generateTable}
              hydrateMerchants={this.hydrateMerchants}
              loadCurrentPosition={this.loadCurrentPosition}
              onChange={this.onChange}
              onChangeMusics={this.onChangeMusics}
              pseudo={pseudo}
              quests={quests}
              selectAnotherCharacter={this.selectAnotherCharacter}
              signOut={this.signOut}
              stories={stories}
              toggleBestiary={this.toggleBestiary}
              toggleMerchantList={this.toggleMerchantList}
              toggleMusic={this.toggleMusic}
              triggerError={this.triggerError}
              uid={uid}
              {...rest}
            />
          )}
        <SoundPlayer />
        <div style={styledErrorPanel}>{error}</div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchUpdateAllMusic: payload => {
      dispatch(updateAllMusic(payload));
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
  };
};

const mapStateToProps = store => ({
  isGameMaster: store.appState.isGameMaster,
  pseudo: store.userInfos.pseudo,
});

App.propTypes = {
  dispatchUpdateAllMusic: PropTypes.func.isRequired,
  dispatchTogglePlayerView: PropTypes.func.isRequired,
  dispatchTogglePlayerMastering: PropTypes.func.isRequired,
  dispatchUpdateCurrentStory: PropTypes.func.isRequired,
  dispatchSetGameMaster: PropTypes.func.isRequired,
  loadSong: PropTypes.func.isRequired,
  loadNoise: PropTypes.func.isRequired,
  loadMusic: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
