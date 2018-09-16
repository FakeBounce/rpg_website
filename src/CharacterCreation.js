import React, { Component } from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import FileUploader from "./FileUploader";

const styledBoxHeader = {
    width: "100%",
    height: "20px",
    marginBottom: "5px",
    textAlign: "center",
};

const styledItem = {
    display: "inline-block",
    border: "1px solid green",
    cursor: "pointer",
};

class CharacterCreation extends Component {
    state = {
        name: "",
        icon: "",
        iconPath: "",
        description: "",
        skills: [],
        abilities: [],
        weapons: [],
        items: [],
        strength: 50,
        dexterity: 50,
        luck: 50,
        charisma: 50,
        education: 50,
        magic: 50,
        perception: 50,
        constitution: 50,
        totalPointsleft: 0,
    };

    onChange = (name, value) => {
        const {
            strength,
            dexterity,
            luck,
            charisma,
            education,
            magic,
            perception,
            constitution,
        } = this.state;
        const obj = {};
        let pointsLeft = 0;
        obj[name] = value;
        switch (name) {
            case "strength":
                pointsLeft =
                    400 -
                    value -
                    dexterity -
                    luck -
                    charisma -
                    education -
                    magic -
                    perception -
                    constitution;
                break;
            case "dexterity":
                pointsLeft =
                    400 -
                    strength -
                    value -
                    luck -
                    charisma -
                    education -
                    magic -
                    perception -
                    constitution;
                break;
            case "luck":
                pointsLeft =
                    400 -
                    strength -
                    dexterity -
                    value -
                    charisma -
                    education -
                    magic -
                    perception -
                    constitution;
                break;
            case "charisma":
                pointsLeft =
                    400 -
                    strength -
                    dexterity -
                    luck -
                    value -
                    education -
                    magic -
                    perception -
                    constitution;
                break;
            case "education":
                pointsLeft =
                    400 -
                    strength -
                    dexterity -
                    luck -
                    charisma -
                    value -
                    magic -
                    perception -
                    constitution;
                break;
            case "magic":
                pointsLeft =
                    400 -
                    strength -
                    dexterity -
                    luck -
                    charisma -
                    education -
                    value -
                    perception -
                    constitution;
                break;
            case "perception":
                pointsLeft =
                    400 -
                    strength -
                    dexterity -
                    luck -
                    charisma -
                    education -
                    magic -
                    value -
                    constitution;
                break;
            case "constitution":
                pointsLeft =
                    400 -
                    strength -
                    dexterity -
                    luck -
                    charisma -
                    education -
                    magic -
                    perception -
                    value;
                break;
            default:
                pointsLeft = 0;
                break;
        }
        this.setState(state => ({
            ...state,
            ...obj,
            totalPointsleft: pointsLeft,
        }));
    };

    onChangeSkills = (index, value) => {
        const obj = this.state.skills;
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
            const obj = this.state.skills;
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
        const obj = this.state.abilities;
        obj[index] = value;
        this.setState(state => ({
            ...state,
            abilities: obj,
        }));
    };

    addAbility = () => {
        const obj = this.state.abilities;
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
        const obj = this.state.items;
        obj[index] = {
            ...obj[index],
            name :value,
        };
        this.setState(state => ({
            ...state,
            items: obj,
        }));
    };

