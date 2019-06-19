import React, { Component } from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import FileUploader from "./FileUploader";
import { cursorPointer } from "../Utils/StyleConstants";
import CharacterCreationItems from "./CharacterCreationItems";
import CharacterCreationAbilites from "./CharacterCreationAbilites";
import CharacterCreationWeapons from "./CharacterCreationWeapons";
import CharacterCreationSkills from "./CharacterCreationSkills";
import CharacterCreationAttributes from "./CharacterCreationAttributes";

const styledItem = {
  display: "inline-block",
  border: "1px solid green",
  cursor: cursorPointer,
};

class CharacterCreation extends Component {
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
    const obj = {};
    obj[name] = name === "name" || "description" ? value : parseInt(value, 10);

    this.setState(state => ({
      ...state,
      ...obj,
    }));
  };

  onChangeAttributes = (name, value) => {
    const { attributes } = this.state;
    const obj = {};
    let pointsLeft = 450;

    Object.keys(attributes).map(akey => {
      if (akey !== name) {
        pointsLeft -= attributes[akey];
      } else {
        pointsLeft -= value;
      }
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
    if (this.state.items.length === 10) {
      this.props.triggerError({
        message: "Can't have more than 10 items",
      });
    } else {
      const obj = [...this.state.items];
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
    if (this.state.weapons.length === 2) {
      this.props.triggerError({
        message: "Can't have more than 2 weapons equipped",
      });
    } else {
      const obj = [...this.state.weapons];
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
    // Delete the file
    let storageRef = firebase.storage().ref();
    storageRef
      .child(this.state.iconPath)
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
        this.props.triggerError(error);
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

      updateCharacter({
        ...rest,
        name,
        icon,
        health,
        maxHealth: parseInt(this.state.constitution, 10) + 10,
        id,
      });
    } else {
      createCharacter({
        ...rest,
        name,
        icon,
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
        <input
          type="text"
          name="name"
          placeholder="name"
          value={name}
          onChange={e => {
            this.onChange(e.target.name, e.target.value);
          }}
        />
        <textarea
          name="description"
          placeholder="description"
          value={description}
          onChange={e => {
            this.onChange(e.target.name, e.target.value);
          }}
        />
        {icon === "" && <FileUploader onDrop={this.onDrop} />}
        {icon !== "" && (
          <div>
            <img
              src={icon}
              style={{ maxWidth: "50px", maxHeight: "50px" }}
              alt={`${name}`}
            />
            <button onClick={this.removePicture}>Remove picture</button>
          </div>
        )}
        <CharacterCreationAttributes
          attributes={attributes}
          onChange={this.onChangeAttributes}
          totalPointsleft={totalPointsleft}
        />
        <CharacterCreationSkills
          skills={skills}
          onChangeSkills={this.onChangeSkills}
          addSkill={this.addSkill}
          removeSkill={this.removeSkill}
        />
        <CharacterCreationWeapons
          weapons={weapons}
          onChangeWeapons={this.onChangeWeapons}
          removeWeapon={this.removeWeapon}
          addWeapon={this.addWeapon}
        />
        <CharacterCreationAbilites
          abilities={abilities}
          onChangeAbilities={this.onChangeAbilities}
          removeAbility={this.removeAbility}
          addAbility={this.addAbility}
        />
        <CharacterCreationItems
          items={items}
          onChangeItems={this.onChangeItems}
          onChangeItemsQuantity={this.onChangeItemsQuantity}
          removeItem={this.removeItem}
          addItem={this.addItem}
        />
        <button onClick={this.validateBeforeCreate}>Validate</button>
      </div>
    );
  }
}

CharacterCreation.defaultProps = {
  character: {},
};

CharacterCreation.propTypes = {
  uid: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  isAnUpdate: PropTypes.bool.isRequired,
  character: PropTypes.object,
  createCharacter: PropTypes.func.isRequired,
  updateCharacter: PropTypes.func.isRequired,
  triggerError: PropTypes.func.isRequired,
};

export default CharacterCreation;
