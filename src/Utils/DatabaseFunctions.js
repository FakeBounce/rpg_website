import firebase from 'firebase';

const triggerError = error => {
  console.log('Database function error : ', error);
};

export const loadTilesTypes = doSetState => {
  firebase
    .database()
    .ref('/tilesTypes')
    .once('value')
    .then(snapshot => {
      doSetState({
        tilesTypes: snapshot.val(),
      });
    })
    .catch(error => {
      triggerError(error);
    });
};

export const populateTilesTypes = () => {
  const tileTypes = {
    Forest: {
      backgroundColor: '#136313',
      icon:
        'https://firebasestorage.googleapis.com/v0/b/rpgwebsite-8a535.appspot.com/o/images%2Ftiles%2Fforest.png?alt=media&token=adec2c19-b40d-4c89-b52f-997495fa25ce',
    },
    Sand: {
      backgroundColor: '#b79c68',
    },
    Ocean: {
      backgroundColor: '#2999b3',
    },
    Lake: {
      backgroundColor: '#02abd2',
    },
    Mountain: {
      backgroundColor: '#73470f',
    },
    Plains: {
      backgroundColor: '#e8e3a9',
    },
    Fog: {
      hasFog: true,
    },
    NoFog: {
      hasFog: false,
    },
  };

  firebase
    .database()
    .ref('/tilesTypes')
    .set(tileTypes)
    .catch(error => {
      // Handle Errors here.
      triggerError(error);
    });
};

export const resetMap = (id, size = 40) => {
  const dravos = [];
  let rows = [];

  for (let i = 0; i < size; i++) {
    rows = [];
    for (let j = 0; j < size; j++) {
      rows.push({
        environment: 'Sand',
        hasFog: true,
        hasTown: false,
        isCurrent: false,
        x: j,
        y: i,
      });
    }
    dravos.push(rows);
  }
  firebase
    .database()
    .ref('/stories/' + id + '/map')
    .set(dravos)
    .catch(error => {
      // Handle Errors here.
      triggerError(error);
    });
};

export const resetEvents = id => {
  firebase
    .database()
    .ref('/stories/' + id + '/events')
    .set([
      {
        type: 'gold',
        gold: 35,
        goldLeft: 35,
        description: 'test',
        isActive: false,
        actionHistory: [],
      },
    ])
    .catch(error => {
      // Handle Errors here.
      triggerError(error);
    });
};

export const loadAllItems = (doSetState, currentStory = -1, cb = () => {}) => {
  firebase
    .database()
    .ref('/items')
    .once('value')
    .then(snapshot => {
      doSetState({
        items: snapshot.val(),
      });
      cb();
      // addIconPathToAllItems(snapshot.val());
      if (currentStory > -1) {
        listenArtefacts(currentStory, snapshot.val(), doSetState);
      }
    })
    .catch(error => {
      // An error happened.
      triggerError(error);
    });
};

export const loadUnusedArtefacts = currentStory => {
  firebase
    .database()
    .ref('/stories/' + currentStory + '/artefacts')
    .once('value')
    .then(snapshot => {
      addIconPathToAllArtefacts(
        snapshot.val(),
        '/stories/' + currentStory + '/artefacts'
      );
    })
    .catch(error => {
      // An error happened.
      triggerError(error);
    });
};

export const addIconPathToAllArtefacts = (items, path = '') => {
  items.map((item, index) => {
    addIconPathToItem(item, 'artefacts', path + '/' + index);
    return null;
  });
  return null;
};

export const addIconPathToAllItems = items => {
  Object.keys(items).map(key => {
    items[key].map((item, index) => {
      addIconPathToItem(item, key, 'items/' + key + '/' + index);
      return null;
    });
    return null;
  });
};

export const addItemsIconPathToAllMerchants = (currentStory, merchants) => {
  merchants.map((merchant, index) => {
    addItemsIconPathToMerchant(currentStory, index, merchant.items);
    return null;
  });
};