    onChangeItemsQuantity = (index, value) => {
        const obj = this.state.items;
        obj[index] = {
            ...obj[index],
            quantity :value,
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
            const obj = this.state.items;
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
        const obj = this.state.weapons;
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
            const obj = this.state.weapons;
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
        const { uid, id } = this.props;
        let storageRef = firebase.storage().ref();
        const path =
            "images/" +
            uid +
            "/character_" +
            id +
            "." +
            picture[0].name.split(".")[1];
        storageRef
            .child(path)
            .put(picture[0])
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
                        this.props.triggerError(error);
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
        if (totalPointsleft < 0) {
            this.props.triggerError({
                message: "Cannot exceed points limit !",
            });
        } else if (name === "") {
            this.props.triggerError({ message: "Name cannot be empty !!" });
        } else if (icon === "") {
            this.props.triggerError({ message: "Icon cannot be empty !" });
        } else {
            this.props.createCharacter({
                ...rest,
                name,
                icon,
                life:this.state.constitution+10,
                id: this.props.id,
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
            strength,
            dexterity,
            luck,
            charisma,
            education,
            magic,
            perception,
            constitution,
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
                        <button onClick={this.removePicture}>
                            Remove picture
                        </button>
                    </div>
                )}
                <div>
                    <div style={styledBoxHeader}>Attributes :</div>
                    Strength :{" "}
                    <input
                        type="number"
                        name="strength"
                        placeholder="strength"
                        value={strength}
                        onChange={e => {
                            this.onChange(e.target.name, e.target.value);
                        }}
                    />
                    Dexterity :{" "}
                    <input
                        type="number"
                        name="dexterity"
                        placeholder="dexterity"
                        value={dexterity}
                        onChange={e => {
                            this.onChange(e.target.name, e.target.value);
                        }}
                    />
                    Charisma :{" "}
                    <input
                        type="number"
                        name="charisma"
                        placeholder="charisma"
                        value={charisma}
                        onChange={e => {
                            this.onChange(e.target.name, e.target.value);
                        }}
                    />
                    Luck :{" "}
                    <input
                        type="number"
                        name="luck"
                        placeholder="luck"
                        value={luck}
                        onChange={e => {
                            this.onChange(e.target.name, e.target.value);
                        }}
                    />
                    Education :{" "}
                    <input
                        type="number"
                        name="education"
                        placeholder="education"
                        value={education}
                        onChange={e => {
                            this.onChange(e.target.name, e.target.value);
                        }}
                    />
                    Perception :{" "}
                    <input
                        type="number"
                        name="perception"
                        placeholder="perception"
                        value={perception}
                        onChange={e => {
                            this.onChange(e.target.name, e.target.value);
                        }}
                    />
                    Magic :{" "}
                    <input
                        type="number"
                        name="magic"
                        placeholder="magic"
                        value={magic}
                        onChange={e => {
                            this.onChange(e.target.name, e.target.value);
                        }}
                    />
                    Constitution :{" "}
                    <input
                        type="number"
                        name="constitution"
                        placeholder="constitution"
                        value={constitution}
                        onChange={e => {
                            this.onChange(e.target.name, e.target.value);
                        }}
                    />
                </div>
                <div>Total points left : {totalPointsleft}</div>
                <div>
                    Skills :
                    {skills.map((skill, index) => {
                        return (
                            <div key={`skill-${index}`}>
                                <input
                                    type="text"
                                    placeholder={`Skill ${index +
                                        1} + description if needed`}
                                    value={skill}
                                    onChange={e => {
                                        this.onChangeSkills(
                                            index,
                                            e.target.value,
                                        );
                                    }}
                                />
                                <button onClick={() => this.removeSkill(index)}>
                                    Remove this skill
                                </button>
                            </div>
                        );
                    })}
                    {skills.length < 6 && (
                        <button onClick={this.addSkill}>Add a skill</button>
                    )}
                </div>
                <div>
                    Weapons :
                    {weapons.map((weapon, index) => {
                        return (
                            <div key={`weapon-${index}`}>
                                <input
                                    type="text"
                                    placeholder={`Weapon ${index +
                                        1} + description if needed`}
                                    value={weapon}
                                    onChange={e => {
                                        this.onChangeWeapons(
                                            index,
                                            e.target.value,
                                        );
                                    }}
                                />
                                <button
                                    onClick={() => this.removeWeapon(index)}
                                >
                                    Remove this weapon
                                </button>
                            </div>
                        );
                    })}
                    {weapons.length < 2 && (
                        <button onClick={this.addWeapon}>Add a weapon</button>
                    )}
                </div>
                <div>
                    Abilities :
                    {abilities.map((ability, index) => {
                        return (
                            <div key={`ability-${index}`}>
                                <input
                                    type="text"
                                    placeholder={`Ability ${index +
                                        1} + description if needed`}
                                    value={ability}
                                    onChange={e => {
                                        this.onChangeAbilities(
                                            index,
                                            e.target.value,
                                        );
                                    }}
                                />
                                <button
                                    onClick={() => this.removeAbility(index)}
                                >
                                    Remove this ability
                                </button>
                            </div>
                        );
                    })}
                    <button onClick={this.addAbility}>Add an ability</button>
                </div>
                <div>
                    Items :
                    {items.map((item, index) => {
                        return (
                            <div key={`item-${index}`}>
                                <input
                                    type="text"
                                    placeholder={`Item ${index +
                                        1} + description if needed`}
                                    value={item.name}
                                    onChange={e => {
                                        this.onChangeItems(
                                            index,
                                            e.target.value,
                                        );
                                    }}
                                />
                                <input
                                    type="number"
                                    placeholder='X'
                                    value={item.quantity ? item.quantity : 1}
                                    onChange={e => {
                                        this.onChangeItemsQuantity(
                                            index,
                                            e.target.value,
                                        );
                                    }}
                                />
                                <button onClick={() => this.removeItem(index)}>
                                    Remove this item
                                </button>
                            </div>
                        );
                    })}
                    {items.length < 10 && (
                        <button onClick={this.addItem}>Add an item</button>
                    )}
                </div>
                <button onClick={this.validateBeforeCreate}>Validate</button>
            </div>
        );
    }
}

CharacterCreation.propTypes = {
    uid: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    createCharacter: PropTypes.func.isRequired,
    triggerError: PropTypes.func.isRequired,
};

export default CharacterCreation;
