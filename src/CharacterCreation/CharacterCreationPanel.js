import React, { Component } from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import { cursorPointer } from "../Utils/StyleConstants";
import CharacterCreationName from "./CharacterCreationName";
import CharacterCreationBox from "./CharacterCreationBox";

const styledItem = {
  display: "inline-block",
  border: "1px solid green",
  width: "80%",
  position: "relative",
  cursor: cursorPointer,
};

class CharacterCreationPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      icon: "",
      iconPath: "",
      description: "",
      skills: [],
      abilities: [],
      weapons: [],
      items: [],
      attributes: {
        charisma: 50,
        constitution: 50,
        dexterity: 50,
        education: 50,
        luck: 50,
        magic: 50,
        perception: 50,
        strength: 50,
        willpower: 50,
      },
      totalPointsleft: props.isAnUpdate ? this.calculatePointsLeft() : 0,
      ...props.character,
    };
  }

  calculatePointsLeft = () => {
    const {
      character: {
        attributes: {
          strength,
          dexterity,
          luck,
          charisma,
          education,
          magic,
          perception,
          constitution,
          willpower = 50,
        },
      },
    } = this.props;

    return (
      450 -
      strength -
      dexterity -
      luck -
      constitution -
      charisma -
      education -
      magic -
      perception -
      willpower
    );
  };

  onChange = (name, value) => {
    this.setState(state => ({
      ...state,
      [name]: value,
    }));
  };

  onChangeAttributes = (name, value) => {
    const { attributes } = this.state;
    let pointsLeft = 450;

    Object.keys(attributes).map(akey => {
      if (akey !== name) {
        pointsLeft -= attributes[akey];
      } else {
        pointsLeft -= value;
      }
      return null;
    });

    this.setState(state => ({
      ...state,
      attributes: {
        ...state.attributes,
        [name]: value,
      },
      totalPointsleft: pointsLeft,
    }));
  };

  onChangeSkills = (index, value) => {
    const obj = [...this.state.skills];
    obj[index] = value;
    this.setState(state => ({
      ...state,
      skills: obj,
    }));
  };

  addSkill = () => {
    if (this.state.items.length === 6) {
      this.props.triggerError({
        message: "Can't have more than 6 skills",
      });
    } else {
      const obj = [...this.state.skills];
      obj.push("");
      this.setState(state => ({
        ...state,
        skills: obj,
      }));
    }
  };

  removeSkill = index => {
    const { skills } = this.state;
    if (skills.length === 1) {
      this.setState(state => ({
        ...state,
        skills: [],
      }));
    } else {
      const obj = [];
      for (let i = 0; i < skills.length; i++) {
        if (i !== index) {
          obj.push(skills[i]);
        }
      }

      this.setState(state => ({
        ...state,
        skills: obj,
      }));
    }
  };

  onChangeAbilities = (index, value) => {
    const obj = [...this.state.abilities];
    obj[index] = value;
    this.setState(state => ({
      ...state,
      abilities: obj,
    }));
  };

  addAbility = () => {
    const obj = [...this.state.abilities];
    obj.push("");
    this.setState(state => ({
      ...state,
      abilities: obj,
    }));
  };

  removeAbility = index => {
    const { abilities } = this.state;
    if (abilities.length === 1) {
      this.setState(state => ({
        ...state,
        abilities: [],
      }));
    } else {
      const obj = [];
      for (let i = 0; i < abilities.length; i++) {
        if (i !== index) {
          obj.push(abilities[i]);
        }
      }

      this.setState(state => ({
        ...state,
        abilities: obj,
      }));
    }
  };

  onChangeItems = (index, value) => {
    const obj = [...this.state.items];
    obj[index] = {
      ...obj[index],
      name: value,
    };
    this.setState(state => ({
      ...state,
      items: obj,
    }));
  };

  onChangeItemsQuantity = (index, value) => {
    const obj = [...this.state.items];
    obj[index] = {
      ...obj[index],
      quantity: parseInt(value, 10),
    };
    this.setState(state => ({
      ...state,
      items: obj,
    }));
  };

  addItem = () => {
    const { items } = this.state;
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
      this.setState(state => ({
        ...state,
        items: obj,
      }));
    }
  };

  removeItem = index => {
    const { items } = this.state;

    if (items.length === 1) {
      this.setState(state => ({
        ...state,
        items: [],
      }));
    } else {
      const obj = [];
      for (let i = 0; i < items.length; i++) {
        if (i !== index) {
          obj.push(items[i]);
        }
      }

      this.setState(state => ({
        ...state,
        items: obj,
      }));
    }
  };

  onChangeWeapons = (index, value) => {
    const obj = [...this.state.weapons];
    obj[index] = value;
    this.setState(state => ({
      ...state,
      weapons: obj,
    }));
  };

  addWeapon = () => {
    const { weapons } = this.state;
    const { triggerError } = this.props;

    if (weapons.length === 2) {
      triggerError({
        message: "Can't have more than 2 weapons equipped",
      });
    } else {
      const obj = [...weapons];
      obj.push("");
      this.setState(state => ({
        ...state,
        weapons: obj,
      }));
    }
  };

  removeWeapon = index => {
    const { weapons } = this.state;
    if (weapons.length === 1) {
      this.setState(state => ({
        ...state,
        weapons: [],
      }));
    } else {
      const obj = [];
      for (let i = 0; i < weapons.length; i++) {
        if (i !== index) {
          obj.push(weapons[i]);
        }
      }

      this.setState(state => ({
        ...state,
        weapons: obj,
      }));
    }
  };

  onDrop = picture => {
    const { uid, id, triggerError } = this.props;
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
            this.setState({
              icon: url,
              iconPath: path,
            });
          })
          .catch(error => {
            // Handle any errors
            triggerError(error);
          });
      });
  };

  removePicture = () => {
    const { iconPath } = this.state;
    const { triggerError } = this.props;

    // Delete the file
    let storageRef = firebase.storage().ref();
    storageRef
      .child(iconPath)
      .delete()
      .then(() => {
        // File deleted successfully
        this.setState(state => ({
          ...state,
          icon: "",
          iconPath: "",
        }));
      })
      .catch(error => {
        // Uh-oh, an error occurred!
        triggerError(error);
      });
  };

  validateBeforeCreate = () => {
    const { totalPointsleft, name, icon, ...rest } = this.state;
    const {
      id,
      triggerError,
      createCharacter,
      updateCharacter,
      isAnUpdate,
      character,
    } = this.props;
    if (totalPointsleft < 0) {
      triggerError({
        message: "Cannot exceed points limit !",
      });
    } else if (name === "") {
      triggerError({ message: "Name cannot be empty !!" });
    } else if (icon === "") {
      triggerError({ message: "Icon cannot be empty !" });
    } else if (isAnUpdate) {
      const health =
        this.state.constitution !== character.constitution
          ? parseInt(character.health, 10) +
            (parseInt(this.state.constitution, 10) -
              parseInt(character.constitution, 10))
          : character.health;

      const mentalState =
        this.state.willpower !== character.willpower
          ? parseInt(character.mentalState, 10) +
            (parseInt(this.state.willpower, 10) / 5 -
              parseInt(character.willpower, 10) / 5)
          : character.mentalState;

      updateCharacter({
        ...rest,
        name,
        icon,
        health,
        mentalState,
        maxHealth: parseInt(this.state.constitution, 10) + 10,
        maxMentalState: parseInt(this.state.willpower, 10) / 5 + 1,
        id,
      });
    } else {
      createCharacter({
        ...rest,
        name,
        icon,
        mentalState: Math.ceil(
          (parseInt(this.state.willpower, 10) / 5 + 1) / 2,
        ),
        maxMentalState: parseInt(this.state.willpower, 10) / 5 + 1,
        health: parseInt(this.state.constitution, 10) + 10,
        maxHealth: parseInt(this.state.constitution, 10) + 10,
        id,
      });
    }
  };

  render() {
    const {
      name,
      icon,
      description,
      skills,
      abilities,
      weapons,
      items,
      attributes,
      totalPointsleft,
    } = this.state;

    return (
      <div style={styledItem}>
        <CharacterCreationName name={name} onChange={this.onChange} />
        <CharacterCreationBox
          abilities={abilities}
          addAbility={this.addAbility}
          addItem={this.addItem}
          addSkill={this.addSkill}
          addWeapon={this.addWeapon}
          attributes={attributes}
          description={description}
          icon={icon}
          items={items}
          name={name}
          onChange={this.onChange}
          onChangeAbilities={this.onChangeAbilities}
          onChangeAttributes={this.onChangeAttributes}
          onChangeItems={this.onChangeItems}
          onChangeItemsQuantity={this.onChangeItemsQuantity}
          onChangeSkills={this.onChangeSkills}
          onChangeWeapons={this.onChangeWeapons}
          onDrop={this.onDrop}
          removeAbility={this.removeAbility}
          removeItem={this.removeItem}
          removePicture={this.removePicture}
          removeSkill={this.removeSkill}
          removeWeapon={this.removeWeapon}
          skills={skills}
          totalPointsleft={totalPointsleft}
          weapons={weapons}
        />
        <button onClick={this.validateBeforeCreate}>Validate</button>
      </div>
    );
  }
}

CharacterCreationPanel.defaultProps = {
  character: {},
};

CharacterCreationPanel.propTypes = {
  uid: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  isAnUpdate: PropTypes.bool.isRequired,
  character: PropTypes.object,
  createCharacter: PropTypes.func.isRequired,
  updateCharacter: PropTypes.func.isRequired,
  triggerError: PropTypes.func.isRequired,
};

export default CharacterCreationPanel;