export const addItemsIconPathToMerchant = (currentStory, merchantId, items) => {
  items.map((item, index) => {
    addIconPathToItem(
      item,
      item.itemType,
      'stories/' + currentStory + '/merchants/' + merchantId + '/items/' + index
    );
    return null;
  });
};

export const addIconPathToItem = (item, itemType, path, hardReset) => {
  if (!item.iconPath || hardReset) {
    firebase
      .app()
      .storage()
      .ref()
      .child(`images/${itemType}/${item.icon}`)
      .getDownloadURL()
      .then(url => {
        const newItem = { ...item };
        newItem.iconPath = url;
        firebase
          .database()
          .ref(path)
          .set(newItem)
          .catch(error => {
            // Handle Errors here.
            triggerError(error);
          });
      });
  }
};

export const loadMerchantsOnce = (currentStory, doSetState) => {
  firebase
    .database()
    .ref('stories/' + currentStory + '/merchants')
    .once('value')
    .then(snapshot => {
      doSetState({
        merchants: snapshot.val(),
      });
      // snapshot.val().map((merchant,index) => {
      //   const newMerchant = {
      //     artefacts: merchant.artefacts,
      //     consumables: merchant.consumables,
      //     enhancements: merchant.enhancements,
      //     icon: merchant.icon,
      //     isDiscovered: merchant.isDiscovered,
      //     items: merchant.items,
      //     job: merchant.job,
      //     level: merchant.level,
      //     name: merchant.name,
      //     runes: merchant.runes,
      //     spells: merchant.spells,
      //     stones: merchant.stones,
      //     weapons: merchant.weapons,
      //   };
      //
      //   firebase
      //     .database()
      //     .ref('/stories/0/merchants/'+index)
      //     .set(newMerchant)
      //     .catch(error => {
      //       // Handle Errors here.
      //       triggerError(error);
      //     });
      // })
      // addItemsIconPathToAllMerchants(currentStory, snapshot.val());
    });
};

export const listenMerchants = (currentStory, doSetState) => {
  firebase
    .database()
    .ref('stories/' + currentStory + '/merchants')
    .on('value', snapshot => {
      doSetState({
        merchants: snapshot.val(),
      });
    });
};

export const listenArtefacts = (currentStory, items, doSetState) => {
  firebase
    .database()
    .ref('/stories/' + currentStory + '/artefacts')
    .on('value', snapshot => {
      doSetState({
        items: {
          ...items,
          artefacts: snapshot.val(),
        },
      });
    });
};

export const listenTowns = (currentStory, doSetState) => {
  firebase
    .database()
    .ref('/stories/' + currentStory + '/towns')
    .on('value', snapshot => {
      doSetState({
        towns: snapshot.val(),
      });
    });
};

export const listenQuests = (currentStory, doSetState) => {
  firebase
    .database()
    .ref('/stories/' + currentStory + '/quests')
    .on('value', snapshot => {
      doSetState({
        quests: snapshot.val(),
      });
    });
};

export const setQuests = (currentStory, value) => {
  firebase
    .database()
    .ref('/stories/' + currentStory + '/quests')
    .set(value)
    .catch(error => {
      // Handle Errors here.
      triggerError(error);
    });
};

export const listenUsers = doSetState => {
  firebase
    .database()
    .ref('/users')
    .on('value', snapshot => {
      doSetState({
        users: snapshot.val(),
      });
    });
};

export const listenMusic = (currentStory, doSetState) => {
  firebase
    .database()
    .ref('/stories/' + currentStory + '/music')
    .on('value', snapshot => {
      doSetState({
        ...snapshot.val(),
      });
    });
};

export const listenNoise = (currentStory, doSetState) => {
  firebase
    .database()
    .ref('/stories/' + currentStory + '/noise')
    .on('value', snapshot => {
      doSetState({
        ...snapshot.val(),
      });
    });
};

export const loadStories = doSetState => {
  firebase
    .database()
    .ref('/stories')
    .once('value')
    .then(snapshot => {
      doSetState({
        stories: snapshot.val(),
      });
    })
    .catch(error => {
      // An error happened.
      triggerError(error);
    });
};

