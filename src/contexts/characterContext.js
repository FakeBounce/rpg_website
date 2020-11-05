import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import firebase from 'firebase';
import { addEmptyString, removeIndex, updateIndex } from '../arrayManipulator';
import useApp from '../hooks/useApp';
import useCharacter from '../hooks/useCharacter';

const CharacterContext = React.createContext(undefined);

export const useCharacterContext = () => useContext(CharacterContext);

function CharacterProvider(props) {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');
  const [iconPath, setIconPath] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState([]);
  const [abilities, setAbilities] = useState([]);
  const [weapons, setWeapons] = useState([]);
  const [items, setItems] = useState([]);
  const [totalPointsleft, setTotalPointsleft] = useState(0);
  const [currentPicture, setCurrentPicture] = useState({});
  const [attributes, setAttributes] = useState({
    charisma: 50,
    constitution: 50,
    dexterity: 50,
    education: 50,
    luck: 50,
    magic: 50,
    perception: 50,
    strength: 50,
    willpower: 50,
  });

  const { uid, isUpdating, characterId, character } = useSelector(store => ({
    uid: store.userInfos.uid,
    isUpdating: store.userInfos.isUpdating,
    characterId: store.userInfos.characterId,
    character: store.character,
  }));

  const { triggerError } = useApp();
  const { createCharacter, updateCharacter } = useCharacter();

  useEffect(() => {
    if (isUpdating) {
      setName(character.name);
      setIcon(character.icon);
      setIconPath(character.iconPath);
      setDescription(character.description);
      setSkills(character.skills);
      setAbilities(character.abilities);
      setWeapons(character.weapons);
      setItems(character.items);
      setAttributes(character.attributes);
      setTotalPointsleft(0);
    }
  }, []);

  const onChangeAttribute = (name, value) => {
    let pointsLeft = 450;

    Object.keys(attributes).map(akey => {
      if (akey !== name) {
        pointsLeft -= attributes[akey];
      } else {
        pointsLeft -= value;
      }
      return null;
    });
    setAttributes({ ...attributes, [name]: value });
    setTotalPointsleft(pointsLeft);
  };

  const onChangeSkills = (index, value) => {
    setSkills(updateIndex(skills, index, value));
  };

  const addSkill = () => {
    setSkills(
      addEmptyString(skills, 6, () =>
        triggerError({
          message: "Can't have more than 6 skills",
        }),
      ),
    );
  };

  const removeSkill = index => {
    setSkills(removeIndex(skills, index));
  };

  const onChangeAbilities = (index, value) => {
    setAbilities(updateIndex(abilities, index, value));
  };

  const addAbility = () => {
    setAbilities(addEmptyString(abilities));
  };

  const removeAbility = index => {
    setAbilities(removeIndex(abilities, index));
  };

  const onChangeWeapons = (index, value) => {
    setWeapons(updateIndex(weapons, index, value));
  };

  const addWeapon = () => {
    setWeapons(addEmptyString(weapons));
  };

  const removeWeapon = index => {
    setWeapons(removeIndex(weapons, index));
  };

  const onChangeItems = (index, value) => {
    setItems(updateIndex(items, index, value));
  };

  const onChangeItemsQuantity = (index, value) => {
    const obj = [...items];
    obj[index] = {
      ...obj[index],
      quantity: parseInt(value, 10),
    };
    setItems(obj);
  };

  const addItem = () => {
    if (items.length === 10) {
      triggerError({
        message: "Can't have more than 10 items",
      });
    } else {
      const obj = [...items];
      obj.push({
        name: '',
        quantity: 1,
      });
      setItems(obj);
    }
  };

  const removeItem = index => {
    setItems(removeIndex(items, index));
  };

  const onDrop = picture => {
    if (picture.length > 0) {
      let storageRef = firebase.storage().ref();
      setCurrentPicture(picture[picture.length - 1]);
      let path;
      if (isUpdating) {
        path = `images/${uid}/character_${characterId}.${
          picture[picture.length - 1].name.split('.')[1]
        }`;
      } else {
        path = `images/${uid}/temp_character.${
          picture[picture.length - 1].name.split('.')[1]
        }`;
      }
      storageRef
        .child(path)
        .put(picture[picture.length - 1])
        .then(() => {
          storageRef
            .child(path)
            .getDownloadURL()
            .then(url => {
              setIcon(url);
              setIconPath(path);
            })
            .catch(error => {
              // Handle any errors
              triggerError(error);
            });
        });
    }
  };

  const removePicture = () => {
    // Delete the file
    let storageRef = firebase.storage().ref();
    storageRef
      .child(iconPath)
      .delete()
      .then(() => {
        // File deleted successfully
        setIcon('');
        setIconPath('');
      })
      .catch(error => {
        // Uh-oh, an error occurred!
        triggerError(error);
      });
  };

  const validateBeforeCreate = () => {
    if (totalPointsleft < 0) {
      triggerError({
        message: 'Cannot exceed points limit !',
      });
    } else if (name === '') {
      triggerError({ message: 'Name cannot be empty !!' });
    } else if (icon === '') {
      triggerError({ message: 'Icon cannot be empty !' });
    } else if (isUpdating) {
      const health =
        attributes.constitution !== character.constitution
          ? parseInt(character.health, 10) +
            (parseInt(attributes.constitution, 10) -
              parseInt(character.constitution, 10))
          : character.health;

      const mentalState = character.willpower
        ? attributes.willpower !== character.willpower
          ? parseInt(character.mentalState, 10) +
            (Math.ceil(parseInt(attributes.willpower, 10) / 8.5) -
              Math.ceil(parseInt(character.willpower, 10) / 8.5))
          : character.mentalState
        : attributes.willpower;

      updateCharacter({
        attributes,
        items,
        skills,
        abilities,
        weapons,
        iconPath,
        description,
        name,
        icon,
        health,
        mentalState,
        maxHealth: parseInt(attributes.constitution, 10) + 10,
        maxMentalState: Math.ceil(parseInt(attributes.willpower, 10) / 8.5) + 1,
        id: characterId,
      });
    } else {
      createCharacter(
        {
          attributes,
          items,
          skills,
          abilities,
          weapons,
          iconPath,
          description,
          name,
          icon,
          mentalState: Math.ceil(
            (Math.ceil(parseInt(attributes.willpower, 10) / 8.5) + 1) / 2,
          ),
          maxMentalState:
            Math.ceil(parseInt(attributes.willpower, 10) / 8.5) + 1,
          health: parseInt(attributes.constitution, 10) + 10,
          maxHealth: parseInt(attributes.constitution, 10) + 10,
        },
        currentPicture,
      );
    }
  };

  return (
    <CharacterContext.Provider
      value={{
        name,
        setName,
        icon,
        onDrop,
        removePicture,
        iconPath,
        description,
        setDescription,
        skills,
        addSkill,
        onChangeSkills,
        removeSkill,
        abilities,
        addAbility,
        onChangeAbilities,
        removeAbility,
        weapons,
        addWeapon,
        onChangeWeapons,
        removeWeapon,
        items,
        addItem,
        onChangeItems,
        onChangeItemsQuantity,
        removeItem,
        totalPointsleft,
        attributes,
        onChangeAttribute,
        validateBeforeCreate,
      }}
    >
      {props.children}
    </CharacterContext.Provider>
  );
}

export { CharacterContext, CharacterProvider };
