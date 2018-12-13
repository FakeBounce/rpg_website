import React, { Component } from 'react';
import firebase from 'firebase';
import debounce from 'lodash/debounce';
import './App.css';
import IsNotAuth from './Authentication/IsNotAuth';
import HasNoNickname from './NicknameSelection/HasNoNickname';
import CharacterSelection from './CharacterSelection/CharacterSelection';
import StoriesPanel from './StoryPanel/StoriesPanel';

import { defaultState, quests, bestiary } from './Utils/Constants';
// import LoadSpreasheet from './Utils/LoadSpreasheet';
import GameScreen from './GameScreen';
import SoundPlayer from './SoundPlayer/SoundPlayer';
import {
  // listenArtefacts,
  loadUnusedArtefacts,
  listenCurrentEvent,
  listenEvents,
  listenMerchants,
  listenMusic,
  listenNoise,
  listenQuests,
  listenTowns,
  listenUsers,
  loadAllItems,
  loadCurrentPosition,
  // loadMerchantsOnce,
  loadStories,
  loadTilesTypes,
  // populateTilesTypes,
  // resetEvents,
  // resetMap,
  setQuests,
  populateBestiary,
  loadChat,
} from './Utils/DatabaseFunctions';
import {
  hydrateStoryArtefacts,
  // resetStoryMerchants,
  hydrateAllMerchants,
  // hydrateMerchant,
} from './Utils/MerchantsFunctions';
import LoadSpreasheet from './Utils/LoadSpreasheet';
import Draw from './Draw';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = localStorage.getItem('appState')
      ? JSON.parse(localStorage.getItem('appState'))
      : { ...defaultState };
    if (localStorage.getItem('appState')) {
      this.loadUsers();
      this.loadStories();
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
    populateBestiary(0, this.doSetState);

    firebase
      .database()
      .ref('stories/' + 0 + '/bestiary')
      .on('value', snapshot => {
        this.setState(state => ({
          ...state,
          bestiary: snapshot.val(),
        }));
      });
  }

  loadMerchantsAndItems = () => {
    const { currentStory } = this.state;
    // loadMerchantsOnce(currentStory, this.doSetState)
    listenMerchants(currentStory, this.doSetState);
    loadAllItems(this.doSetState, currentStory, () => {
      // hydrateAllMerchants(this.state.currentStory, this.state.merchants, this.state.items, this.doSetState, false);
    }); // And listen to artefacts on callback
    // resetStoryMerchants(currentStory, this.doSetState);
  };

  hydrateMerchants = () => {
    hydrateAllMerchants(
      this.state.currentStory,
      this.state.merchants,
      this.state.items,
      this.doSetState,
      false
    );
  };

  toggleBestiary = () => {
    this.setState(state => ({
      ...state,
      isOnBestiary: !state.isOnBestiary,
      onChatHelp: false,
    }));
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

    const newMerchantList = { ...itemsList };
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
              const newArtefactsList = [...artefacts];
              newArtefactsList.push(item);
              artefacts.push(item);
              hydrateStoryArtefacts(currentStory, newArtefactsList);
            }

            firebase
              .database()
              .ref('stories/' + currentStory + '/merchants/' + currentMerchant)
              .set(merchants[currentMerchant]);
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

        firebase
          .database()
          .ref('/tilesTypes')
          .once('value')
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
      .ref('/maps/' + stories[currentStory].map)
      .on('value', snapshot => {
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

  loadUsers = () => {
    listenUsers(this.doSetState);
  };

  loadStories = () => {
    loadStories(this.doSetState);
  };

  loadMusic = () => {
    const { currentStory } = this.state;
    listenMusic(currentStory, this.doSetState);
    listenNoise(currentStory, this.doSetState);
  };

  stopNoise = () => {
    const { currentStory } = this.state;
    this.setState(
      state => ({
        ...state,
        noiseStatus: 'STOPPPED',
        noiseName: '',
      }),
      () => {
        firebase
          .database()
          .ref('/stories/' + currentStory + '/noise')
          .set({
            noiseStatus: this.state.noiseStatus,
            noiseName: this.state.noiseName,
          })
          .catch(error => {
            this.triggerError(error);
          });
      }
    );
  };

  resetSounds = () => {
    const { currentStory } = this.state;
    firebase
      .database()
      .ref('/stories/' + currentStory + '/music')
      .set({
        musicVolume: 100,
        musicNameFirst: '',
        musicVolumeFirst: 0,
        musicNameSecond: '',
        musicVolumeSecond: 0,
        musicStatusFirst: 'STOPPED',
        musicStatusSecond: 'STOPPED',
      })
      .catch(error => {
        this.triggerError(error);
      });
    firebase
      .database()
      .ref('/stories/' + currentStory + '/noise')
      .set({
        noiseName: '',
        noiseVolume: 100,
        noiseStatus: 'STOPPED',
      })
      .catch(error => {
        this.triggerError(error);
      });
  };

  onChangeMusics = (name, value) => {
    const { isMusicFirst, isMusicTransition, currentStory } = this.state;
    const obj = {};
    obj[name] = value;
    if (name === 'musicName') {
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
                        i !== 20 && state.musicNameFirst !== ''
                          ? 'PLAYING'
                          : 'STOPPED',
                      musicStatusSecond: 'PLAYING',
                    }),
                    () => {
                      firebase
                        .database()
                        .ref('/stories/' + currentStory + '/music')
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
                    }
                  );
                }, i * 300);
              }
            }
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
                        i !== 20 && state.musicNameSecond !== ''
                          ? 'PLAYING'
                          : 'STOPPED',
                      musicStatusFirst: 'PLAYING',
                    }),
                    () => {
                      firebase
                        .database()
                        .ref('/stories/' + currentStory + '/music')
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
                    }
                  );
                }, i * 300);
              }
            }
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
        }
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
    firebase
      .database()
      .ref('/stories/' + currentStory + '/noise')
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
      .ref('/stories/' + currentStory + '/music')
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

    // Remember state for the next mount
    localStorage.setItem(
      'appState',
      JSON.stringify({
        ...defaultState,
        email: this.state.email,
        isAuth: this.state.isAuth,
        password: this.state.password,
        pseudo: this.state.pseudo,
        stories: this.state.stories,
        uid: this.state.uid,
        users: this.state.users,
      })
    );
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
              characterId: stories[i].characters[uid].characterId,
              currentStory: i,
              gameMaster: stories[i].gameMaster,
              isGameMaster: isGM,
            }),
            () => {
              this.createTable();
              this.createChat();
              this.loadMusic();
              this.loadMerchantsAndItems();
              this.loadTownsAndQuests();
              this.loadCurrentPosition();
              this.loadEvents();
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
          this.loadEvents();
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
    loadChat(this.state.currentStory, this.doSetState);

    firebase
      .database()
      .ref('/stories/' + this.state.currentStory + '/chat')
      .limitToLast(50)
      .on('child_added', snapshot => {
        const tempChat = [...this.state.chatHistory, snapshot.val()];
        tempChat.splice(0, 1);

        this.setState(state => ({
          ...state,
          chatHistory: [...tempChat],
        }));
      });
  };

  accessChatHelp = () => {
    this.setState(state => ({
      ...state,
      onChatHelp: !state.onChatHelp,
      isOnBestiary: false,
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
      bestiary,
      character,
      characterCreation,
      characterId,
      characters,
      chatHistory,
      chatInput,
      currentEvent,
      currentMerchant,
      currentQuest,
      currentScale,
      currentStory,
      currentTile,
      currentTown,
      currentX,
      currentY,
      currentZoom,
      email,
      error,
      eventHistory,
      gameMaster,
      isAuth,
      isGameMaster,
      isItemDescriptionShowed,
      isItemShowed,
      isMusicFirst,
      isOnPlayerView,
      isQuestShowed,
      isOnBestiary,
      isTownShowed,
      items,
      itemsList,
      itemToDescribe,
      map,
      merchants,
      merchantsList,
      musicMute,
      musicNameFirst,
      musicNameSecond,
      musicStatusFirst,
      musicStatusSecond,
      musicVolume,
      musicVolumeFirst,
      musicVolumeSecond,
      noiseMute,
      noiseName,
      noiseStatus,
      noiseVolume,
      onChatHelp,
      password,
      pseudo,
      pseudoInput,
      quests,
      questsList,
      stories,
      storyCharacters,
      textureToApply,
      tilesTypes,
      towns,
      uid,
      users,
    } = this.state;

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
            loadStories={this.loadStories}
            loadUsers={this.loadUsers}
            onChange={this.onChange}
            password={password}
            triggerError={this.triggerError}
          />
        )}

        {isAuth &&
          pseudo === '' && (
            <HasNoNickname
              doSetState={this.doSetState}
              onChange={this.onChange}
              pseudoInput={pseudoInput}
              triggerError={this.triggerError}
            />
          )}

        {isAuth &&
          pseudo !== '' &&
          currentStory === -1 && (
            <StoriesPanel stories={stories} chooseStory={this.chooseStory} />
          )}

        {!isGameMaster &&
          isAuth &&
          pseudo !== '' &&
          currentStory > -1 &&
          characterId === 0 && (
            <CharacterSelection
              characterCreation={characterCreation}
              characters={characters}
              chooseStory={this.chooseStory}
              currentStory={currentStory}
              doSetState={this.doSetState}
              keepCharacter={this.keepCharacter}
              pseudo={pseudo}
              triggerError={this.triggerError}
              uid={uid}
            />
          )}

        {isAuth &&
          pseudo !== '' &&
          currentStory > -1 &&
          (characterId > 0 || isGameMaster) && (
            <GameScreen
              accessChatHelp={this.accessChatHelp}
              bestiary={bestiary}
              buyItem={this.buyItem}
              character={character}
              chatHistory={chatHistory}
              chatInput={chatInput}
              currentEvent={currentEvent}
              currentMerchant={currentMerchant}
              currentQuest={currentQuest}
              currentScale={currentScale}
              currentStory={currentStory}
              currentTile={currentTile}
              currentTown={currentTown}
              currentX={currentX}
              currentY={currentY}
              currentZoom={currentZoom}
              doSetState={this.doSetState}
              eventHistory={eventHistory}
              gameMaster={gameMaster}
              generateTable={this.generateTable}
              hydrateMerchants={this.hydrateMerchants}
              isGameMaster={isGameMaster}
              isItemDescriptionShowed={isItemDescriptionShowed}
              isItemShowed={isItemShowed}
              isOnBestiary={isOnBestiary}
              isOnPlayerView={isOnPlayerView}
              isQuestShowed={isQuestShowed}
              isTownShowed={isTownShowed}
              items={items}
              itemsList={itemsList}
              itemToDescribe={itemToDescribe}
              loadCurrentPosition={this.loadCurrentPosition}
              map={map}
              merchants={merchants}
              merchantsList={merchantsList}
              musicMute={musicMute}
              musicName={isMusicFirst ? musicNameFirst : musicNameSecond}
              musicVolume={musicVolume}
              noiseName={noiseName}
              noiseVolume={noiseVolume}
              onChange={this.onChange}
              onChangeMusics={this.onChangeMusics}
              onChatHelp={onChatHelp}
              pseudo={pseudo}
              quests={quests}
              questsList={questsList}
              resetSounds={this.resetSounds}
              selectAnotherCharacter={this.selectAnotherCharacter}
              signOut={this.signOut}
              stories={stories}
              storyCharacters={storyCharacters}
              textureToApply={textureToApply}
              tilesTypes={tilesTypes}
              toggleMusic={this.toggleMusic}
              toggleBestiary={this.toggleBestiary}
              togglePlayerView={this.togglePlayerView}
              towns={towns}
              triggerError={this.triggerError}
              uid={uid}
              users={users}
            />
          )}
        <SoundPlayer
          musicMute={musicMute}
          musicNameFirst={musicNameFirst}
          musicNameSecond={musicNameSecond}
          musicStatusFirst={musicStatusFirst}
          musicStatusSecond={musicStatusSecond}
          musicVolumeFirst={musicVolumeFirst}
          musicVolumeSecond={musicVolumeSecond}
          noiseMute={noiseMute}
          noiseName={noiseName}
          noiseStatus={noiseStatus}
          noiseVolume={noiseVolume}
          stopNoise={this.stopNoise}
        />
        <div style={{ position: 'absolute', bottom: 0, textAlign: 'center' }}>
          {error}
        </div>
      </div>
    );
  }
}

export default App;
