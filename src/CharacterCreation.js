import React, { Component } from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import FileUploader from "./FileUploader";

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
        consitution: 50,
        totalPointsleft: 0,
        error: "",
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
            consitution,
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
                    consitution;
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
                    consitution;
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
                    consitution;
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
                    consitution;
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
                    consitution;
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
                    consitution;
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
                    consitution;
                break;
            case "consitution":
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
            error: "",
        }));
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
                            error: "",
                        });
                    })
                    .catch(error => {
                        // Handle any errors
                        this.triggerError(error);
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
                this.triggerError(error);
            });
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
                        error: "",
                    }));
                }, 5000);
            },
        );
    };

    validateBeforeCreate = () => {
        const { totalPointsleft, error, ...rest } = this.state;
        if (totalPointsleft < 0) {
            this.triggerError({ message: "Cannot exceed points limit !" });
        } else {
            this.props.createCharacter({...rest, id: this.props.id});
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
            consitution,
            totalPointsleft,
            error,
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
                        />
                        <button onClick={this.removePicture}>
                            Remove picture
                        </button>
                    </div>
                )}
                <input
                    type="number"
                    name="strength"
                    placeholder="strength"
                    value={strength}
                    onChange={e => {
                        this.onChange(e.target.name, e.target.value);
                    }}
                />
                <input
                    type="number"
                    name="strength"
                    placeholder="strength"
                    value={strength}
                    onChange={e => {
                        this.onChange(e.target.name, e.target.value);
                    }}
                />
                <input
                    type="number"
                    name="strength"
                    placeholder="strength"
                    value={strength}
                    onChange={e => {
                        this.onChange(e.target.name, e.target.value);
                    }}
                />
                <input
                    type="number"
                    name="dexterity"
                    placeholder="dexterity"
                    value={dexterity}
                    onChange={e => {
                        this.onChange(e.target.name, e.target.value);
                    }}
                />
                <input
                    type="number"
                    name="charisma"
                    placeholder="charisma"
                    value={charisma}
                    onChange={e => {
                        this.onChange(e.target.name, e.target.value);
                    }}
                />
                <input
                    type="number"
                    name="luck"
                    placeholder="luck"
                    value={luck}
                    onChange={e => {
                        this.onChange(e.target.name, e.target.value);
                    }}
                />
                <input
                    type="number"
                    name="education"
                    placeholder="education"
                    value={education}
                    onChange={e => {
                        this.onChange(e.target.name, e.target.value);
                    }}
                />
                <input
                    type="number"
                    name="perception"
                    placeholder="perception"
                    value={perception}
                    onChange={e => {
                        this.onChange(e.target.name, e.target.value);
                    }}
                />
                <input
                    type="number"
                    name="magic"
                    placeholder="magic"
                    value={magic}
                    onChange={e => {
                        this.onChange(e.target.name, e.target.value);
                    }}
                />
                <input
                    type="number"
                    name="consitution"
                    placeholder="consitution"
                    value={consitution}
                    onChange={e => {
                        this.onChange(e.target.name, e.target.value);
                    }}
                />
                <div>Total points left : {totalPointsleft}</div>
                <button onClick={this.validateBeforeCreate}>Validate</button>
                {error}
            </div>
        );
    }
}

CharacterCreation.propTypes = {
    uid: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    createCharacter: PropTypes.func.isRequired,
};

export default CharacterCreation;
