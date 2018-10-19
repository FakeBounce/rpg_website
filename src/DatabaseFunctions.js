import firebase from 'firebase';
import { itemQuantities, priceRanges } from './Utils/Constants';

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

export const hydrateStoryArtefacts = (currentStory, artefactsLeft) => {
  firebase
    .database()
    .ref('stories/' + currentStory + '/artefacts')
    .set(artefactsLeft)
    .catch(error => {
      // Handle Errors here.
      triggerError(error);
    });
};

export const loadAllItems = (currentStory, doSetState) => {
  firebase
    .database()
    .ref('/items')
    .once('value')
    .then(snapshot => {
      doSetState({
        items: snapshot.val(),
      });
      listenArtefacts(currentStory, snapshot.val(), doSetState);
    })
    .catch(error => {
      // An error happened.
      triggerError(error);
    });
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

export const resetStoryMerchants = (currentStory, items, doSetState) => {
  firebase
    .database()
    .ref('merchants')
    .once('value')
    .then(snapshot => {
      const newMerchants = [];
      const artefactsLeft = [...items.artefacts];
      snapshot.val().map((m, i) => {
        newMerchants.push(this.hydrateMerchant(artefactsLeft, m, items, true));
        newMerchants[i].isDiscovered = false;
      });

      const newItems = { ...items };
      newItems.artefacts = [...artefactsLeft];

      doSetState({
        merchants: newMerchants,
        items: newItems,
      });

      firebase
        .database()
        .ref('stories/' + currentStory + '/merchants')
        .set(newMerchants)
        .then(() => {
          hydrateStoryArtefacts(currentStory, artefactsLeft);
        })
        .catch(error => {
          // Handle Errors here.
          triggerError(error);
        });
    })
    .catch(error => {
      // Handle Errors here.
      triggerError(error);
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
    })
    .catch(error => {
      // An error happened.
      triggerError(error);
    });
};

export const hydrateAllMerchants = (
  currentStory,
  merchants,
  items,
  doSetState,
  hard = false
) => {
  const newMerchants = [];
  const artefactsLeft = [...items.artefacts];
  merchants.map(m => {
    newMerchants.push(this.hydrateMerchant(artefactsLeft, m, items, hard));
  });

  const newItems = { ...items };
  newItems.artefacts = [...artefactsLeft];

  doSetState({
    merchants: newMerchants,
    items: newItems,
  });

  // Hydrate DB artefacts
  firebase
    .database()
    .ref('stories/' + currentStory + '/merchants')
    .set(newMerchants)
    .then(() => {
      hydrateStoryArtefacts(currentStory, artefactsLeft);
    })
    .catch(error => {
      // Handle Errors here.
      triggerError(error);
    });
};

export const hydrateMerchant = (
  artefactsLeft,
  merchant,
  items,
  totalHydrate = false
) => {
  if (totalHydrate) {
    // Get back artefacts from merchant
    merchant.items &&
      merchant.items.map(i => {
        if (i.itemType === 'artefacts') {
          artefactsLeft.push(i);
        }
      });

    // Get items from each category
    merchant.items = [];
    const consumableList = getItemsFromCategory('consumables', merchant, items);
    const enhancementList = getItemsFromCategory(
      'enhancements',
      merchant,
      items
    );
    const stoneList = getItemsFromCategory('stones', merchant, items);
    const runeList = getItemsFromCategory('runes', merchant, items);
    const weaponList = getItemsFromCategory('weapons', merchant, items);
    const spellList = getItemsFromCategory('spells', merchant, items);
    const artefactList = getArtefactsForMerchant(artefactsLeft, merchant);

    // Concats items lists
    merchant.items = consumableList
      .concat(enhancementList)
      .concat(stoneList)
      .concat(runeList)
      .concat(weaponList)
      .concat(spellList)
      .concat(artefactList);
  } else {
    // Store artefacts from merchant
    const itemsStaying = [];
    merchant.items.map((i, index) => {
      if (i.rarity >= 7 || i.itemType === 'artefacts') {
        itemsStaying.push(i);
      }
    });

    // Get items from each category
    const consumableList = getItemsFromCategory(
      'consumables',
      merchant,
      items,
      0
    );
    const enhancementList = getItemsFromCategory(
      'enhancements',
      merchant,
      items,
      0
    );
    const stoneList = getItemsFromCategory('stones', merchant, items, 0);
    const runeList = getItemsFromCategory('runes', merchant, items, 0);
    const weaponList = getItemsFromCategory('weapons', merchant, items, 0);
    const spellList = getItemsFromCategory('spells', merchant, items, 0);

    // Concats items lists and stored items
    merchant.items = consumableList
      .concat(enhancementList)
      .concat(stoneList)
      .concat(runeList)
      .concat(weaponList)
      .concat(spellList)
      .concat(itemsStaying);
  }
  return merchant;
};

export const getItemsFromCategory = (list, merchant, items, itemsHL = 3) => {
  let itemsToGet = 0;
  let itemList = [];
  const itemsListLeft = [...items[list.toLowerCase()]];
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
          (parseInt(merchant[list], 10) - Math.ceil(newItem.rarity / 2)) +
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
            'Livre de sort (' + newItem.type + ') : ' + newItem.name;
          newItem.icon = 'spell_book.jpg';
          newItem.isBook = true;
          newItem.price = newItem.price * Math.floor(Math.random() * 3 + 2);
        } else {
          newItem.name = 'Parchemin (' + newItem.type + ') : ' + newItem.name;
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

export const getArtefactsForMerchant = (artefactsCurrentList, merchant) => {
  let itemList = [];
  let randomItem = 0;
  let itemsToGet = parseInt(merchant['artefacts'], 10);
  for (let i = 0; i < itemsToGet; i++) {
    randomItem = Math.floor(Math.random() * artefactsCurrentList.length);
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
