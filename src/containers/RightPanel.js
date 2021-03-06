import React, { useState } from 'react';
import firebase from 'firebase';
import TeamPanel from '../components/TeamCharacters/TeamPanel';
import {
  widthRightPanel,
  heightHeader,
} from '../components/Utils/StyleConstants';
import CharacterPanel from '../components/CharacterPanel';
import ExchangePanel from '../components/ExchangePanel';
import SongPanel from '../components/SongPanel';
import { useSelector, useDispatch } from 'react-redux';
import { useChatContext } from '../contexts/chatContext';
import useApp from '../hooks/useApp';
import {
  CALL_LISTEN_OTHER_CHARACTER,
  CALL_SET_CHARACTER,
} from '../redux/actionsTypes/actionsTypesCharacter';

const styles = {
  RightPanel: {
    position: 'absolute',
    top: `${heightHeader}px`,
    right: 0,
    borderLeft: '1px solid black',
    width: `${widthRightPanel}px`,
    height: `${window.innerHeight - heightHeader}px`,
  },
};

const RightPanel = () => {
  const {
    currentStory,
    isGameMaster,
    characterUid,
    character,
    pseudo,
  } = useSelector(store => ({
    currentStory: store.appState.currentStory,
    isGameMaster: store.appState.isGameMaster,
    characterUid: store.character.userUid,
    character: store.character,
    pseudo: store.userInfos.pseudo,
  }));

  const [panelState, setPanelState] = useState({
    status: character.status ? character.status : 'OK',
    infoTab: 'Weapons',
    damageTaken: 0,
    gold: 0,
    currentExchangeCharacter: null,
    isOnChar: true,
    mentalDamage: 0,
  });
  const dispatch = useDispatch();
  const { setChatInput } = useChatContext();
  const { triggerError } = useApp();

  const dispatchListenCharacter = payload => {
    dispatch({
      type: CALL_LISTEN_OTHER_CHARACTER,
      payload,
    });
  };

  const dispatchSetCharacter = payload => {
    dispatch({
      type: CALL_SET_CHARACTER,
      payload,
    });
  };

  const chatWithTeamMember = receiverPseudo => {
    if (pseudo !== receiverPseudo) {
      if (receiverPseudo === 'GM') {
        setChatInput(`/gmw `);
      } else {
        setChatInput(`/w ${receiverPseudo} `);
      }
    }
  };

  const goldWithTeamMember = receiverPseudo => {
    if (pseudo !== receiverPseudo) {
      if (receiverPseudo === 'GM') {
        setChatInput(`/goldgm `);
      } else {
        setChatInput(`/gold ${receiverPseudo} `);
      }
    }
  };

  const exchangeWithTeamMember = c => {
    setPanelState({
      ...panelState,
      currentExchangeCharacter: c,
    });
  };

  const onChange = (name, value) => {
    const obj = {};
    obj[name] = value;
    setPanelState({
      ...panelState,
      ...obj,
    });
  };

  const onChangeTab = tab => {
    setPanelState({
      ...panelState,
      infoTab: tab,
    });
  };

  const onLifeChange = () => {
    const { health, maxHealth } = character;
    const { damageTaken } = panelState;

    const healthLeft =
      parseInt(health, 10) + damageTaken < 0
        ? 0
        : parseInt(health, 10) + damageTaken > maxHealth
        ? maxHealth
        : parseInt(health, 10) + damageTaken;

    firebase
      .database()
      .ref(
        'stories/' +
          currentStory +
          '/characters/' +
          characterUid +
          '/character/health',
      )
      .set(parseInt(healthLeft, 10))
      .catch(error => {
        // Handle Errors here.
        triggerError(error);
      });
  };

  const onMentalChange = () => {
    const { mentalState, maxMentalState } = character;
    const { mentalDamage } = panelState;

    const mentalLeft =
      parseInt(mentalState, 10) + mentalDamage < 0
        ? 0
        : parseInt(mentalState, 10) + mentalDamage > maxMentalState
        ? maxMentalState
        : parseInt(mentalState, 10) + mentalDamage;

    firebase
      .database()
      .ref(
        'stories/' +
          currentStory +
          '/characters/' +
          characterUid +
          '/character/mentalState',
      )
      .set(parseInt(mentalLeft, 10))
      .catch(error => {
        // Handle Errors here.
        triggerError(error);
      });
  };

  const onStatusChange = () => {
    const { status } = panelState;

    firebase
      .database()
      .ref(
        'stories/' +
          currentStory +
          '/characters/' +
          characterUid +
          '/character/status',
      )
      .set(status)
      .catch(error => {
        // Handle Errors here.
        triggerError(error);
      });
  };

  const onItemUse = (i, value) => {
    if (value > -1) {
      let newCharacterItems = [...character.items];

      if (value > 0) {
        newCharacterItems[i].quantity = value;
      } else {
        newCharacterItems.splice(i, 1);
      }

      const newCharacter = {
        ...character,
        items: newCharacterItems,
      };

      dispatchSetCharacter(newCharacter);
    }
  };

  const onItemExchange = (i, value, givableItem) => {
    const { currentExchangeCharacter } = panelState;

    const newCharacterItems = currentExchangeCharacter.items
      ? [...currentExchangeCharacter.items]
      : [];
    let hasAlready = false;
    if (currentExchangeCharacter.items) {
      currentExchangeCharacter.items.map((item, index) => {
        if (item.name === givableItem.name) {
          hasAlready = true;
          newCharacterItems[index].quantity =
            parseInt(newCharacterItems[index].quantity, 10) + 1;
        }
        return null;
      });
    }
    if (!hasAlready) {
      newCharacterItems.push({ ...givableItem, quantity: 1 });
    }
    currentExchangeCharacter.items = newCharacterItems;

    firebase
      .database()
      .ref(
        'stories/' +
          currentStory +
          '/characters/' +
          currentExchangeCharacter.userUid +
          '/character/items',
      )
      .set(newCharacterItems)
      .then(() => {
        onItemUse(i, value);
      })
      .catch(error => {
        // Handle Errors here.
        triggerError(error);
      });
  };

  const onWeaponExchange = (i, givableItem) => {
    const { currentExchangeCharacter } = panelState;

    const newCharacterItems = currentExchangeCharacter.weapons
      ? [...currentExchangeCharacter.weapons]
      : [];
    newCharacterItems.push(givableItem);
    currentExchangeCharacter.weapons = newCharacterItems;

    firebase
      .database()
      .ref(
        'stories/' +
          currentStory +
          '/characters/' +
          currentExchangeCharacter.userUid +
          '/character/weapons',
      )
      .set(newCharacterItems)
      .then(() => {
        const newCharacterWeapons = character.weapons;

        newCharacterWeapons.splice(i, 1);

        firebase
          .database()
          .ref(
            'stories/' +
              currentStory +
              '/characters/' +
              characterUid +
              '/character',
          )
          .set(character)
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

  // for GM only
  const onGoldChange = () => {
    const { gold } = panelState;

    if (isGameMaster) {
      const goldToSet = character.gold + gold < 0 ? 0 : character.gold + gold;

      firebase
        .database()
        .ref(
          'stories/' +
            currentStory +
            '/characters/' +
            characterUid +
            '/character/gold',
        )
        .set(goldToSet)
        .catch(error => {
          // Handle Errors here.
          triggerError(error);
        });
    }
  };

  const modifyCurrentCharacter = newUid => {
    if (isGameMaster) {
      firebase
        .database()
        .ref(
          'stories/' +
            currentStory +
            '/characters/' +
            characterUid +
            '/character',
        )
        .off();

      dispatchListenCharacter(newUid);
    }
  };

  const closeExchange = () => {
    setPanelState({
      ...panelState,
      currentExchangeCharacter: null,
    });
  };

  const toggleIsOnChar = () => {
    setPanelState({
      ...panelState,
      isOnChar: !panelState.isOnChar,
    });
  };

  const {
    status,
    infoTab,
    damageTaken,
    gold,
    currentExchangeCharacter,
    isOnChar,
    mentalDamage,
  } = panelState;

  return (
    <div style={styles.RightPanel}>
      {isOnChar ? (
        <CharacterPanel
          damageTaken={damageTaken}
          gold={gold}
          infoTab={infoTab}
          onChange={onChange}
          onChangeTab={onChangeTab}
          onGoldChange={onGoldChange}
          onItemUse={onItemUse}
          onLifeChange={onLifeChange}
          onStatusChange={onStatusChange}
          toggleIsOnChar={toggleIsOnChar}
          status={status}
          mentalDamage={mentalDamage}
          onMentalChange={onMentalChange}
        />
      ) : (
        <SongPanel toggleIsOnChar={toggleIsOnChar} />
      )}
      {currentExchangeCharacter !== null && (
        <ExchangePanel
          closeExchange={closeExchange}
          onItemExchange={onItemExchange}
          onWeaponExchange={onWeaponExchange}
          currentExchangeCharacter={currentExchangeCharacter}
        />
      )}
      <TeamPanel
        chatWithTeamMember={chatWithTeamMember}
        exchangeWithTeamMember={exchangeWithTeamMember}
        goldWithTeamMember={goldWithTeamMember}
        modifyCurrentCharacter={modifyCurrentCharacter}
      />
    </div>
  );
};

export default RightPanel;