export const listenEvents = (currentStory, doSetState) => {
  firebase
    .database()
    .ref('/stories/' + currentStory + '/events')
    .on('value', snapshot => {
      doSetState({
        eventHistory: snapshot.val(),
      });
    });
};

export const listenCurrentEvent = (currentStory, doSetState) => {
  firebase
    .database()
    .ref('/stories/' + currentStory + '/currentEvent')
    .on('value', snapshot => {
      doSetState({
        currentEvent: snapshot.val(),
      });
    });
};

export const listenChat = doSetState => {
  firebase
    .database()
    .ref('/chat')
    .on('value', snapshot => {
      doSetState({
        chatHistory: snapshot.val(),
      });
    });
};

export const loadCurrentPosition = (currentStory, doSetState) => {
  // Getting X pos
  firebase
    .database()
    .ref('/stories/' + currentStory + '/currentX')
    .once('value')
    .then(snapshot => {
      doSetState({
        currentX: snapshot.val(),
        currentZoom: 10,
      });
    })
    .catch(error => {
      // An error happened.
      triggerError(error);
    });
  // Getting Y pos
  firebase
    .database()
    .ref('/stories/' + currentStory + '/currentY')
    .once('value')
    .then(snapshot => {
      doSetState({
        currentY: snapshot.val(),
        currentZoom: 10,
      });
    })
    .catch(error => {
      // An error happened.
      triggerError(error);
    });
};

// Set default bestiary
// firebase
//   .database()
//   .ref("stories/" + 0 + "/bestiary")
//   .set(bestiary)
//   .catch(error => {
//     // Handle Errors here.
//     this.triggerError(error);
//   });

// Reroll bestiary for story
// firebase
//   .database()
//   .ref("stories/" + 0 + "/bestiary")
//   .once("value")
//   .then(sn => {
//     firebase
//       .database()
//       .ref("stories/" + 0 + "/characters")
//       .once("value")
//       .then(snapshot => {
//         const tempBestiary = [...sn.val()];
//         const tempCharacters = { ...snapshot.val() };
//         Object.keys(tempCharacters).map(key => {
//           tempBestiary.map((b, i) => {
//             let cpt = 0;
//             const maxRoll =
//               tempCharacters[key].character.userPseudo === "Danjors" &&
//               b.monster
//                 ? parseInt(tempCharacters[key].character.education) + 10
//                 : b.monster || tempCharacters[key].character.userPseudo === "Danjors"
//                   ? parseInt(tempCharacters[key].character.education) - 10
//                 : parseInt(tempCharacters[key].character.education);
//             while (
//               Math.floor(Math.random() * 100 + 1) <= maxRoll &&
//               cpt < 7
//             ) {
//               ++cpt;
//             }
//             const statsKnown = {};
//             if (cpt >= 1) {
//               statsKnown["text1"] = true;
//             }
//             if (cpt >= 2) {
//               statsKnown["text2"] = true;
//             }
//             if (cpt >= 3) {
//               statsKnown["text3"] = true;
//             }
//             if (cpt >= 4) {
//               statsKnown["text4"] = true;
//             }
//             if (cpt >= 5) {
//               if (b.monster) {
//                 statsKnown["dangerosity"] = true;
//               } else {
//                 statsKnown["age"] = true;
//               }
//             }
//             if (cpt >= 6) {
//               statsKnown["taille"] = true;
//             }
//             if (cpt >= 7) {
//               statsKnown["poids"] = true;
//             }
//             tempBestiary[i] = {
//               ...tempBestiary[i],
//               [key]: { ...statsKnown },
//             };
//             // if(tempCharacters[key].character.userPseudo === "Danjors")
//           });
//         });
//         firebase
//           .database()
//           .ref("stories/" + 0 + "/bestiary")
//           .set(tempBestiary)
//           .catch(error => {
//             // Handle Errors here.
//             this.triggerError(error);
//           });
//         this.setState(state => ({
//           ...state,
//           bestiary: tempBestiary,
//         }));
//       })
//       .catch(error => {
//         this.triggerError(error);
//       });
//   })
//   .catch(error => {
//     this.triggerError(error);
//   });

