import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase";
import { addEmptyString, removeIndex, updateIndex } from "../arrayManipulator";

const CharacterContext = React.createContext(undefined);

export const useCharacterContext = () => useContext(CharacterContext);

function CharacterProvider(props) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [iconPath, setIconPath] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState([]);
  const [abilities, setAbilites] = useState([]);
  const [weapons, setWeapons] = useState([]);
  const [items, setItems] = useState([]);
  const [totalPointsleft, setTotalPointsleft] = useState(0);
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

  useEffect(() => {
    if (props.isAnUpdate) {
      setName(props.name);
      setIcon(props.icon);
      setIconPath(props.iconPath);
      setDescription(props.iconPath);
      setSkills(props.iconPath);
      setAbilites(props.iconPath);
      setWeapons(props.iconPath);
      setItems(props.iconPath);
      setTotalPointsleft(props.name);
      setAttributes(props.name);
      setTotalPointsleft(props.totalPointsleft);
    }
  }, [props.isAnUpdate]);

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
        props.triggerError({
          message: "Can't have more than 6 skills",
        }),
      ),
    );
  };

  const removeSkill = index => {
    setSkills(removeIndex(skills, index));
  };

  const onChangeAbilities = (index, value) => {
    setAbilites(updateIndex(abilities, index, value));
  };

  const addAbility = () => {
    setAbilites(addEmptyString(abilities));
  };

  const removeAbility = index => {
    setAbilites(removeIndex(abilities, index));
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
    const { triggerError } = this.props;

    if (items.length === 10) {
      triggerError({
        message: "Can't have more than 10 items",
      });
    } else {
      const obj = [...items];
      obj.push({
        name: "",
        quantity: 1,
      });
      setItems(obj);
    }
  };

  const removeItem = index => {
    setItems(removeIndex(items, index));
  };

  const onDrop = picture => {
    const { uid, id, triggerError } = props;
    let storageRef = firebase.storage().ref();
    const path =
      "images/" +
      uid +
      "/character_" +
      id +
      "." +
      picture[picture.length - 1].name.split(".")[1];
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
  };

  const removePicture = () => {
    const { triggerError } = this.props;

    // Delete the file
    let storageRef = firebase.storage().ref();
    storageRef
      .child(iconPath)
      .delete()
      .then(() => {
        // File deleted successfully
        setIcon("");
        setIconPath("");
      })
      .catch(error => {
        // Uh-oh, an error occurred!
        triggerError(error);
      });
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
      }}
    >
      {props.children}
    </CharacterContext.Provider>
  );
}

export { CharacterContext, CharacterProvider };
