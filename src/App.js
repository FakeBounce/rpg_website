import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { ToastProvider } from './contexts/toastContext';
import { ChatProvider } from './contexts/chatContext';
import { EventProvider } from './contexts/eventContext';

import IsNotAuth from './components/Authentication/IsNotAuth';
import HasNoNickname from './components/NicknameSelection/HasNoNickname';
import CharacterSelection from './components/CharacterSelection/CharacterSelection';
import StoriesPanel from './components/StoryPanel';

import { defaultState } from './components/Utils/Constants';
import GameScreen from './containers/GameScreen';
import SoundPlayer from './components/SoundPlayer/SoundPlayer';
import {
  // listenArtefacts,
  // loadUnusedArtefacts,
  // listenCurrentEvent,
  // listenEvents,
  // listenMerchants,
  // listenMusic,
  // listenNoise,
  // listenSong,
  // listenQuests,
  // listenTowns,
  loadAllItems,
  // loadCurrentPosition,
  // loadMerchantsOnce,
  // loadTilesTypes,
  // populateTilesTypes,
  // resetEvents,
  // resetMap,
  // setQuests,
  // populateBestiary,
  // loadChat,
} from './components/Utils/DatabaseFunctions';
import {
  hydrateStoryArtefacts,
  // resetStoryMerchants,
  // hydrateAllMerchants,
  // hydrateMerchant,
} from './components/Utils/MerchantsFunctions';
import { toggleMusic } from './redux/actions/actionsSounds';
import PropTypes from 'prop-types';
import {
  setGameMaster,
  togglePlayerMastering,
  updateCurrentStory,
} from './redux/actions/actionsAppState';
import {
  CALL_LISTEN_MUSIC,
  CALL_LISTEN_NOISE,
  CALL_LISTEN_SONG,
} from './redux/actionsTypes/actionsTypesSounds';
import {
  CALL_LISTEN_CURRENT_EVENT,
  CALL_LISTEN_EVENTS_HISTORY,
} from './redux/actionsTypes/actionsTypesEvents';
import {
  CALL_PRINT_ERROR,
  CALL_SIGN_OUT,
} from './redux/actionsTypes/actionsTypesAppState';
import { CALL_LISTEN_CHAT_HISTORY } from './redux/actionsTypes/actionsTypesChat';
import ErrorPrinter from './components/Utils/ErrorPrinter';
import {
  CALL_GET_TILES_TYPES,
  CALL_LISTEN_ALL_QUESTS,
  CALL_LISTEN_ALL_TOWNS,
  CALL_LISTEN_CURRENT_X,
  CALL_LISTEN_CURRENT_Y,
  CALL_LISTEN_MAP_TILES,
} from './redux/actionsTypes/actionsTypesMapInfos';
import { CALL_LISTEN_MERCHANT_LIST } from './redux/actionsTypes/actionsTypesMerchants';
import { CALL_LISTEN_BESTIARY } from './redux/actionsTypes/actionsTypesBestiary';
import { CALL_LISTEN_TEAM_CHARACTERS } from './redux/actionsTypes/actionsTypesTeam';
import { CALL_LISTEN_CHARACTER } from './redux/actionsTypes/actionsTypesCharacter';
import { CALL_GET_ITEM_LIST } from './redux/actionsTypes/actionsTypesItems';
import { Icon } from 'semantic-ui-react';
import { cursorPointer } from './components/Utils/StyleConstants';

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
    //       .ref("stories/" + 1 + "/bestiary")
    //       .set(bestiary)
    //       .catch(error => {
    //         // Handle Errors here.
    //         this.triggerError(error);
    //       });
    //   });
    // });

    // firebase
    //   .database()
    //   .ref("stories/" + 1 + "/music")
    //   .once("value")
    //   .then(snapshot => {
    //     firebase
    //       .database()
    //       .ref("stories/" + 0 + "/music")
    //       .set(snapshot.val())
    //       .catch(error => {
    //         // Handle Errors here.
    //         this.triggerError(error);
    //       });
    //   });
    //
    // firebase
    //   .database()
    //   .ref("stories/" + 1 + "/noise")
    //   .once("value")
    //   .then(snapshot => {
    //     firebase
    //       .database()
    //       .ref("stories/" + 0 + "/noise")
    //       .set(snapshot.val())
    //       .catch(error => {
    //         // Handle Errors here.
    //         this.triggerError(error);
    //       });
    //   });
    //
    // firebase
    //   .database()
    //   .ref("stories/" + 1 + "/song")
    //   .once("value")
    //   .then(snapshot => {
    //     firebase
    //       .database()
    //       .ref("stories/" + 0 + "/song")
    //       .set(snapshot.val())
    //       .catch(error => {
    //         // Handle Errors here.
    //         this.triggerError(error);
    //       });
    //   });
  }

  loadMerchantsAndItems = () => {
    const { currentStory } = this.props;
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

  toggleMusic = () => this.props.dispatchToggleMusic();

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
    if (item.itemType === 'weapons') {
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
          .ref('stories/' + currentStory + '/characters/' + uid + '/character')
          .set({
            ...character,
            gold: character.gold - price,
            items: newItemsTab,
            weapons: newWeaponsTab,
          })
          .then(() => {
            if (item.itemType === 'artefacts') {
              item.isAcquired = true;

              // Hydrate artefacts list
              artefacts[item.key] = item;
              hydrateStoryArtefacts(currentStory, artefacts);
            }

            firebase
              .database()
              .ref('stories/' + currentStory + '/merchants/' + currentMerchant)
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

  chooseStory = i => {
    const {
      dispatchTogglePlayerMastering,
      dispatchUpdateCurrentStory,
      dispatchSetGameMaster,
      dispatchListenCharacter,
      dispatchCallListenChatHistory,
      dispatchCallListenMapTiles,
      dispatchCallListenCurrentX,
      dispatchCallListenCurrentY,
      dispatchCallListenBestiary,
      dispatchCallListenTeamCharacters,
      dispatchCallListenCurrentEvent,
      dispatchCallListenEventHistory,
      dispatchCallListenAllTowns,
      dispatchCallListenAllQuests,
      dispatchCallListenMusic,
      dispatchCallListenNoise,
      dispatchCallListenSong,
      dispatchCallListenMerchantList,
      dispatchCallGetItemList,
      uid,
      stories,
    } = this.props;
    dispatchUpdateCurrentStory(i);

    if (i < 0) return null;

    dispatchCallListenBestiary();
    dispatchTogglePlayerMastering(stories[i].gameMaster === uid);

    if (
      typeof stories[i].characters !== 'undefined' &&
      typeof stories[i].characters[uid] !== 'undefined'
    ) {
      dispatchListenCharacter();
      dispatchSetGameMaster(stories[i].gameMaster);
      dispatchCallListenMapTiles();
      dispatchCallListenChatHistory();
      dispatchCallListenMusic();
      dispatchCallListenNoise();
      dispatchCallListenSong();
      dispatchCallListenMerchantList();
      dispatchCallGetItemList();
      // this.loadMerchantsAndItems();
      dispatchCallListenAllTowns();
      dispatchCallListenAllQuests();
      dispatchCallListenCurrentX();
      dispatchCallListenCurrentY();
      dispatchCallListenCurrentEvent();
      dispatchCallListenEventHistory();
    } else {
      //@TODO : Activate when GM will have proper tabs
      dispatchSetGameMaster(stories[i].gameMaster);
      dispatchCallListenMapTiles();
      dispatchCallListenChatHistory();
      dispatchCallListenMusic();
      dispatchCallListenNoise();
      dispatchCallListenSong();
      dispatchCallListenAllTowns();
      dispatchCallListenAllQuests();
      dispatchCallListenMerchantList();
      dispatchCallGetItemList();
      // this.loadMerchantsAndItems();
      dispatchCallListenCurrentEvent();
      dispatchCallListenEventHistory();
    }
    dispatchCallListenTeamCharacters();
    // firebase
    //   .database()
    //   .ref("/stories/" + i + "/characters")
    //   .on("value", snapshot => {
    //     const charactersFromStories = [];
    //     if (typeof snapshot.val() !== "undefined" && snapshot.val()) {
    //       Object.keys(snapshot.val()).map(key => {
    //         charactersFromStories.push(snapshot.val()[key].character);
    //         return null;
    //       });
    //     }
    //     this.setState(state => ({
    //       ...state,
    //       storyCharacters: charactersFromStories,
    //     }));
    //   });
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
    const { isAuth, pseudo, isGameMaster, currentStory } = this.props;
    if (isAuth) {
      if (pseudo.trim() === '') {
        return <HasNoNickname />;
      } else {
        if (currentStory === -1) {
          return (
            <StoriesPanel
              chooseStory={this.chooseStory}
              doSetState={this.doSetState}
              triggerError={this.triggerError}
            />
          );
        } else {
          if (!isGameMaster && characterId === 0) {
            return (
              <CharacterSelection
                chooseStory={this.chooseStory}
                keepCharacter={this.keepCharacter}
                triggerError={this.triggerError}
              />
            );
          } else {
            return (
              <GameScreen
                buyItem={this.buyItem}
                selectAnotherCharacter={this.selectAnotherCharacter}
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
    const { isAuth, musicMute } = this.props;
    return (
      <div
        className='App'
        style={{
          cursor: `url('/common/cursor.png'), auto`,
        }}
      >
        <ToastProvider>
          <ChatProvider>
            <EventProvider>
              <>
                {this.correctRoute()}
                <SoundPlayer />
                <ErrorPrinter />
                {isAuth && (
                  <Icon
                    style={{
                      position: 'absolute',
                      top: 10,
                      right: 20,
                      cursor: cursorPointer,
                    }}
                    onClick={this.signOut}
                    circular
                    inverted
                    name='shutdown'
                    color='red'
                  />
                )}
                {isAuth && (
                  <Icon
                    style={{
                      position: 'absolute',
                      top: 45,
                      right: 20,
                      cursor: cursorPointer,
                    }}
                    onClick={this.toggleMusic}
                    circular
                    name={!musicMute ? 'volume up' : 'volume off'}
                    inverted
                    color={'black'}
                  />
                )}
              </>
            </EventProvider>
          </ChatProvider>
        </ToastProvider>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchCallListenMusic: () => {
      dispatch({ type: CALL_LISTEN_MUSIC });
    },
    dispatchCallListenNoise: () => {
      dispatch({ type: CALL_LISTEN_NOISE });
    },
    dispatchCallListenSong: () => {
      dispatch({ type: CALL_LISTEN_SONG });
    },
    dispatchToggleMusic: () => {
      dispatch(toggleMusic());
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
    dispatchListenCharacter: () => {
      dispatch({ type: CALL_LISTEN_CHARACTER });
    },
    dispatchCallListenEventHistory: () => {
      dispatch({ type: CALL_LISTEN_EVENTS_HISTORY });
    },
    dispatchCallListenChatHistory: () => {
      dispatch({ type: CALL_LISTEN_CHAT_HISTORY });
    },
    dispatchCallListenCurrentEvent: () => {
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
    dispatchCallListenAllTowns: () => {
      dispatch({ type: CALL_LISTEN_ALL_TOWNS });
    },
    dispatchCallListenAllQuests: () => {
      dispatch({ type: CALL_LISTEN_ALL_QUESTS });
    },
    dispatchCallListenBestiary: () => {
      dispatch({ type: CALL_LISTEN_BESTIARY });
    },
    dispatchCallListenTeamCharacters: () => {
      dispatch({ type: CALL_LISTEN_TEAM_CHARACTERS });
    },
    dispatchCallGetItemList: () => {
      dispatch({ type: CALL_GET_ITEM_LIST });
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
  merchants: store.merchants.merchantList,
  items: store.items.items,
  musicMute: store.sounds.music.musicMute,
});

App.propTypes = {
  dispatchToggleMusic: PropTypes.func.isRequired,
  dispatchCallListenMusic: PropTypes.func.isRequired,
  dispatchCallListenSong: PropTypes.func.isRequired,
  dispatchCallListenNoise: PropTypes.func.isRequired,
  dispatchTogglePlayerMastering: PropTypes.func.isRequired,
  dispatchUpdateCurrentStory: PropTypes.func.isRequired,
  dispatchSetGameMaster: PropTypes.func.isRequired,
  dispatchListenCharacter: PropTypes.func.isRequired,
  dispatchCallListenEventHistory: PropTypes.func.isRequired,
  dispatchCallListenCurrentEvent: PropTypes.func.isRequired,
  dispatchCallPrintError: PropTypes.func.isRequired,
  dispatchCallListenChatHistory: PropTypes.func.isRequired,
  dispatchCallSignOut: PropTypes.func.isRequired,
  dispatchCallListenMapTiles: PropTypes.func.isRequired,
  dispatchCallSetTilesTypes: PropTypes.func.isRequired,
  dispatchCallListenCurrentX: PropTypes.func.isRequired,
  dispatchCallListenCurrentY: PropTypes.func.isRequired,
  dispatchCallListenAllTowns: PropTypes.func.isRequired,
  dispatchCallListenAllQuests: PropTypes.func.isRequired,
  dispatchCallListenMerchantList: PropTypes.func.isRequired,
  dispatchCallListenBestiary: PropTypes.func.isRequired,
  dispatchCallListenTeamCharacters: PropTypes.func.isRequired,
  dispatchCallGetItemList: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
