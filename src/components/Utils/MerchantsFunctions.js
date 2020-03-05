import firebase from "firebase";
import { itemQuantities, priceRanges } from "./Constants";

const triggerError = error => {
  console.log("Merchants function error : ", error);
};

export const resetStoryMerchants = (currentStory, items) => {
  firebase
    .database()
    .ref("merchants")
    .once("value")
    .then(snapshot => {
      const newMerchants = [];
      const artefactsLeft = [...items.artefacts];
      Object.keys(snapshot.val()).map((merchantsKeys, i) => {
        const m = snapshot.val()[merchantsKeys];
        newMerchants.push(hydrateMerchant(artefactsLeft, m, items, true));
        newMerchants[i].isDiscovered = false;
        return null;
      });

      const newItems = { ...items };
      newItems.artefacts = [...artefactsLeft];

      firebase
        .database()
        .ref("stories/" + currentStory + "/merchants")
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

export const hydrateAllMerchants = (
  currentStory,
  merchants,
  items,
  hard = false,
) => {
  Object.keys(merchants).map(key => {
    hydrateMerchant(items.artefacts, merchants[key], items, hard);
    return null;
  });

  // Hydrate DB artefacts
  firebase
    .database()
    .ref("stories/" + currentStory + "/merchants")
    .set(merchants)
    .then(() => {
      hydrateStoryArtefacts(currentStory, items.artefacts);
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
  totalHydrate = false,
) => {
  if (totalHydrate) {
    // Get back artefacts from merchant
    merchant.items &&
      Object.keys(merchant.items).map(key => {
        if (merchant.items[key].itemType === "artefacts") {
          delete merchant.items[key].price;
          delete merchant.items[key].quantity;
          artefactsLeft[merchant.items[key].key] = merchant.items[key];
        }
        return null;
      });

    // Get items from each category
    merchant.items = [];
    const consumableList = getItemsFromCategory("consumables", merchant, items);
    const enhancementList = getItemsFromCategory(
      "enhancements",
      merchant,
      items,
    );
    const stoneList = getItemsFromCategory("stones", merchant, items);
    const runeList = getItemsFromCategory("runes", merchant, items);
    const weaponList = getItemsFromCategory("weapons", merchant, items);
    const spellList = getItemsFromCategory("spells", merchant, items);
    const artefactList = getArtefactsForMerchant(artefactsLeft, merchant);

    // Concats items lists
    merchant.items = {
      ...weaponList,
      ...consumableList,
      ...enhancementList,
      ...spellList,
      ...runeList,
      ...stoneList,
      ...artefactList,
    };
  } else {
    // Get items from each category
    const weaponList = getItemsFromCategory("weapons", merchant, items, 0);
    const consumableList = getItemsFromCategory(
      "consumables",
      merchant,
      items,
      0,
    );
    const enhancementList = getItemsFromCategory(
      "enhancements",
      merchant,
      items,
      0,
    );
    const spellList = getItemsFromCategory("spells", merchant, items, 0);
    const runeList = getItemsFromCategory("runes", merchant, items, 0);
    const stoneList = getItemsFromCategory("stones", merchant, items, 0);

    // Store artefacts from merchant
    const itemsStaying = {};
    Object.keys(merchant.items).map(key => {
      if (
        merchant.items[key].rarity >= 7 ||
        merchant.items[key].itemType === "artefacts"
      ) {
        const newPostKey = firebase
          .database()
          .ref("/items")
          .push().key;
        itemsStaying[newPostKey] = { ...merchant.items[key] };
      }
      return null;
    });

    // Concats items lists and stored items
    merchant.items = {
      ...weaponList,
      ...consumableList,
      ...enhancementList,
      ...spellList,
      ...runeList,
      ...stoneList,
      ...itemsStaying,
    };
  }
  return merchant;
};

const getRandomKey = obj => {
  const keys = Object.keys(obj);
  return keys[(keys.length * Math.random()) << 0];
};

export const getItemsFromCategory = (list, merchant, items, itemsHL = 3) => {
  let itemsToGet = 0;
  let itemList = {};
  const itemsListLeft = { ...items[list.toLowerCase()] };
  for (let i = 0; i < parseInt(merchant[list], 10); i++) {
    itemsToGet += Math.floor(Math.random() * 5 + 1);
  }
  if (parseInt(merchant[list], 10) === 6 && itemsHL !== 0) {
    itemsToGet += 2;
    itemsHL += 1;
  }

  let randomItem = 0;
  while (itemsToGet > 0 && Object.keys(itemsListLeft).length > 0) {
    randomItem = getRandomKey(itemsListLeft);
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

      if (list === "spells") {
        const randomScroll = Math.floor(Math.random() * 10 + 1);
        if (randomScroll === 1) {
          newItem.name =
            "Livre de sort (" + newItem.type + ") : " + newItem.name;
          newItem.icon = "spell_book.jpg";
          newItem.isBook = true;
          newItem.price = newItem.price * Math.floor(Math.random() * 3 + 2);
        } else {
          newItem.name = "Parchemin (" + newItem.type + ") : " + newItem.name;
          newItem.isBook = false;
        }
      }
      const newPostKey = firebase
        .database()
        .ref("/items")
        .push().key;
      if (newItem.rarity >= 7) {
        if (itemsHL > 0) {
          itemList[newPostKey] = newItem;
          itemsToGet--;
          itemsHL--;
        }
      } else {
        itemList[newPostKey] = newItem;
        itemsToGet--;
      }
    }
    delete itemsListLeft[randomItem];
  }
  return itemList;
};

export const getArtefactsForMerchant = (artefactsCurrentList, merchant) => {
  let itemList = [];
  let randomItem = 0;
  let itemsToGet = parseInt(merchant["artefacts"], 10);
  for (let i = 0; i < itemsToGet; i++) {
    randomItem = randomProperty(artefactsCurrentList);
    if (!artefactsCurrentList[randomItem].isAcquired) {
      const newItem = { ...artefactsCurrentList[randomItem], key: randomItem };
      newItem.rarity = parseInt(newItem.rarity, 10);
      newItem.quantity = 1;
      newItem.itemType = "artefacts";
      const priceRange = priceRanges[newItem.rarity].maxValue * 0.2;

      newItem.price =
        priceRanges[newItem.rarity].maxValue -
        priceRange +
        Math.ceil(Math.random() * priceRange + 1);
      itemList.push(newItem);
      delete artefactsCurrentList[randomItem];
    }
  }
  return itemList;
};

export const hydrateStoryArtefacts = (currentStory, artefactsLeft) => {
  firebase
    .database()
    .ref("stories/" + currentStory + "/artefacts")
    .set(artefactsLeft)
    .catch(error => {
      // Handle Errors here.
      triggerError(error);
    });
};

const randomProperty = obj => {
  var keys = Object.keys(obj);
  return keys[(keys.length * Math.random()) << 0];
};
