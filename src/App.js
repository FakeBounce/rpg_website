import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
import firebase from 'firebase';
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
import ErrorPrinter from './components/Utils/ErrorPrinter';
import { Icon } from 'semantic-ui-react';
import { cursorPointer } from './components/Utils/StyleConstants';
import useApp from './hooks/useApp';

const App = () => {
  const {
    characterId,
    currentStory,
    isAuth,
    pseudo,
    isGameMaster,
    musicMute,
    oldCharacterId,
  } = useSelector(store => ({
    currentStory: store.appState.currentStory,
    characterId: store.userInfos.characterId,
    characterCreation: store.userInfos.characterCreation,
    isAuth: store.appState.isAuth,
    pseudo: store.userInfos.pseudo,
    isGameMaster: store.appState.isGameMaster,
    musicMute: store.sounds.musicMute,
    oldCharacterId: store.userInfos.oldCharacterId,
  }));

  const { dispatchCallSetTilesTypes, signOut, toggleMusic } = useApp();

  // useEffect(() => {
  //   firebase
  //     .database()
  //     .ref('users')
  //     .once('value')
  //     .then(snapshot => {
  //       const users = snapshot.val();

  //       Object.keys(users).map(uKey => {
  //         // if (Array.isArray(users[uKey].characters)) {
  //         //   users[uKey].characters.map(c => {
  //         //     const newPostKey = firebase
  //         //       .database()
  //         //       .ref(`users/${uKey}/characters`)
  //         //       .push().key;

  //         //     firebase
  //         //       .database()
  //         //       .ref(`users/${uKey}/characters/${newPostKey}`)
  //         //       .set(c)
  //         //       .catch(error => {
  //         //         // Handle Errors here.
  //         //         this.triggerError(error);
  //         //       });

  //         //     firebase
  //         //       .database()
  //         //       .ref(`users/${uKey}/characters/${c.id}`)
  //         //       .remove()
  //         //       .catch(error => {
  //         //         // Handle Errors here.
  //         //         this.triggerError(error);
  //         //       });
  //         //   });
  //         // }

  //         if (users[uKey].characters) {
  //           Object.keys(users[uKey].characters).map(cKey => {
  //             firebase
  //               .database()
  //               .ref(`users/${uKey}/characters/${cKey}/id`)
  //               .set(cKey)
  //               .catch(error => {
  //                 // Handle Errors here.
  //                 this.triggerError(error);
  //               });
  //           });
  //         }
  //       });
  //     });
  // }, []);
  // constructor(props) {
  //   super(props);

  // const localStorageInfos = localStorage.getItem("appState")
  //   ? JSON.parse(localStorage.getItem("appState"))
  //   : null;
  // this.state = { ...defaultState };
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
  // }

  useEffect(() => {
    dispatchCallSetTilesTypes();
    loadAllItems();
  }, []);
  // componentDidMount() {

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
  // }

  const loadMerchantsAndItems = () => {
    loadAllItems(() => {
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

  const buyItem = (item, price) => {
    //   const {
    //     currentMerchant,
    //     itemsList,
    //     itemDescribed,
    //     items: { artefacts },
    //   } = this.state;
    //   const {
    //     currentStory,
    //     character,
    //     uid,
    //     merchants,
    //     dispatchCallPrintError,
    //   } = this.props;
    //   const newWeaponsTab = character.weapons ? [...character.weapons] : [];
    //   const newItemsTab = character.items ? [...character.items] : [];
    //   if (item.itemType === 'weapons') {
    //     newWeaponsTab.push(item.name);
    //   } else {
    //     let hasAlready = false;
    //     if (character.items) {
    //       character.items.map((i, index) => {
    //         if (i.name === item.name) {
    //           hasAlready = true;
    //           newItemsTab[index].quantity =
    //             parseInt(newItemsTab[index].quantity, 10) + 1;
    //         }
    //         return null;
    //       });
    //     }
    //     if (!hasAlready) {
    //       newItemsTab.push({ ...item, quantity: 1 });
    //     }
  };

  //   const newMerchantList = itemsList;
  //   let isQuantityLeft = false;
  //   if (newMerchantList[itemDescribed].quantity > 1) {
  //     newMerchantList[itemDescribed].quantity =
  //       newMerchantList[itemDescribed].quantity - 1;
  //     isQuantityLeft = true;
  //   } else {
  //     delete newMerchantList[itemDescribed];
  //   }

  //   merchants[currentMerchant].items = newMerchantList;

  //   this.setState(
  //     state => ({
  //       ...state,
  //       itemToDescribe: isQuantityLeft ? newMerchantList[itemDescribed] : {},
  //       isItemDescriptionShowed: isQuantityLeft,
  //       itemsList: newMerchantList,
  //     }),
  //     () => {
  //       firebase
  //         .database()
  //         .ref('stories/' + currentStory + '/characters/' + uid + '/character')
  //         .set({
  //           ...character,
  //           gold: character.gold - price,
  //           items: newItemsTab,
  //           weapons: newWeaponsTab,
  //         })
  //         .then(() => {
  //           if (item.itemType === 'artefacts') {
  //             item.isAcquired = true;

  //             // Hydrate artefacts list
  //             artefacts[item.key] = item;
  //             hydrateStoryArtefacts(currentStory, artefacts);
  //           }

  //           firebase
  //             .database()
  //             .ref('stories/' + currentStory + '/merchants/' + currentMerchant)
  //             .set(merchants[currentMerchant]);
  //         })
  //         .catch(error => {
  //           // Handle Errors here.
  //           dispatchCallPrintError(error);
  //         });
  //     },
  //   );
  // };

  const correctRoute = () => {
    if (isAuth) {
      if (pseudo.trim() === '') {
        return <HasNoNickname />;
      } else {
        if (currentStory === '') {
          return <StoriesPanel />;
        } else {
          if (
            (!isGameMaster && characterId === '') ||
            (oldCharacterId !== '' && characterId === '')
          ) {
            return <CharacterSelection />;
          } else {
            return <GameScreen />;
          }
        }
      }
    }
    return <IsNotAuth />;
  };

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
              {correctRoute()}
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
                  onClick={signOut}
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
                  onClick={toggleMusic}
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
};

export default App;