// Fill bestiary with unknown
// firebase
//   .database()
//   .ref('stories/' + 0 + '/bestiary')
//   .once('value')
//   .then(sn => {
//     firebase
//       .database()
//       .ref('stories/' + 0 + '/characters')
//       .once('value')
//       .then(snapshot => {
//         const tempBestiary = [...sn.val()];
//         const tempCharacters = { ...snapshot.val() };
//         Object.keys(tempCharacters).map(key => {
//           tempBestiary.map((b, i) => {
//             let statsKnown;
//             if (!b[key]) {
//               statsKnown = { unknown: true };
//             } else {
//               statsKnown = { ...b[key] };
//             }
//             tempBestiary[i] = {
//               ...tempBestiary[i],
//               [key]: { ...statsKnown },
//             };
//           });
//         });
//         firebase
//           .database()
//           .ref('stories/' + 0 + '/bestiary')
//           .set(tempBestiary)
//           .catch(error => {
//             // Handle Errors here.
//             this.triggerError(error);
//           });
//         this.setState(state => ({
//           ...state,
//           bestiary: tempBestiary,
//         }));
//       })
//       .catch(error => {
//         this.triggerError(error);
//       });
//   })
//   .catch(error => {
//     this.triggerError(error);
//   });

// Filling bestiary correctly
export const populateBestiary = (currentStory, doSetState) => {
  firebase
    .database()
    .ref('stories/' + currentStory + '/bestiary')
    .once('value')
    .then(sn => {
      firebase
        .database()
        .ref('stories/' + currentStory + '/characters')
        .once('value')
        .then(snapshot => {
          const tempBestiary = [...sn.val()];
          const tempCharacters = { ...snapshot.val() };
          Object.keys(tempCharacters).map(key => {
            tempBestiary.map((b, i) => {
              if (!b[key]) {
                let cpt = 0;
                const maxRoll =
                  tempCharacters[key].character.userPseudo === 'Danjors' &&
                  b.monster
                    ? parseInt(tempCharacters[key].character.education) + 10
                    : b.monster ||
                      tempCharacters[key].character.userPseudo === 'Danjors'
                      ? parseInt(tempCharacters[key].character.education) - 10
                      : parseInt(tempCharacters[key].character.education);
                while (
                  Math.floor(Math.random() * 100 + 1) <= maxRoll &&
                  cpt < 7
                ) {
                  ++cpt;
                }
                const statsKnown = {};
                if (cpt === 0) {
                  statsKnown['unknown'] = true;
                } else {
                  if (cpt >= 1) {
                    statsKnown['text1'] = true;
                  }
                  if (cpt >= 2) {
                    statsKnown['text2'] = true;
                  }
                  if (cpt >= 3) {
                    statsKnown['text3'] = true;
                  }
                  if (cpt >= 4) {
                    statsKnown['text4'] = true;
                  }
                  if (cpt >= 5) {
                    if (b.monster) {
                      statsKnown['dangerosity'] = true;
                    } else {
                      statsKnown['age'] = true;
                    }
                  }
                  if (cpt >= 6) {
                    statsKnown['taille'] = true;
                  }
                  if (cpt >= 7) {
                    statsKnown['poids'] = true;
                  }
                }
                tempBestiary[i] = {
                  ...tempBestiary[i],
                  [key]: { ...statsKnown },
                };
              }
            });
          });
          firebase
            .database()
            .ref('stories/' + 0 + '/bestiary')
            .set(tempBestiary)
            .catch(error => {
              // Handle Errors here.
              this.triggerError(error);
            });
          doSetState({
            bestiary: tempBestiary,
          });
        })
        .catch(error => {
          this.triggerError(error);
        });
    })
    .catch(error => {
      this.triggerError(error);
    });
};
